import type { Branch } from "../types/branch";
import { posPoints } from "./pos-points";

export const branches: Branch[] = [
  {
    id: "branch-001",
    name: "Sucursal San Miguel",
    address: "Av. Roosevelt Nte. #123",
    department: "12", // San Miguel
    municipality: "22", // San Miguel Centro
    active: true,
    posPoints: posPoints.filter(p => p.branchId === "branch-001"),
  },
  {
    id: "branch-002",
    name: "Sucursal Santa Ana",
    address: "Calle Libertad #456",
    department: "02", // Santa Ana
    municipality: "15", // Santa Ana Centro
    active: true,
    posPoints: posPoints.filter(p => p.branchId === "branch-002"),
  },
];