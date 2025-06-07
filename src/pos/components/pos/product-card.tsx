import { useDispatch } from "react-redux";
import { addItemToActiveSale } from "@/store/pos/sale-slice";

import type { Product } from "../../../data/types/product"

import {Card, CardContent} from "@/components"

export const ProductCard = ({product} : {product: Product}) => {
    
    const dispatch = useDispatch();

    const onProductClick = () => {
        dispatch(addItemToActiveSale({
            product,
            quantity: 1,
            price: product.price,
            discount: 0,
            subtotal: product.price,
            total: product.price,
        }));
    }
    
    return(
        <Card onClick={onProductClick} className="w-full shadow-sm hover:scale-[1.01] transition-shadow active:scale-[0.98] cursor-pointer">
            <CardContent className="flex flex-col items-center text-center">
                <img src={product.imageUrl} alt={product.name} className="w-24 h-24 object-cover rounded-md mb-4"/>
                <h3 title={product.name} className="font-semibold max-w-full truncate whitespace-nowrap overflow-hidden">{product.name}</h3>
                <p className="text-primary text-base font-bold mt-2">${product.price.toFixed(2)}</p>
            </CardContent> 
        </Card>
    )
}