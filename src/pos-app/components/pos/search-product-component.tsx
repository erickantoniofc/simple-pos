import { useDispatch } from "react-redux";

import { 
    Input,
    Button
} from "@/components/";
import { Plus } from "lucide-react";
import { setActiveProduct } from "@/store/pos/product-slice";



export const SearchProductComponent = (
    { searchText, setSearchText, } 
    : 
    { searchText: string; setSearchText: (text: string) => void;}
    ) => {
    const dispatch = useDispatch();
    
    
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
                onClick={() => dispatch(setActiveProduct(null)) }
                >
                <Plus/> Agregar producto
            </Button>
        </div>
        
    </div>
  )
}
