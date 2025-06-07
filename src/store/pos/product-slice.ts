import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '@/data/types/product';
import { mockProducts } from '@/data/mocks/products';

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
                    product._id === action.payload._id
                ? {...product, ...action.payload}
                : product
            ); 
        },
        deleteProductById: (state, action: PayloadAction<string>) => {
            const product = state.products.find(p => p._id === action.payload);
            if(product) {
                product.active = false;
            }

        },
    }
});

export const {updateProduct, addProduct, deleteProductById} = productSlice.actions;
export default productSlice.reducer;