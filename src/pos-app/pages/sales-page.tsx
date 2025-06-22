

import { useSelector } from "react-redux";
import { ProductDialog } from "../components/products/product-dialog";

import { SalesTableComponent } from "../components/sales/sales-table-component";
import type { RootState } from "@/store/store";
import { Loader2 } from "lucide-react";

export const SalesPage = () => {

  const { listLoading, error } = useSelector((state: RootState) => state.sales);

    if (error) {
      return (
        <div className="p-6 text-center text-red-500">
          <p className="text-lg font-semibold">Error al cargar las ventas.</p>
          <p className="text-sm mt-2">{error}</p>
        </div>
      );
    }

  if (listLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-[80vh] text-muted-foreground">
          <Loader2 className="animate-spin w-6 h-6 mb-2" />
          <p className="text-sm">Cargando ventas...</p>
        </div>
      );
    }  
  

  return (
    <div className="grid grid-cols-1 gap-4 px-4 pb-5 box-border">
      <div className="col-span-1 md:h-[calc(100vh-3rem)]">
        <SalesTableComponent />
        <ProductDialog />
      </div>
    </div>
  )
}
