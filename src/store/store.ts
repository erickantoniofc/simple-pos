import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./pos/product-slice";
import { authSlice } from "./auth/auth-slice";
import { customerSlice } from "./pos/customer-slice";
import { categorySlice } from "./pos/category-slice";
import { saleSlice } from "./pos/sale-slice";
import { branchSlice } from "./pos/branch-slice";
import { companySlice } from "./company-slice";
import { useDispatch } from "react-redux";

export const store = configureStore({
    reducer: {
        customers: customerSlice.reducer,
        products: productSlice.reducer,
        categories: categorySlice.reducer,
        sales: saleSlice.reducer,
        auth: authSlice.reducer,
        branches: branchSlice.reducer,
        company: companySlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
