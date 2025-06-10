import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Category } from '@/data/types/category';
import {mockCategories } from '@/data/mocks/categories';

interface CategoryState {
    categories: Category[];
    activeCategory: Category | null | undefined;
}

const initialState: CategoryState = {
    categories: mockCategories,
    activeCategory: undefined
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
                    category._id === action.payload._id
                ? {...category, ...action.payload}
                : category
            ); 
        },
        deleteCategoryById: (state, action: PayloadAction<string>) => {
            const category = state.categories.find(c => c._id === action.payload);
            if(category) {
                category.active = false;
            }
        },
        setActiveCategory: (state, action: PayloadAction<Category | null | undefined>) => {
            state.activeCategory = action.payload;
        },
        toggleCategoryActive: (state, action: PayloadAction<string>) => {
            const category = state.categories.find(c => c._id === action.payload);
            if(category) {
                category.active = !category.active;
            }
        }
    }
});

export const {addCategory, updateCategory, deleteCategoryById, setActiveCategory, toggleCategoryActive} = categorySlice.actions;
export default categorySlice.reducer;