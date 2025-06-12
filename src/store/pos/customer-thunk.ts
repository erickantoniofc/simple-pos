import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";
import { addCustomer, toggleCustomerActive, updateCustomer } from "./customer-slice";
import { updateActiveSale } from "../pos/sale-slice";
import type { Customer } from "@/data/types/customer";

export const saveCustomerThunk = createAsyncThunk<
  Customer,
  Customer,
  { state: RootState }
>("customers/save", async (customer, { getState, dispatch }) => {
  const state = getState();
  const isNew = !customer._id;
  const activeCustomerId = state.sales.activeSale?.customer?._id;

  if (isNew) {
    dispatch(addCustomer(customer));
    if (state.customers.selectCreatedCustomerInSale) {
      dispatch(updateActiveSale({ customer }));
    }
  } else {
    dispatch(updateCustomer(customer));
    if (activeCustomerId === customer._id) {
      dispatch(updateActiveSale({ customer }));
    }
  }

  return customer;
});

export const toggleCustomerActiveThunk = createAsyncThunk<
  string,              // Return type: el ID del cliente actualizado
  string               // Argumento: el ID del cliente
>("customers/toggle-active", async (customerId, { dispatch }) => {
  dispatch(toggleCustomerActive(customerId));
  return customerId;
});