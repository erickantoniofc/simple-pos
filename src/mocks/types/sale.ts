import type { Customer } from "./customer";
import type { SaleItem } from "./sale-item";

export const DocumentType = {
    FE: 1,
    CCF: 2
}

export const DocumentState = {
    SAVE: 1,
    SEND: 2,
    CANCELLED: 3,
    SEND_ERROR: 4,
}

export interface Sale {
    _id?: string;
    date?: string;
    total: number;
    saleItems: SaleItem[];
    customer?: Customer;
    documentType: number; 
    state: number;
    documentNumber: string;
    

}