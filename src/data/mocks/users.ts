import type { User } from "../types/user";

export const user: User = {
  id: "user-001",
  name: "Erick Flores",
  email: "erick@example.com",
  role: "admin",
  permissions: {
    accessPosPointIds: ["pos-001", "pos-002", "pos-003", "pos-004"], 
    canCrudProducts: true,
  },
};