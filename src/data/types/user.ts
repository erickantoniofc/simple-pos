
export interface UserPermissions {
  accessPosPointIds: string[]; 
  canCrudProducts: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  permissions: UserPermissions;
}