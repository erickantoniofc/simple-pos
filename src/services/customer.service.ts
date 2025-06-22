import { supabase } from "@/lib/supabase";
import type { Customer } from "@/data/types/customer";

export const mapToSnake = (customer: Customer): Record<string, any> => ({
  id: customer.id,
  name: customer.name,
  email: customer.email,
  phone: customer.phone,
  address: customer.address,
  department: customer.department,
  municipality: customer.municipality,
  dui: customer.dui,
  nit: customer.nit,
  nrc: customer.nrc,
  activity: customer.activity,
  send_method: customer.sendMethod,
  active: customer.active,
});

export const mapToCamel = (data: Record<string, any>): Customer => ({
  id: data.id,
  name: data.name,
  email: data.email,
  phone: data.phone,
  address: data.address,
  department: data.department,
  municipality: data.municipality,
  dui: data.dui,
  nit: data.nit,
  nrc: data.nrc,
  activity: data.activity,
  sendMethod: data.send_method,
  active: data.active,
});

export async function getAllCustomers(): Promise<Customer[]> {
  const { data, error } = await supabase.from("customers").select("*");
  if (error) throw error;
  return (data ?? []).map(mapToCamel);
}

export async function createCustomer(customer: Customer): Promise<Customer> {
  const { data, error } = await supabase
    .from("customers")
    .insert(mapToSnake(customer))
    .select()
    .single();

  if (error) throw error;
  return mapToCamel(data);
}

export async function updateCustomer(customer: Customer): Promise<Customer> {
  const { data, error } = await supabase
    .from("customers")
    .update(mapToSnake(customer))
    .eq("id", customer.id)
    .select()
    .single();

  if (error) throw error;
  return mapToCamel(data);
}

export async function toggleCustomerActive(id: string, active: boolean): Promise<Customer> {
  const { data, error } = await supabase
    .from("customers")
    .update({ active })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return mapToCamel(data);
}