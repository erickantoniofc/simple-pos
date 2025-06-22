import { supabase } from "@/lib/supabase";
import type { Branch, PosPoint } from "@/data/types/branch";

export const branchService = {
  // Fetch all active branches
    async getActiveBranches(): Promise<Branch[]> {
    const { data, error } = await supabase
        .from("branches")
        .select("id, hacienda_code, name, address, department, municipality, stablishment_type, commercial_name, active")
        .eq("active", true);

    if (error) throw error;

    return (data ?? []).map((branch): Branch => ({
        id: branch.id,
        haciendaCode: branch.hacienda_code,
        name: branch.name,
        address: branch.address,
        department: branch.department,
        municipality: branch.municipality,
        stablishmentType: branch.stablishment_type,
        commercialName: branch.commercial_name,
        active: branch.active,
        posPoints: [] // se llenará después en el thunk
    }));
    },

  // Fetch a specific branch by ID
    async getBranchById(branchId: string): Promise<Branch | null> {
    const { data, error } = await supabase
        .from("branches")
        .select("id, hacienda_code, name, address, department, municipality, stablishment_type, commercial_name, active")
        .eq("id", branchId)
        .single();

    if (error) {
        if (error.code === "PGRST116") return null; // Row not found
        throw error;
    }

    return {
        id: data.id,
        haciendaCode: data.hacienda_code,
        name: data.name,
        address: data.address,
        department: data.department,
        municipality: data.municipality,
        stablishmentType: data.stablishment_type,
        commercialName: data.commercial_name,
        active: data.active,
        posPoints: [] // Optional: puedes llenarlo por separado
    };
    },
  // Fetch all active POS points for a specific branch
    async getActivePosPointsByBranch(branchId: string): Promise<PosPoint[]> {
    const { data, error } = await supabase
        .from("pos_points")
        .select("id, name, hacienda_code, location, active, branch_id")
        .eq("branch_id", branchId)
        .eq("active", true);

    if (error) throw error;

    return (data ?? []).map((pos) => ({
        id: pos.id,
        name: pos.name,
        haciendaCode: pos.hacienda_code,    
        location: pos.location,
        active: pos.active,
        branchId: pos.branch_id,
    }));
    },

  // Fetch all active POS points in the system
  async getAllActivePosPoints(): Promise<PosPoint[]> {
    const { data, error } = await supabase
      .from("pos_points")
      .select("*")
      .eq("active", true);

    if (error) throw error;
    return data ?? [];
  }
};