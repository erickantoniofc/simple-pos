import { mockCartItems } from "@/mocks/cartitems";
import { CartCard } from "../components/cart-card";
import { ProductContainer } from "../components/product-container";



export const PosPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 pb-5 box-border">
      <div className="md:col-span-2 sm:col-span-1 md:h-[calc(100vh-3rem)]">
        <ProductContainer />
      </div>
      <div className="md:col-span-1 md:h-[calc(100vh-3rem)] grid grid-rows-5">
        <div className="row-span-4">
        <CartCard items={mockCartItems} />

        </div>
        
        <div className="row-span-1">

        </div>
        
      </div>
      
      
    </div>
  );
}                                                                  