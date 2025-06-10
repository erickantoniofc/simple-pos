import type { Sale } from "@/data/types/sale";

export const validateSaleForSave = (sale: Sale): string[] => {
  const errors: string[] = [];

  if (!sale.customer) {
    errors.push("Debe seleccionar un cliente.");
  }

  return errors;
};