import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: corsHeaders
    });
  }
  try {
    // Create Supabase client
    const supabaseClient = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_ANON_KEY') ?? '', {
      global: {
        headers: {
          Authorization: req.headers.get('Authorization')
        }
      }
    });
    // Parse request body
    const { startDate, endDate, branchId } = req.method === 'POST' ? await req.json() : {};
    // Set default date range (last 30 days if not provided)
    const end = endDate ? new Date(endDate) : new Date();
    const start = startDate ? new Date(startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    // Build base query
    let salesQuery = supabaseClient.from('sales').select(`
        *,
        sale_items (
          quantity,
          price,
          total,
          product
        )
      `).gte('created_at', start.toISOString()).lte('created_at', end.toISOString());
    // Add branch filter if provided
    if (branchId) {
      salesQuery = salesQuery.eq('branch_id', branchId);
    }
    const { data: sales, error } = await salesQuery;
    if (error) {
      throw error;
    }
    // Calculate analytics
    const analytics = {
      totalSales: sales?.length || 0,
      totalRevenue: 0,
      averageOrderValue: 0,
      topProducts: [],
      salesByDay: [],
      paymentMethodBreakdown: []
    };
    if (sales && sales.length > 0) {
      // Calculate total revenue
      analytics.totalRevenue = sales.reduce((sum, sale) => sum + (sale.total || 0), 0);
      // Calculate average order value
      analytics.averageOrderValue = analytics.totalRevenue / analytics.totalSales;
      // Calculate top products
      const productStats = new Map();
      sales.forEach((sale) => {
        if (sale.sale_items) {
          sale.sale_items.forEach((item) => {
            const productData = item.product;
            const productId = item.product_id || (productData?.id);
            const productName = productData?.name || 'Unknown Product';
            if (productId) {
              const existing = productStats.get(productId) || {
                name: productName,
                quantity: 0,
                revenue: 0
              };
              existing.quantity += item.quantity || 0;
              existing.revenue += item.total || 0;
              productStats.set(productId, existing);
            }
          });
        }
      });
      analytics.topProducts = Array.from(productStats.entries()).map(([productId, stats]) => ({
        productId,
        productName: stats.name,
        quantitySold: stats.quantity,
        revenue: stats.revenue
      })).sort((a, b) => b.revenue - a.revenue).slice(0, 10) // Top 10 products
        ;
      // Calculate sales by day
      const salesByDay = new Map();
      sales.forEach((sale) => {
        const date = new Date(sale.created_at).toISOString().split('T')[0];
        const existing = salesByDay.get(date) || {
          sales: 0,
          revenue: 0
        };
        existing.sales += 1;
        existing.revenue += sale.total || 0;
        salesByDay.set(date, existing);
      });
      analytics.salesByDay = Array.from(salesByDay.entries()).map(([date, stats]) => ({
        date,
        sales: stats.sales,
        revenue: stats.revenue
      })).sort((a, b) => a.date.localeCompare(b.date));
      // Calculate payment method breakdown
      const paymentMethods = new Map();
      sales.forEach((sale) => {
        const method = sale.payment_method || 'Unknown';
        const existing = paymentMethods.get(method) || {
          count: 0,
          amount: 0
        };
        existing.count += 1;
        existing.amount += sale.total || 0;
        paymentMethods.set(method, existing);
      });
      analytics.paymentMethodBreakdown = Array.from(paymentMethods.entries()).map(([method, stats]) => ({
        method,
        count: stats.count,
        amount: stats.amount
      })).sort((a, b) => b.amount - a.amount);
    }
    return new Response(JSON.stringify(analytics), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      },
      status: 200
    });
  } catch (error) {
    console.error('Error in sales-analytics function:', error);
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
