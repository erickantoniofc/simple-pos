export interface Customer {
    _id: string;
    name: string;
    email?: string;
    phone?: string; 
    address?: string;
    department?: string;
    municipality?: string;
    dui?: string;
    nit?: string;
    nrc?: string;
    activity?: number;
    sendMethod? : number; // 1: email, 2: whatsapp, 3: both
    active: boolean;
}

