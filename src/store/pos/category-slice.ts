import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Category } from '@/data/types/category';
import {mockCategories } from '@/data/mocks/categories';
import { loadCategoriesThunk, saveCategoryThunk, toggleCategoryActiveThunk } from './category-thunk';

interface CategoryState {
    categories: Category[];
    activeCategory: Category | null | undefined;
    listLoading: boolean;
    listError: string | null;
    loading: boolean;
    toggleLoading: boolean;
    error: string | null;
}

const initialState: CategoryState = {
    categories: [],
    activeCategory: undefined,
    listLoading: false,
    listError: null,
    loading: false,
    toggleLoading: false,
    error: null,
}

function upsertCategory(state: CategoryState, category: Category) {
  const index = state.categories.findIndex((c) => c.id === category.id);
  if (index >= 0) {
    state.categories[index] = category; // editar o activar/desactivar
  } else {
    state.categories.push(category); // insertar nueva
  }
}

export const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        addCategory: (state, action: PayloadAction<Category>) => {
            state.categories.push(action.payload);
        },
        updateCategory: (state, action: PayloadAction<Category>) => {
            state.categories = state.categories.map(
                category => 
                    category.id === action.payload.id
                ? {...category, ...action.payload}
                : category
            ); 
        },
        deleteCategoryById: (state, action: PayloadAction<string>) => {
            const category = state.categories.find(c => c.id === action.payload);
            if(category) {
                category.active = false;
            }
        },
        setActiveCategory: (state, action: PayloadAction<Category | null | undefined>) => {
            state.activeCategory = action.payload;
        },
        toggleCategoryActive: (state, action: PayloadAction<string>) => {
            const category = state.categories.find(c => c.id === action.payload);
            if(category) {
                category.active = !category.active;
            }
        },
        clearCategoryErrors: (state) => {
            state.error = null;
            state.listError = null;
        },

    },
    extraReducers: (builder) => {
  builder
    // Cargar lista
    .addCase(loadCategoriesThunk.pending, (state) => {
      state.listLoading = true;
      state.listError = null;
    })
    .addCase(loadCategoriesThunk.fulfilled, (state, action) => {
      state.listLoading = false;
      state.categories = action.payload;
    })
    .addCase(loadCategoriesThunk.rejected, (state, action) => {
      state.listLoading = false;
      state.listError = action.error.message ?? "Error al cargar categorías";
    })

    // Guardar (crear o editar)
    .addCase(saveCategoryThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(saveCategoryThunk.fulfilled, (state, action) => {
      state.loading = false;
      upsertCategory(state, action.payload);
    })
    .addCase(saveCategoryThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Error al guardar categoría";
    })

    // Activar/Desactivar
    .addCase(toggleCategoryActiveThunk.pending, (state) => {
      state.toggleLoading = true;
      state.error = null;
    })
    .addCase(toggleCategoryActiveThunk.fulfilled, (state, action) => {
      state.toggleLoading = false;
      upsertCategory(state, action.payload);
    })
    .addCase(toggleCategoryActiveThunk.rejected, (state, action) => {
      state.toggleLoading = false;
      state.error = action.error.message ?? "Error al cambiar estado de categoría";
    });
}
});

export const {addCategory, updateCategory, deleteCategoryById, setActiveCategory, toggleCategoryActive, clearCategoryErrors} = categorySlice.actions;
export default categorySlice.reducer;