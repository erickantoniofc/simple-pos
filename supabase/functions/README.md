# Supabase Edge Functions

This directory contains the edge functions for the POS application.

## Functions

### 🔐 sign-dte

Signs electronic tax documents (DTE) for El Salvador with automatic control number generation.

#### Features

- **Automatic Control Number Generation**: Generates sequential control numbers in the format `DTE-01-{branchCode}{posCode}-{paddedSequence}`
- **Year-based Reset**: Counters automatically reset each year (January 1st)
- **Thread Safety**: Uses mutex-like locking to prevent duplicate numbers in concurrent requests
- **Race Condition Handling**: Robust error handling for database conflicts

#### sign-dte Details

**Endpoint:** `POST /functions/v1/sign-dte`

**Request Body:**

```json
{
  "dte": {
    "identificacion": { ... },
    "emisor": { ... },
    "receptor": { ... },
    "cuerpoDocumento": [ ... ],
    "resumen": { ... }
  },
  "branchCode": "M001",     // 4-digit branch code (haciendaCode)
  "posCode": "P001",        // 4-digit POS code (haciendaCode)
  "documentType": "01"      // Optional, defaults to "01" (Factura Electrónica)
}
```

**Response:**

```json
{
  "result": { /* signed DTE */ },
  "controlNumber": "DTE-01-M001P001-000000000000042"
}
```

#### Control Number Format

The control number follows this format:

```
DTE-01-M001P001-000000000000042
│   │  │       │
│   │  │       └── Sequential number (15 digits, zero-padded)
│   │  └────────── Branch + POS codes (8 digits total)
│   └─────────────── Document type (01 = Factura Electrónica)
└─────────────────── DTE prefix
```

#### Sequential Counter Logic

- **Counter Key Format**: `DTE_{documentType}_{branchCode}_{posCode}_{year}`
- **Example Key**: `DTE_01_M001_P001_2025`
- **Storage**: `sequential_counters` table in Supabase
- **Automatic Reset**: New year = new counter starting from 1

#### Database Schema

```sql
CREATE TABLE sequential_counters (
  counter_key VARCHAR PRIMARY KEY,  -- DTE_01_M001_P001_2025
  counter_value INTEGER,            -- 42
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Usage in Client Code

```typescript
import { dteService } from '@/services/dte.service';

// Sign a DTE with automatic control number generation
const result = await dteService.signDTE(
  dteObject,               // FacturaElectronica object
  'M001',                  // branch.haciendaCode
  'P001',                  // pos.haciendaCode
  '01'                     // documentType (optional)
);

if (result.success) {
  console.log('Signed DTE:', result.signedDTE);
  console.log('Control Number:', result.controlNumber);
} else {
  console.error('Error:', result.error);
}
```

#### Key Benefits

1. **No Manual Correlation**: No need to manually generate correlative numbers
2. **Automatic Year Reset**: Counters reset automatically on January 1st
3. **Concurrency Safe**: Multiple simultaneous requests won't create duplicate numbers
4. **Audit Trail**: All generated numbers are stored in the database
5. **Error Recovery**: Robust handling of race conditions and database conflicts

#### Testing

**Unit Tests:**

```bash
cd supabase/functions/sign-dte
deno test --allow-net --allow-read --allow-env test.ts
```

**Test Coverage:**

- ✅ Basic control number generation
- ✅ Sequential increment functionality
- ✅ Different document types (01, 03, etc.)
- ✅ Different branch/POS combinations
- ✅ Year-based key format validation
- ✅ Concurrency simulation
- ✅ DTE control number injection
- ✅ Input validation and error handling
- ✅ Large number handling

**Integration Testing:**

```bash
cd supabase/functions/sign-dte
deno run --allow-net --allow-read --allow-env run-tests.ts
```

**Manual Testing:**

1. Deploy the function: `supabase functions deploy sign-dte`
2. Set environment variables: `MH_PASSWORD`, `NIT`
3. Upload your certificate to storage bucket
4. Use the provided curl command to test
5. Verify control number format and sequence increment

### 📊 sales-analytics

Analytics function for sales data processing and reporting.

**Endpoint:** `POST /functions/v1/sales-analytics`

See the `sales-analytics` directory for detailed documentation.

## Development

### Local Development

1. Start Supabase locally:

   ```bash
   supabase start
   ```

2. Functions are automatically available at:
   - `http://localhost:54321/functions/v1/sign-dte`
   - `http://localhost:54321/functions/v1/sales-analytics`

### Testing

Run all tests:

```bash
# Unit tests for sign-dte
cd supabase/functions/sign-dte
deno test --allow-net --allow-read --allow-env test.ts

# Integration test helper
deno run --allow-net --allow-read --allow-env run-tests.ts
```

### Deployment

Functions are automatically deployed when you push changes to the main branch.

Manual deployment:

```bash
supabase functions deploy sign-dte
supabase functions deploy sales-analytics
```

## Environment Variables

Make sure to set the following environment variables in your Supabase project:

- `MH_PASSWORD`: Password for the certificate private key
- `NIT`: Company NIT for certificate file lookup
- `SUPABASE_URL`: Your Supabase project URL (auto-set)
- `SUPABASE_SERVICE_ROLE_KEY`: Service role key (auto-set)

## Security

- Functions use Row Level Security (RLS)
- Certificate files are stored in private storage buckets
- Only authenticated users can access the functions
