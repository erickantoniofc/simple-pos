import {Card, CardContent} from "@/components/ui/card"
import type { Product } from "../../mocks/types/product"


export const ProductCard = ({product} : {product: Product}) => {
    return(
        <Card className="w-full max-w-xs shadow-sm hover:scale-[1.01] transition-shadow active:scale-[0.98] cursor-pointer">
            <CardContent className="p-4 flex flex-col items-center text-center">
                <img src={product.imageUrl} alt={product.name} className="w-24 h-24 object-cover rounded-md mb-4"/>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-sm text-muted-foreground">Stock: {product.stock}</p>
                <p className="text-primary text-base font-bold mt-2">${product.price.toFixed(2)}</p>
            </CardContent> 
        </Card>
    )
}