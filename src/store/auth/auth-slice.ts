import { createSlice, type PayloadAction } from '@reduxjs/toolkit';


interface ProductsState {
    isAuthenticated: boolean
}

const initialState: ProductsState = {
    isAuthenticated: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state) => {
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.isAuthenticated = false;
        }
    }
});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;