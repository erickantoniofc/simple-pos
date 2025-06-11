export interface Branch {
    id: string;
    haciendaCode: string;
    name: string;
    address: string;
    department: string;
    municipality: string;
    active: true;
    posPoints: PosPoint[];
}


export interface PosPoint {
    id: string;
    name: string;
    haciendaCode: string;
    location: string;
    active: true;
    branchId: string;
}
