import { useDispatch, useSelector } from "react-redux";

import { 
    Input,
    Button
} from "@/components/";
import { Plus } from "lucide-react";
import { setActiveProduct } from "@/store/pos/product-slice";
import type { RootState } from "@/store/store";



export const SearchProductComponent = (
    { searchText, setSearchText, } 
    : 
    { searchText: string; setSearchText: (text: string) => void;}
    ) => {
    const dispatch = useDispatch();
    
     const canCrudProducts = useSelector(
        (state: RootState) => state.auth.profile?.permissions?.canCrudProducts
      );
    
  return (
    <div className="space-y-4">
        <div className="flex gap-2 w-full">
            <Input 
                placeholder="Busca un producto o escanea el codigo de barras.."
                className="flex-1 h-12"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <Button 
                className="whitespace-nowrap h-12 text-white cursor-pointer"
                disabled={!canCrudProducts}
                onClick={() => dispatch(setActiveProduct(null)) }
                >
                <Plus/> Agregar producto
            </Button>
        </div>
        
    </div>
  )
}
