export interface Customer {
    id?: string;
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
    sendMethod? : number; 
    active: boolean;
}

