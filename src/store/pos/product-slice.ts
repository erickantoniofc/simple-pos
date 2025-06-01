import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '@/mocks/types/product';
import { mockProducts } from '@/mocks/products';

interface ProductsState {
    products: Product[]
}

const initialState: ProductsState = {
    products: mockProducts
}

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
            state.products.push(action.payload);
        },
        updateProduct: (state, action: PayloadAction<Product>) => {
            state.products = state.products.map(
                product => 
                    product.id === action.payload.id
                ? {...product, ...action.payload}
                : product
            ); 
        }
    }
});

export const {updateProduct, addProduct} = productSlice.actions;
export default productSlice.reducer;