import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { signDTE } from 'npm:dte-signer-sv';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

// In-memory locks for concurrency control
const counterLocks = new Map<string, Promise<void>>();

/**
 * Generates the next sequential counter for DTE control numbers
 * Format: DTE-01-{branchCode}{posCode}-{paddedSequence}
 * Key format: DTE_01_{branchCode}_{posCode}_{year}
 */
async function generateControlNumber(
  supabaseClient: ReturnType<typeof createClient>,
  branchCode: string,
  posCode: string,
  documentType: string = '01'
): Promise<string> {
  const currentYear = new Date().getFullYear();
  const counterKey = `DTE_${documentType}_${branchCode}_${posCode}_${currentYear}`;

  // Ensure thread safety with mutex-like behavior
  while (counterLocks.has(counterKey)) {
    await counterLocks.get(counterKey);
  }

  let resolveCounterLock: () => void;
  const counterLockPromise = new Promise<void>((resolve) => {
    resolveCounterLock = resolve;
  });
  counterLocks.set(counterKey, counterLockPromise);

  try {
    // Get current counter value or initialize to 0
    const { data: existingCounter, error: selectError } = await supabaseClient
      .from('sequential_counters')
      .select('counter_value')
      .eq('counter_key', counterKey)
      .single();

    let nextValue = 1;

    if (existingCounter && !selectError) {
      // Counter exists, increment it
      nextValue = (existingCounter.counter_value || 0) + 1;

      const { error: updateError } = await supabaseClient
        .from('sequential_counters')
        .update({
          counter_value: nextValue,
          updated_at: new Date().toISOString()
        })
        .eq('counter_key', counterKey);

      if (updateError) {
        throw new Error(`Failed to update counter: ${updateError.message}`);
      }
    } else {
      // Counter doesn't exist, create it
      const { error: insertError } = await supabaseClient
        .from('sequential_counters')
        .insert({
          counter_key: counterKey,
          counter_value: nextValue,
          updated_at: new Date().toISOString()
        });

      if (insertError) {
        // Handle race condition - counter might have been created by another request
        if (insertError.code === '23505') { // Unique constraint violation
          // Retry by getting the existing value and incrementing
          const { data: retryCounter, error: retryError } = await supabaseClient
            .from('sequential_counters')
            .select('counter_value')
            .eq('counter_key', counterKey)
            .single();

          if (retryError) {
            throw new Error(`Failed to retrieve counter after race condition: ${retryError.message}`);
          }

          nextValue = (retryCounter.counter_value || 0) + 1;

          const { error: retryUpdateError } = await supabaseClient
            .from('sequential_counters')
            .update({
              counter_value: nextValue,
              updated_at: new Date().toISOString()
            })
            .eq('counter_key', counterKey);

          if (retryUpdateError) {
            throw new Error(`Failed to update counter after race condition: ${retryUpdateError.message}`);
          }
        } else {
          throw new Error(`Failed to create counter: ${insertError.message}`);
        }
      }
    }

    // Format the sequential number with leading zeros (15 digits)
    const paddedSequence = nextValue.toString().padStart(15, '0');

    // Build the complete control number
    const controlNumber = `DTE-${documentType}-${branchCode}${posCode}-${paddedSequence}`;

    console.log(`Generated control number: ${controlNumber} for key: ${counterKey}`);

    return controlNumber;

  } finally {
    // Release the lock
    counterLocks.delete(counterKey);
    resolveCounterLock!();
  }
}

/**
 * Updates the numeroControl field in a DTE object
 */
function updateDteControlNumber(dte: Record<string, unknown>, controlNumber: string): Record<string, unknown> {
  if (!dte || typeof dte !== 'object') {
    throw new Error('Invalid DTE object');
  }

  // Create a deep copy to avoid mutations
  const updatedDte = JSON.parse(JSON.stringify(dte));

  // Ensure the identificacion object exists
  if (!updatedDte.identificacion) {
    updatedDte.identificacion = {};
  }

  // Set the numeroControl
  updatedDte.identificacion.numeroControl = controlNumber;

  return updatedDte;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: corsHeaders,
      status: 200
    });
  }
  try {
    const supabaseClient = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '', {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });
    const MH_PASSWORD = Deno.env.get('MH_PASSWORD');
    const NIT = Deno.env.get('NIT');
    const certificateFileName = `${NIT}-test.crt`;
    // Download the certificate file directly
    const { data: fileData, error: downloadError } = await supabaseClient.storage.from('internal-assets').download(`private/${certificateFileName}`);
    if (downloadError) {
      throw new Error(`Failed to download certificate: ${downloadError.message}`);
    }
    // Convert to string
    const certString = await fileData.text();

    // Parse request body
    const { dte, branchCode, posCode, documentType } = await req.json();

    if (!dte) {
      throw new Error('DTE object is required');
    }

    if (!branchCode || !posCode) {
      throw new Error('branchCode and posCode are required for control number generation');
    }

    // Generate control number
    const controlNumber = await generateControlNumber(
      supabaseClient,
      branchCode,
      posCode,
      documentType || '01'
    );

    // Update DTE with the generated control number
    const updatedDte = updateDteControlNumber(dte, controlNumber);

    // Sign the updated DTE
    const signedDTE = await signDTE({
      dte: updatedDte,
      privatePassword: MH_PASSWORD,
      certificate: certString
    });

    return new Response(JSON.stringify({
      result: signedDTE,
      controlNumber: controlNumber
    }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      },
      status: 200
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error: error.message
    }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      },
      status: 400
    });
  }
});
