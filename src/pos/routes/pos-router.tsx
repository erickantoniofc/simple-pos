import { Route, Routes } from "react-router-dom"
import { PosPage } from "../pages/pos-page"
import { InvoicesPage } from "../pages/invoices-page"
import { ProductsPage } from "../pages/products-page"
import { CustomersPage } from "../pages/customers-page"
import { PosLayout } from "../layout/pos-layout"

export const PosRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PosLayout />} >
        <Route index element={<PosPage />} />       
        <Route path="pos" element={<PosPage />} />
        <Route path="facturas" element={<InvoicesPage />} />
        <Route path="productos" element={<ProductsPage />} />
        <Route path="clientes" element={<CustomersPage />} />
      </Route>
      
    </Routes>
  )
}
