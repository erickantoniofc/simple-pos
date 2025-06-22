import { useSelector } from "react-redux";

import type { RootState } from "@/store/store";


import { ProductsTableComponent } from "../components/products/products-table-component"
import { ProductDialog } from "../components/products/product-dialog";
import { Loader2 } from "lucide-react";

export const ProductsPage = () => {


 const canCrudProducts = useSelector(
    (state: RootState) => state.auth.profile?.permissions?.canCrudProducts
  );
  const { products, listLoading, error } = useSelector((state: RootState) => state.products);

  if (!canCrudProducts) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        <p className="text-lg font-semibold">No tienes permisos para acceder a esta sección.</p>
        <p className="text-sm mt-2">Por favor contacta a un administrador si crees que esto es un error.</p>
      </div>
    );
  }

  if (listLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-muted-foreground">
        <Loader2 className="animate-spin w-6 h-6 mb-2" />
        <p className="text-sm">Cargando productos...</p>
      </div>
    );
  }  


  return (
    <div className="grid grid-cols-1 gap-4 px-4 pb-5 box-border">
      <div className="col-span-1 md:h-[calc(100vh-3rem)]">
        <ProductsTableComponent products={products} />
        <ProductDialog />
      </div>
    </div>
  )
}
