export type Supplier = {
  id: string;
  name: string;
  contact: string;
};

export const mockSuppliers: Supplier[] = [
  { id: "s1", name: "Distribuidora Médica S.A.", contact: "ventas@dismed.com" },
  { id: "s2", name: "Farmasal", contact: "info@farmasal.com" }
];