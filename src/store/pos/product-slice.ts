import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '@/data/types/product';
import { mockProducts } from '@/data/mocks/products';

interface ProductsState {
    products: Product[],
    selectedProduct?: Product | null | undefined;
}

const initialState: ProductsState = {
    products: mockProducts,
    selectedProduct: undefined,
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
        setActiveProduct: (state, action: PayloadAction<Product | null | undefined>) => {
            state.selectedProduct = action.payload;
        },
        toggleProductActive: (state, action: PayloadAction<string>) => {
            const product = state.products.find(p => p._id === action.payload);
            if(product) {
                product.active = !product.active;
            }
        }
    }
});

export const {updateProduct, addProduct, deleteProductById, setActiveProduct, toggleProductActive} = productSlice.actions;
export default productSlice.reducer;