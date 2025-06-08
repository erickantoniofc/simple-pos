export interface Product {
    _id: string;
    name: string;
    price: number;
    imageUrl?: string;
    active: boolean;
    category: string;
}