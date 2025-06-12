import { createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import type { Category } from "@/data/types/category";
import type { RootState } from "@/store/store";
import { addCategory, updateCategory } from "./category-slice";

export const saveCategoryThunk = createAsyncThunk<
  Category,
  Category,
  { state: RootState }
>("categories/save", async (category, { dispatch }) => {
  const isNew = !category._id;
  const base = {
    ...category,
    description: category.description ?? "",
    active: true,
    _id: category._id ?? uuidv4(),
  };

  if (isNew) {
    dispatch(addCategory(base));
  } else {
    dispatch(updateCategory(base));
  }

  return base;
});

export const toggleCategoryActiveThunk = createAsyncThunk<
  Category,         // retorno (la categoría actualizada)
  string,           // argumento (id de la categoría)
  { state: RootState }
>(
  "categories/toggleActive",
  async (categoryId, { getState, dispatch, rejectWithValue }) => {
    try {
      const category = getState().categories.categories.find(c => c._id === categoryId);
      if (!category) return rejectWithValue("Categoría no encontrada");

      const updatedCategory: Category = {
        ...category,
        active: !category.active
      };

      dispatch(updateCategory(updatedCategory));

      return updatedCategory;
    } catch (err) {
      console.error("Error al actualizar categoría:", err);
      return rejectWithValue("No se pudo actualizar el estado de la categoría");
    }
  }
);
