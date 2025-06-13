import { Routes, Route, Navigate } from "react-router-dom";
import { PosRoutes } from "@/pos-app/routes/pos-router";
import { AuthRoutes } from "@/auth/routes/auth-router";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { useEffect } from "react";


export const AppRouter = () => {

    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const user = useSelector((state: RootState) => state.auth.user);
    const profile = useSelector((state: RootState) => state.auth.profile);
    const loading = useSelector((state: RootState) => state.auth.loading);

    useEffect(() => {
        console.log('🧭 Router state change:', {
            isAuthenticated,
            userId: user?.id,
            userEmail: user?.email,
            profileRole: profile?.role,
            loading
        });
    }, [isAuthenticated, user, profile, loading]);

    return (

        <Routes>
            {
                isAuthenticated
                    ? <>
                        <Route path="/*" element={<PosRoutes />} />
                        <Route path="/auth/*" element={<Navigate to="/" />} />
                    </>
                    : <>
                        <Route path="/auth/*" element={<AuthRoutes />} />
                        <Route path="/*" element={<Navigate to="/auth/login" />} />
                    </>
            }

        </Routes>

    )
}
