import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveSale } from "@/store/pos/sale-slice";

import type { RootState } from "@/store/store";

import { CartCard, PosContainer } from "@/pos-app/components/pos";
import { DocumentStatus } from "@/data/types/sale";
import { Loader2 } from "lucide-react";



export const PosPage = () => {
  const dispatch = useDispatch();
  const activeSale = useSelector((state: RootState) => state.sales.activeSale);
  
  useEffect(() => {
    if(!activeSale) {
      dispatch(setActiveSale());
    }
    if(
      activeSale?.status === DocumentStatus.SEND || 
      activeSale?.status === DocumentStatus.CANCELLED || 
      activeSale?.status === DocumentStatus.SEND_ERROR) {
        dispatch(setActiveSale());
    }
  
  }, [activeSale, dispatch])

  const { branches, loading } = useSelector((state: RootState) => state.branches);
  const {listLoading: productsLoading} = useSelector((state: RootState) => state.products);

  if (loading || productsLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader2 className="animate-spin size-6 text-muted-foreground" />
      </div>
    );
  }

  if (branches.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-center px-4">
        <div className="text-sm text-muted-foreground">
          No tienes acceso a ningún punto de venta habilitado. <br />
          Contacta con un administrador para solicitar permisos.
        </div>
      </div>
    );
  }
    

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 px-4 pb-5 box-border">
      <div className="md:col-span-5 sm:col-span-1 md:h-[calc(100vh-3rem)] lg:col-span-3">
        <PosContainer />
      </div>
      <div className="md:col-span-5 lg:h-[calc(100vh-3rem)] lg:col-span-2">
        
        <CartCard sale={activeSale} />

        
      </div>
      
      
    </div>
  );
}                                                                  