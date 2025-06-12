import type { Branch } from "../types/branch";
import { posPoints } from "./pos-points";

export const branches: Branch[] = [
  {
    id: "branch-001",
    name: "Sucursal Casa Matriz",
    address: "6ta Calle ote y 8va Av. Norte Barrio La Cruz #510",
    department: "12", // San Miguel
    municipality: "22", // San Miguel Centro
    haciendaCode: "0001",
    stablishmentType: "01",
    commercialName: "Botanica Natumundo",
    active: true,
    posPoints: posPoints.filter(p => p.branchId === "branch-001"),
  },
  {
    id: "branch-002",
    name: "Sucursal Santa Ana",
    address: "Calle Libertad #456",
    department: "02", // Santa Ana
    municipality: "15", // Santa Ana Centro
    haciendaCode: "0002",
    stablishmentType: "01",
    commercialName: "Farmacia Real Medic",
    active: true,
    posPoints: posPoints.filter(p => p.branchId === "branch-002"),
  },
];