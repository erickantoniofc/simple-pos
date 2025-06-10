import { Route, Routes } from "react-router-dom"
import { PosPage } from "../pages/pos-page"
import { SalesPage } from "../pages/sales-page"
import { ProductsPage } from "../pages/products-page"
import { CustomersPage } from "../pages/customers-page"
import { PosLayout } from "../layout/pos-layout"
import { CategoriesPage } from "../pages/categories-page"

export const PosRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PosLayout />} >
        <Route index element={<PosPage />} />       
        <Route path="pos" element={<PosPage />} />
        <Route path="productos" element={<ProductsPage />} />
        <Route path="clientes" element={<CustomersPage />} />
        <Route path="facturas" element={<SalesPage />} />
        <Route path="categorias" element={<CategoriesPage />} />
        <Route path="/*" element={<PosPage />}/>
        
      </Route>
      
    </Routes>
  )
}
