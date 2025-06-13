import type { User as SupabaseUser } from '@supabase/supabase-js'

export interface UserPermissions {
  accessPosPointIds: string[];
  canCrudProducts: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  role: "admin" | "user";
  permissions: UserPermissions;
  created_at: string;
  updated_at: string;
}
// TODO: Think about remove this interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  permissions: UserPermissions;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: SupabaseUser | null;
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}
