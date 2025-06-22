import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Customer } from '@/data/types/customer';
import { loadCustomersThunk, saveCustomerThunk, toggleCustomerActiveThunk } from './customer-thunk';
import { clearAllErrors } from './product-slice';

interface CustomerState {
    customers: Customer[],
    selectedCustomer:  Customer | null | undefined;
    selectCreatedCustomerInSale: boolean;
    loading: boolean;
    toggleLoading: boolean;
    listLoading: boolean;
    error: string | null;
    listError: string | null;
}

const initialState: CustomerState = {
    customers:  [] as Customer[],
    selectedCustomer: undefined,
    selectCreatedCustomerInSale: false,
    loading: false,
    toggleLoading: false,
    listLoading: false,
    error: null,
    listError: null,
}

export const customerSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {
        addCustomer: (state, action: PayloadAction<Customer>) => {
            state.customers.push(action.payload);
        },
        updateCustomer: (state, action: PayloadAction<Customer>) => {
            state.customers = state.customers.map(
                customer => 
                    customer.id === action.payload.id
                ? {...customer, ...action.payload}
                : customer
            ); 
        },
        deleteCustomerById: (state, action: PayloadAction<string>) => {
            const customer = state.customers.find(c => c.id === action.payload);
            if(customer) {
                customer.active = false;
            }
        },
        setActiveCustomer: (state, action: PayloadAction<Customer | null | undefined>) => {
            state.selectedCustomer = action.payload;
        },
        toggleCustomerActive: (state, action: PayloadAction<string>) => {
        const customer = state.customers.find(c => c.id === action.payload);
        if (customer) {
            customer.active = !customer.active;
        }
        },
        setSelectCreatedCustomerInSale: (state, action: PayloadAction<boolean>) => {
            state.selectCreatedCustomerInSale = action.payload;
        },
        clearAllCustomerErrors: (state) => {
            state.error = null;
            state.listError = null;
        }
    },
    extraReducers: (builder) => {
    builder    
        // Cargar clientes
    .addCase(loadCustomersThunk.pending, (state) => {
        state.listLoading = true;
        state.listError = null;
    })
    .addCase(loadCustomersThunk.fulfilled, (state, action) => {
        state.listLoading = false;
        state.customers = action.payload;
    })
    .addCase(loadCustomersThunk.rejected, (state, action) => {
        state.listLoading = false;
        state.listError = action.error.message ?? "Error al cargar clientes";
    })

    // Guardar cliente
    .addCase(saveCustomerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(saveCustomerThunk.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.customers.findIndex(c => c.id === action.payload.id);
        if (index >= 0) {
        state.customers[index] = action.payload;
        } else {
        state.customers.push(action.payload);
        }
    })
    .addCase(saveCustomerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al guardar cliente";
    })

    // Activar / Desactivar cliente
    .addCase(toggleCustomerActiveThunk.pending, (state) => {
        state.toggleLoading = true;
        state.error = null;
    })
    .addCase(toggleCustomerActiveThunk.fulfilled, (state, action) => {
        state.toggleLoading = false;
        const customer = state.customers.find(c => c.id === action.payload);
        if (customer) customer.active = !customer.active;
    })
    .addCase(toggleCustomerActiveThunk.rejected, (state, action) => {
        state.toggleLoading = false;
        state.error = action.error.message ?? "Error al actualizar cliente";
    });
    }
});

export const {clearAllCustomerErrors, setActiveCustomer, addCustomer, updateCustomer, deleteCustomerById, toggleCustomerActive, setSelectCreatedCustomerInSale} = customerSlice.actions;
export default customerSlice.reducer;