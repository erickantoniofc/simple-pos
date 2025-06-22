import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '@/data/types/product';
import { mockProducts } from '@/data/mocks/products';
import { createProductThunk, fetchProducts, toggleProductActiveThunk, updateProductThunk } from './product-thunk';

interface ProductsState {
    products: Product[],
    selectedProduct?: Product | null | undefined;
    listLoading: boolean;
    errorList: string | null;
    loading: boolean;
    error: string | null;
    toggleLoading: boolean;
}

const initialState: ProductsState = {
    products: [] as Product[],
    selectedProduct: undefined,
    listLoading: false,
    errorList: null,
    loading: false,
    error: null,
    toggleLoading: false,
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
        },
        deleteProductById: (state, action: PayloadAction<string>) => {
            const product = state.products.find(p => p.id === action.payload);
            if(product) {
                product.active = false;
            }
        },
        setActiveProduct: (state, action: PayloadAction<Product | null | undefined>) => {
            state.selectedProduct = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
        state.loading = action.payload;
        },
        clearAllErrors: (state) => {
            state.error = null;
            state.errorList = null;
            state.toggleLoading = false;
        }
        
    },
extraReducers: (builder) => {
  builder
    // Fetch
    .addCase(fetchProducts.pending, (state) => {
      state.listLoading = true;
      state.error = null;
    })
    .addCase(fetchProducts.fulfilled, (state, action) => {
      state.listLoading = false;
      state.products = action.payload;
    })
    .addCase(fetchProducts.rejected, (state, action) => {
      state.listLoading = false;
      state.errorList = action.payload as string;
    })

    // Create
    .addCase(createProductThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(createProductThunk.fulfilled, (state, action) => {
        if (action.payload) {
            state.products.push(action.payload);
        }
      state.loading = false;
    })
    .addCase(createProductThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })

    // Update
    .addCase(updateProductThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    })

    .addCase(updateProductThunk.fulfilled, (state, action) => {
    const updated = action.payload;
    const index = state.products.findIndex(p => p.id === updated.id);
    if (index !== -1) {
        state.products[index] = updated;
    }

    state.loading = false;
    })
    .addCase(updateProductThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })

    .addCase(toggleProductActiveThunk.pending, (state) => {
    state.toggleLoading = true;
    })
    .addCase(toggleProductActiveThunk.fulfilled, (state, action) => {
    const updated = action.payload;
    const index = state.products.findIndex(p => p.id === updated.id);
    if (index !== -1) {
        state.products[index] = updated;
    }
    })
    .addCase(toggleProductActiveThunk.rejected, (state) => {
        state.toggleLoading = false;
        });

    }
    });

export const {updateProduct, addProduct, deleteProductById, setActiveProduct, setLoading, clearAllErrors} = productSlice.actions;
export default productSlice.reducer;