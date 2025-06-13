import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { authService } from '@/services/auth.service'
import type { AuthState, UserProfile } from '@/data/types/user'
import type { User as SupabaseUser } from '@supabase/supabase-js'

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    profile: null,
    loading: false,
    error: null
}

// Async thunks
export const signInUser = createAsyncThunk(
    'auth/signIn',
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const { user } = await authService.signIn(email, password)
            if (!user) throw new Error('No user returned from sign in')

            // Try to get user profile, but don't fail if it doesn't exist
            let profile: UserProfile | null = null
            try {
                profile = await authService.getUserProfile(user.id)
            } catch (error) {
                console.warn('Could not fetch user profile during sign in:', error)
                // Continue with null profile - don't block login
            }

            return { user, profile }
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'An unknown error occurred'
            return rejectWithValue(message)
        }
    }
)

export const signOutUser = createAsyncThunk(
    'auth/signOut',
    async (_, { rejectWithValue }) => {
        try {
            await authService.signOut()
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'An unknown error occurred'
            return rejectWithValue(message)
        }
    }
)

export const loadUserSession = createAsyncThunk(
    'auth/loadSession',
    async (_, { rejectWithValue }) => {
        try {
            const session = await authService.getCurrentSession()
            if (!session?.user) return null

            // Try to get user profile, but don't fail if it doesn't exist
            let profile: UserProfile | null = null
            try {
                profile = await authService.getUserProfile(session.user.id)
            } catch (error) {
                console.warn('Could not fetch user profile during session load:', error)
                // Continue with null profile
            }

            return { user: session.user, profile }
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'An unknown error occurred'
            return rejectWithValue(message)
        }
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        },
        setSession: (state, action: PayloadAction<{ user: SupabaseUser; profile: UserProfile | null }>) => {
            console.log('🔥 setSession reducer called with:', {
                userId: action.payload.user.id,
                email: action.payload.user.email,
                hasProfile: !!action.payload.profile
            })

            state.user = action.payload.user
            state.profile = action.payload.profile
            state.isAuthenticated = true
            state.loading = false
            state.error = null

            console.log('🎯 Auth state updated:', {
                isAuthenticated: state.isAuthenticated,
                userId: state.user?.id,
                profileRole: state.profile?.role
            })
        },
        clearSession: (state) => {
            state.isAuthenticated = false
            state.user = null
            state.profile = null
            state.loading = false
            state.error = null
        }
    },
    extraReducers: (builder) => {
        // Sign In
        builder
            .addCase(signInUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(signInUser.fulfilled, (state, action) => {
                state.loading = false
                state.isAuthenticated = true
                state.user = action.payload.user
                state.profile = action.payload.profile
                state.error = null
            })
            .addCase(signInUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })

        // Sign Out
        builder
            .addCase(signOutUser.pending, (state) => {
                state.loading = true
            })
            .addCase(signOutUser.fulfilled, (state) => {
                state.loading = false
                state.isAuthenticated = false
                state.user = null
                state.profile = null
                state.error = null
            })
            .addCase(signOutUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })

        // Load Session
        builder
            .addCase(loadUserSession.pending, (state) => {
                state.loading = true
            })
            .addCase(loadUserSession.fulfilled, (state, action) => {
                state.loading = false
                if (action.payload) {
                    state.isAuthenticated = true
                    state.user = action.payload.user
                    state.profile = action.payload.profile
                }
            })
            .addCase(loadUserSession.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    }
})

export const { clearError, setSession, clearSession } = authSlice.actions
export default authSlice.reducer
