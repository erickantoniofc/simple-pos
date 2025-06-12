import type { Customer } from "./customer";
import type { SaleItem } from "./sale-item";

export const DocumentType = {
    FE: 1,
    CCF: 2
}

export const DocumentStatus = {
    INIT: 0,
    SAVE: 1,
    SEND: 2,
    CANCELLED: 3,
    SEND_ERROR: 4,
}

export interface Sale {
    _id?: string;
    date?: string;
    sendDate?: string;
    total: number;
    posId: string;
    saleItems: SaleItem[];
    customer?: Customer;
    documentType: number; 
    status: number;
    documentNumber: string;
    paymentTerm: [number, string];
    paymentMethod: string;
    transactionTerm: string;
    cancelledDate?: string;

}