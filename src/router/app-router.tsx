import { Routes, Route, Navigate } from "react-router-dom";
import { PosRoutes } from "@/pos-app/routes/pos-router";
import { AuthRoutes } from "@/auth/routes/auth-router";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";


export const AppRouter = () => {
  
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
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
