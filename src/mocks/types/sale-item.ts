import type { Product } from "./product";

export interface SaleItem {
    _id?: string;
    product: Product;
    quantity: number;
    price: number;
    total: number;
    discount: number;
    subtotal: number;
}