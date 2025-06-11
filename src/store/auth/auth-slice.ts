import { user } from '@/data/mocks/users';
import type { User } from '@/data/types/user';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';


interface AuthState {
    isAuthenticated: boolean,
    activeUser: User | null 
}

const initialState: AuthState = {
    isAuthenticated: false,
    activeUser: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state) => {
            state.isAuthenticated = true;
            state.activeUser = user;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.activeUser = null;
        }
    }
});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;