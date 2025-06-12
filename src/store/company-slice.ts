import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Company } from '@/data/types/company';
import { companyMock } from '@/data/mocks/company-mock';
import type { RootState } from './store';

interface CompanyState {
    company: Company,
}

const initialState: CompanyState = {
    company: companyMock
}

export const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        setCompany: (state, action: PayloadAction<Company>) => {
            state.company = action.payload;
        }
    }
});

export const {setCompany} = companySlice.actions;
export default companySlice.reducer;