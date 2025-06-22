import { supabase } from "@/lib/supabase";
import type { Product } from "@/data/types/product";

const mapToSnake = (product: Product) => ({
  id: product.id,
  name: product.name,
  price: product.price,
  image_url: product.imageUrl,
  active: product.active,
  category: product.category,
});

const mapToCamel = (row: any): Product => ({
  id: row.id,
  name: row.name,
  price: row.price,
  imageUrl: row.image_url,
  active: row.active,
  category: row.category,
});

export const productService = {
  async getAll(): Promise<Product[]> {
    const { data, error } = await supabase
      .from("products")
      .select("id, name, price, image_url, active, category");

    if (error) throw error;
    return (data ?? []).map(mapToCamel);
  },

  async create(product: Product) {
    const { data, error } = await supabase
      .from("products")
      .insert(mapToSnake(product))
      .select()
      .single();

    if (error) throw error;
    return mapToCamel(data);
  },

  async update(product: Product) {
    const { error } = await supabase
      .from("products")
      .update(mapToSnake(product))
      .eq("id", product.id);

    if (error) throw error;
  },

async toggle(product: Product): Promise<Product> {
  const updated = { ...product, active: !product.active };

  const { error } = await supabase
    .from("products")
    .update(mapToSnake(updated))
    .eq("id", product.id);

  if (error) throw error;

  return updated; // 🔁 Retorna el producto actualizado
}
};