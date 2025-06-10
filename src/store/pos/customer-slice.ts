import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Customer } from '@/data/types/customer';
import {mockCustomers } from '@/data/mocks/customers';

interface CustomerState {
    customers: Customer[],
    selectedCustomer:  Customer | null | undefined;
    selectCreatedCustomerInSale: boolean;

}

const initialState: CustomerState = {
    customers: mockCustomers,
    selectedCustomer: undefined,
    selectCreatedCustomerInSale: false

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
                    customer._id === action.payload._id
                ? {...customer, ...action.payload}
                : customer
            ); 
        },
        deleteCustomerById: (state, action: PayloadAction<string>) => {
            const customer = state.customers.find(c => c._id === action.payload);
            if(customer) {
                customer.active = false;
            }
        },
        setActiveCustomer: (state, action: PayloadAction<Customer | null | undefined>) => {
            state.selectedCustomer = action.payload;
        },
        toggleCustomerActive: (state, action: PayloadAction<string>) => {
        const customer = state.customers.find(c => c._id === action.payload);
        if (customer) {
            customer.active = !customer.active;
        }
        },
        setSelectCreatedCustomerInSale: (state, action: PayloadAction<boolean>) => {
            state.selectCreatedCustomerInSale = action.payload;
        }
    }
});

export const {setActiveCustomer, addCustomer, updateCustomer, deleteCustomerById, toggleCustomerActive, setSelectCreatedCustomerInSale} = customerSlice.actions;
export default customerSlice.reducer;