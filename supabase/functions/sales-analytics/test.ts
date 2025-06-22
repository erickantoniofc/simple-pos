import { assertEquals } from "https://deno.land/std@0.168.0/testing/asserts.ts"

// Mock test data
const mockSalesData = [
  {
    id: "1",
    total_amount: 100.50,
    payment_method: "cash",
    created_at: "2024-01-15T10:00:00Z",
    branch_id: "branch-1",
    sale_items: [
      {
        quantity: 2,
        unit_price: 25.00,
        total_price: 50.00,
        products: { id: "prod-1", name: "Coffee" }
      },
      {
        quantity: 1,
        unit_price: 50.50,
        total_price: 50.50,
        products: { id: "prod-2", name: "Sandwich" }
      }
    ]
  },
  {
    id: "2",
    total_amount: 75.25,
    payment_method: "card",
    created_at: "2024-01-15T14:30:00Z",
    branch_id: "branch-1",
    sale_items: [
      {
        quantity: 3,
        unit_price: 25.00,
        total_price: 75.00,
        products: { id: "prod-1", name: "Coffee" }
      }
    ]
  }
]

// Test function to validate analytics calculation
Deno.test("Analytics calculation", () => {
  // This would be the logic from our edge function
  const totalSales = mockSalesData.length
  const totalRevenue = mockSalesData.reduce((sum, sale) => sum + sale.total_amount, 0)
  const averageOrderValue = totalRevenue / totalSales

  assertEquals(totalSales, 2)
  assertEquals(totalRevenue, 175.75)
  assertEquals(Math.round(averageOrderValue * 100) / 100, 87.88)
})

// Test product aggregation
Deno.test("Product aggregation", () => {
  const productStats = new Map<string, { name: string, quantity: number, revenue: number }>()

  mockSalesData.forEach(sale => {
    sale.sale_items.forEach(item => {
      const productId = item.products.id
      const productName = item.products.name

      const existing = productStats.get(productId) || { name: productName, quantity: 0, revenue: 0 }
      existing.quantity += item.quantity
      existing.revenue += item.total_price
      productStats.set(productId, existing)
    })
  })

  const topProducts = Array.from(productStats.entries())
    .map(([productId, stats]) => ({
      productId,
      productName: stats.name,
      quantitySold: stats.quantity,
      revenue: stats.revenue
    }))
    .sort((a, b) => b.revenue - a.revenue)

  assertEquals(topProducts.length, 2)
  assertEquals(topProducts[0].productId, "prod-1") // Coffee should be top
  assertEquals(topProducts[0].quantitySold, 5) // 2 + 3
  assertEquals(topProducts[0].revenue, 125.00) // 50 + 75
}) 
