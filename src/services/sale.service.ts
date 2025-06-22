import { supabase } from "@/lib/supabase";
import type { Sale } from "@/data/types/sale";
import { mapToCamel, mapToSnake } from "@/helpers/case-converters";

export async function createSale(sale: Sale): Promise<Sale> {
  const { saleItems, ...saleData } = sale;
  console.log('Creating sale', sale);
  // Inserta en tabla sales
  const { data: saleInserted, error: saleError } = await supabase
    .from("sales")
    .insert(mapToSnake(saleData))
    .select()
    .single();

  if (saleError || !saleInserted) throw saleError;

  const saleId = saleInserted.id;

  // Inserta sale_items relacionados
  const itemsPayload = saleItems.map(item =>
    mapToSnake({ ...item, saleId })  // importante: snake_case
  );

  const { error: itemsError } = await supabase
    .from("sale_items")
    .insert(itemsPayload);

  if (itemsError) throw itemsError;

  return { ...sale, id: saleId };
}

export async function updateSale(sale: Sale): Promise<Sale> {
  if (!sale.id) throw new Error("Sale ID requerido para actualizar");

  const { saleItems, ...saleData } = sale;
  console.log('Updating sale', sale);

  // Actualiza venta principal
  const { error: saleError } = await supabase
    .from("sales")
    .update(mapToSnake(saleData))
    .eq("id", sale.id);

  if (saleError) throw saleError;

  // Elimina y vuelve a insertar los items
await supabase.from("sale_items").delete().eq("sale_id", sale.id);

const itemsPayload = saleItems
  .filter(item => item.product?.id)
  .map(item => {
    const { id, ...rest } = item; // quitar id duplicado
    return mapToSnake({ ...rest, saleId: sale.id });
  });

const { error: insertError } = await supabase
  .from("sale_items")
  .insert(itemsPayload);

if (insertError) throw insertError;

  return sale;
}

export async function getAllSales(): Promise<Sale[]> {
  const { data, error } = await supabase
    .from("sales")
    .select("*, sale_items(*)");

  if (error) throw error;

  return data.map(mapToCamel) as Sale[];
}