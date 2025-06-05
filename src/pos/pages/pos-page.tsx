import { useDispatch, useSelector } from "react-redux";
import { CartCard } from "../components/cart-card";
import { ProductContainer } from "../components/product-container";
import type { RootState } from "@/store/store";
import { useEffect } from "react";
import { setActiveSale } from "@/store/pos/sale-slice";



export const PosPage = () => {
  const dispatch = useDispatch();
  const activeSale = useSelector((state: RootState) => state.sales.activeSale);
  
  useEffect(() => {
    if(!activeSale) {
      dispatch(setActiveSale());
    }
  
  }, [activeSale, dispatch])
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 px-4 pb-5 box-border">
      <div className="md:col-span-3 sm:col-span-1 md:h-[calc(100vh-3rem)]">
        <ProductContainer />
      </div>
      <div className="md:col-span-2 md:h-[calc(100vh-3rem)]">
        
        <CartCard sale={activeSale} />

        
      </div>
      
      
    </div>
  );
}                                                                  