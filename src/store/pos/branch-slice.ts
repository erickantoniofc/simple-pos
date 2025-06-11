import { branches } from '@/data/mocks/branches';
import type { Branch, PosPoint } from '@/data/types/branch';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';


interface BranchState {
    branches: Branch[],
    activeBranch: Branch,
    activePos: PosPoint
}

const initialState: BranchState = {
    branches: branches,
    activeBranch: branches[0],
    activePos: branches[0].posPoints[0]
}

export const branchSlice = createSlice({
    name: 'branch',
    initialState,
    reducers: {
        setActiveBranch: (state, action: PayloadAction<Branch>) => {
            state.activeBranch = action.payload;
            state.activePos = action.payload.posPoints[0];
        },
        setActivePos: (state, action: PayloadAction<PosPoint>) => {
            const existsInBranch = state.activeBranch.posPoints.some(
                (pos) => pos.id === action.payload.id
            );
            if (existsInBranch) {
                state.activePos = action.payload;
            }
        },
        addBranch: (state, action: PayloadAction<Branch>) => {
            state.branches.push(action.payload);
        },
        updateBranch: (state, action: PayloadAction<Branch>) => {
            const updated = action.payload;
            const index = state.branches.findIndex(b => b.id === updated.id);

            if (index !== -1) {
                state.branches[index] = updated;
                if (state.activeBranch.id === updated.id) {
                state.activeBranch = updated;

                const posExists = updated.posPoints.some(p => p.id === state.activePos.id);
                if (!posExists) {
                    state.activePos = updated.posPoints[0];
                }
                }
            }
        },
        updatePosPoint: (state, action: PayloadAction<PosPoint>) => {
            const updatedPos = action.payload;

            const branchIndex = state.branches.findIndex(branch =>
                branch.posPoints.some(pos => pos.id === updatedPos.id)
            );

            if (branchIndex === -1) return;

            const posIndex = state.branches[branchIndex].posPoints.findIndex(pos => pos.id === updatedPos.id);
            if (posIndex !== -1) {
                state.branches[branchIndex].posPoints[posIndex] = updatedPos;

                if (state.activePos.id === updatedPos.id) {
                state.activePos = updatedPos;
                }
            }
        },
        deleteBranch: (state, action: PayloadAction<string>) => {
            const branchId = action.payload;

            const branch = state.branches.find(b => b.id === branchId);
            if (branch) {
                
                (branch as any).active = false;

                if (state.activeBranch.id === branchId) {
                const nextActive = state.branches.find(b => b.id !== branchId && (b as any).active !== false);
                if (nextActive) {
                    state.activeBranch = nextActive;
                    state.activePos = nextActive.posPoints[0];
                }
                }
            }
        },
        deletePosPoint: (state, action: PayloadAction<string>) => {
            const posId = action.payload;

            const branch = state.branches.find(branch =>
                branch.posPoints.some(pos => pos.id === posId)
            );

            if (!branch) return;

            const pos = branch.posPoints.find(p => p.id === posId);
            if (pos) {
                (pos as any).active = false;

                // Si el POS eliminado está activo, cambia al primero activo disponible
                if (state.activePos.id === posId) {
                const nextPos = branch.posPoints.find(p => (p as any).active !== false);
                if (nextPos) {
                    state.activePos = nextPos;
                }
                }
            }
        }   
        
    },
    
    
});

export const {setActiveBranch, setActivePos, updateBranch, updatePosPoint} = branchSlice.actions;
export default branchSlice.reducer;