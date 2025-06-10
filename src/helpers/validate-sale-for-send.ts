import type { Sale } from "@/data/types/sale";

export const validateSaleForSend = (sale: Sale): string[] => {
  const errors: string[] = [];
  const customer = sale.customer;
  const isCreditoFiscal = sale.documentType === 2;

  // 1. Cliente seleccionado
  if (!customer) return ["Debe seleccionar un cliente."];

  // 2. Datos generales del cliente
  const clienteErrors: string[] = [];
  if (!customer.name?.trim()) clienteErrors.push("El cliente debe tener nombre.");
  if (!customer.email?.trim()) clienteErrors.push("El cliente debe tener un email.");
  if (!customer.department?.trim()) clienteErrors.push("El cliente debe tener un departamento.");
  if (!customer.municipality?.trim()) clienteErrors.push("El cliente debe tener un municipio.");
  if (!customer.sendMethod || customer.sendMethod <= 0) clienteErrors.push("Debe seleccionar un método de envío válido.");
  if (clienteErrors.length) return clienteErrors;

  // 3. Tipo de documento
  if (![1, 2].includes(sale.documentType)) {
    return ["Debe seleccionar un tipo de documento válido."];
  }

  // 4. Datos adicionales para crédito fiscal
  if (isCreditoFiscal) {
    const fiscalErrors: string[] = [];
    if (!customer.nrc?.trim()) fiscalErrors.push("El cliente debe tener NRC.");
    if (!customer.nit?.trim()) fiscalErrors.push("El cliente debe tener NIT.");
    if (!customer.activity || customer.activity <= 0) fiscalErrors.push("Debe seleccionar una actividad económica.");
    if (fiscalErrors.length) return fiscalErrors;
  }

  // 5. Condición de transacción
  if (!sale.transactionTerm?.trim()) {
    return ["Debe seleccionar una condición de transacción."];
  }

  // 6. Validación de plazo si es crédito
  if (sale.transactionTerm === "2") {
    const [days, unit] = sale.paymentTerm ?? [0, ""];
    const plazoErrors: string[] = [];
    if (!days || days <= 0) plazoErrors.push("Debe definir los días de plazo de pago.");
    if (!unit?.trim()) plazoErrors.push("Debe seleccionar la unidad del plazo (días, meses, años).");
    if (plazoErrors.length) return plazoErrors;
  }

  // 7. Productos
  if (!sale.saleItems || sale.saleItems.length === 0) {
    return ["Debe agregar al menos un producto."];
  }

  // 8. Total
  if (!sale.total || sale.total <= 0) {
    return ["El total debe ser mayor que cero."];
  }

  return errors;
};