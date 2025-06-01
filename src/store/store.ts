import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./pos/product-slice";
import { authSlice } from "./auth/auth-slice";

export const store = configureStore({
    reducer: {
        products: productSlice.reducer,
        auth: authSlice.reducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;