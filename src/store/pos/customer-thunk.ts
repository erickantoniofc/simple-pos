import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";
import type { Customer } from "@/data/types/customer";
import {
  createCustomer,
  updateCustomer,
  toggleCustomerActive as toggleCustomerActiveService,
  getAllCustomers,
} from "@/services/customer.service";

// Guardar (crear o actualizar) cliente
export const saveCustomerThunk = createAsyncThunk<
  Customer,
  Customer,
  { state: RootState }
>("customers/save", async (customer, { getState }) => {
  const isNew = !customer.id;

  if (isNew) {
    const created = await createCustomer(customer);
    return created;
  } else {
    const updated = await updateCustomer(customer);
    return updated;
  }
});

// Activar / Desactivar cliente
export const toggleCustomerActiveThunk = createAsyncThunk<
  string,
  string,
  { state: RootState }
>("customers/toggle-active", async (customerId, { getState }) => {
  const state = getState();
  const current = state.customers.customers.find(c => c.id === customerId);

  if (!current) throw new Error("Cliente no encontrado");

  await toggleCustomerActiveService(customerId, !current.active);

  return customerId;
});

export const loadCustomersThunk = createAsyncThunk<Customer[]>(
  "customers/loadAll",
  async () => {
    return await getAllCustomers();
  }
);