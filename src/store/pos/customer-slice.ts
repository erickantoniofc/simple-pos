import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Customer } from '@/mocks/types/customer';
import {mockCustomers } from '@/mocks/customers';

interface CustomerState {
    customers: Customer[]
}

const initialState: CustomerState = {
    customers: mockCustomers
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
        }
    }
});

export const {addCustomer, updateCustomer, deleteCustomerById} = customerSlice.actions;
export default customerSlice.reducer;