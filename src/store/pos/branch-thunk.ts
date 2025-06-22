import { createAsyncThunk } from "@reduxjs/toolkit";
import { branchService } from "@/services/branch.service";
import type { Branch } from "@/data/types/branch";
import type { RootState } from "@/store/store";

export const fetchBranches = createAsyncThunk<Branch[], void, { state: RootState }>(
  "branch/fetchBranches",
  async (_, thunkAPI) => {
    try {
    const accessPosPointIds = thunkAPI
    .getState()
    .auth.profile?.permissions?.accessPosPointIds.map((id) => id.trim()) ?? [];
      const branches = await branchService.getActiveBranches();
 
      const filtered = await Promise.all(
        branches.map(async (branch) => {
          const posPoints = await branchService.getActivePosPointsByBranch(branch.id); 
          const accessiblePos = posPoints.filter(pos => accessPosPointIds.includes(pos.haciendaCode?.trim()));

          if (accessiblePos.length === 0) return null;
          return { ...branch, posPoints: accessiblePos };
        })
      );
      const allowedBranches = filtered.filter(Boolean) as Branch[];
      return allowedBranches;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch branches");
    }
  }
);