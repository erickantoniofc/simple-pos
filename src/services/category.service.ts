import { supabase } from "@/lib/supabase";
import type { Category } from "@/data/types/category";



// Crear
export async function createCategory(category: Category) {
  const { data, error } = await supabase
    .from("categories")
    .insert(category)
    .select()
    .single();

  if (error) throw error;
  return data as Category;
}

// Actualizar
export async function updateCategory(category: Category) {
  const { data, error } = await supabase
    .from("categories")
    .update(category)
    .eq("id", category.id)
    .select()
    .single();

  if (error) throw error;
  return data as Category;
}

// Alternar activo/inactivo
export async function toggleCategoryActive(id: string, active: boolean) {
  const { data, error } = await supabase
    .from("categories")
    .update({ active })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Category;
}

// Obtener todas
export async function getAllCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*");

  if (error) throw error;
  return data as Category[];
}