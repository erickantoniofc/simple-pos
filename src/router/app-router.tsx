import { Routes, Route, Navigate } from "react-router-dom";
import { PosRoutes } from "@/pos/routes/pos-router";
import { AuthRoutes } from "@/auth/routes/auth-router";


export const AppRouter = () => {
  
    // Example: status should be dynamic, here it's hardcoded for demonstration
    const status = "unauthenticated" as "authenticated" | "unauthenticated";

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
