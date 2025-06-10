import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveSale } from "@/store/pos/sale-slice";

import type { RootState } from "@/store/store";

import { CartCard, PosContainer } from "@/pos/components/pos";
import { DocumentStatus } from "@/data/types/sale";



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