import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { supabase } from '@/lib/supabase'
import { setSession, clearSession, loadUserSession } from '@/store/auth/auth-slice'
import type { AppDispatch } from '@/store/store'
import type { UserProfile } from '@/data/types/user'
import { authService } from '@/services/auth.service'

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const initialized = useRef(false)

  useEffect(() => {
    // Prevent duplicate initialization in StrictMode
    if (initialized.current) {
      console.log('⚠️ AuthProvider already initialized, skipping...')
      return
    }
    initialized.current = true

    let subscription: { unsubscribe: () => void } | null = null

    const initializeAuth = async () => {
      try {
        // First, load the initial session and wait for it to complete
        console.log('🔄 Loading initial session...')
        await dispatch(loadUserSession()).unwrap()
        console.log('✅ Initial session loaded successfully')
      } catch {
        // If initial session load fails, that's okay - user might not be logged in
        console.log('ℹ️ No initial session found')
      }

      // Only after initial session check is done, set up the auth state listener
      console.log('🎧 Setting up auth state listener...')
      const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          console.log('🔔 Auth state change:', event, session?.user?.id)

          if (event === 'SIGNED_IN' && session) {
            console.log('👤 User signed in, fetching profile...')
            // User signed in - get their profile
            let profile: UserProfile | null = null
            try {
              profile = await authService.getUserProfile(session.user.id)
              console.log('📄 Profile fetched:', profile)
            } catch (error) {
              console.error('❌ Error loading user profile:', error)
              // Continue with null profile - don't block login
            }

            console.log('🔄 Dispatching setSession with:', {
              userId: session.user.id,
              email: session.user.email,
              hasProfile: !!profile
            })

            try {
              dispatch(setSession({ user: session.user, profile }))
              console.log('✅ setSession dispatched successfully')
            } catch (error) {
              console.error('💥 Error dispatching setSession:', error)
            }
          } else if (event === 'SIGNED_OUT') {
            console.log('🚪 User signed out')
            // User signed out
            dispatch(clearSession())
          } else if (event === 'TOKEN_REFRESHED' && session) {
            console.log('🔄 Token refreshed')
            // Token refreshed, update session
            let profile: UserProfile | null = null
            try {
              profile = await authService.getUserProfile(session.user.id)
            } catch (error) {
              console.error('Error loading user profile:', error)
            }

            dispatch(setSession({ user: session.user, profile }))
          }
        }
      )

      subscription = authSubscription
      console.log('✅ Auth state listener set up successfully')
    }

    initializeAuth()

    return () => {
      console.log('🧹 Cleaning up auth listener...')
      subscription?.unsubscribe()
      initialized.current = false
    }
  }, [dispatch])

  return <>{children}</>
} 
