import type { Product } from "./product"

export interface CartItem {
  id: string
  product: Product
  price: number
  qty: number
}
