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
    id?: string;
    date?: string;
    sendDate?: string;
    total: number;
    posId: string;
    saleItems: SaleItem[];
    customerId?: string;
    customer?: Customer;
    documentType: number;
    status: number;
    documentNumber: string;
    paymentTerm: [number, string];
    paymentMethod: string;
    transactionTerm: string;
    cancelledDate?: string;
    signedDTE?: unknown;
}

export interface SalesState {
    sales: Sale[];
    activeSale: Sale | null;
    loading: boolean;
    saveLoading: boolean,  
    error: string | null;
    listLoading: boolean;
    sendLoading: boolean;
}
