export type Branch = {
  id: string;
  name: string;
  location: string;
};

export const mockBranches: Branch[] = [
  { id: "b1", name: "Sucursal San Miguel", location: "San Miguel, El Salvador" },
  { id: "b2", name: "Sucursal Santa Ana", location: "Santa Ana, El Salvador" }
];