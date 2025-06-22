
import { createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import type { Category } from "@/data/types/category";
import type { RootState } from "@/store/store";
import { addCategory, updateCategory } from "./category-slice";
import {
  createCategory,
  updateCategory as updateCategoryService,
  toggleCategoryActive as toggleCategoryActiveService,
  getAllCategories,
} from "@/services/category.service";

// Crear o actualizar
export const saveCategoryThunk = createAsyncThunk<
  Category,
  Category,
  { state: RootState }
>("categories/save", async (category, { dispatch }) => {
  console.log('Thunk called with category:', category)
  const isNew = !category.id;
  const base: Category = {
    ...category,
    description: category.description ?? "",
    active: true,
    id: category.id ?? uuidv4(),
  };

  const saved = isNew
    ? await createCategory(base)
    : await updateCategoryService(base);
    console.log('Saved', saved)

  dispatch(isNew ? addCategory(saved) : updateCategory(saved));
  return saved;
});

// Activar o desactivar
export const toggleCategoryActiveThunk = createAsyncThunk<
  Category,
  string,
  { state: RootState }
>(
  "categories/toggleActive",
  async (categoryId, { getState, dispatch, rejectWithValue }) => {
    try {
      const category = getState().categories.categories.find(
        (c) => c.id === categoryId
      );
      if (!category) return rejectWithValue("Categoría no encontrada");

      const updated = await toggleCategoryActiveService(
        categoryId,
        !category.active
      );

      dispatch(updateCategory(updated));
      return updated;
    } catch (err) {
      console.error("Error al alternar categoría:", err);
      return rejectWithValue("No se pudo actualizar el estado de la categoría");
    }
  }
  
);

export const loadCategoriesThunk = createAsyncThunk<Category[]>(
  "categories/loadAll",
  async () => {
    const result = await getAllCategories();
    return result;
  }
);