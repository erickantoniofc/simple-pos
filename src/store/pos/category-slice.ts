import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Category } from '@/data/types/category';
import {mockCategories } from '@/data/mocks/categories';

interface CategoryState {
    categories: Category[];
}

const initialState: CategoryState = {
    categories: mockCategories,
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
        }
    }
});

export const {addCategory, updateCategory, deleteCategoryById} = categorySlice.actions;
export default categorySlice.reducer;