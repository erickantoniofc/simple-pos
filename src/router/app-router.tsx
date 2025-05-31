import { Routes, Route, Navigate } from "react-router-dom";
import { PosRoutes } from "@/pos/routes/pos-router";
import { AuthRoutes } from "@/auth/routes/auth-router";
import { PosLayout } from "@/pos/layout/pos-layout";


export const AppRouter = () => {
  
    const status = "authenticated";

    return (

        <Routes>
            {
                (status === 'authenticated')
                ? <Route path="/*" element={<PosRoutes />}/>
                : <Route path="/auth/*" element={<AuthRoutes />} />
            }
            <Route path='/*' element={<Navigate to='/auth/login' />} />

        </Routes>

    )
}
