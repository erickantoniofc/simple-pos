import { ProductCard } from "./product-card";
import type { Product } from "../../mocks/types/product";

export const ProductGrid = ({products} : {products: Product[]}) => {
     return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
        {products.map((product) => (
            <ProductCard key={product.id} product={product} />
        ))}
        </div>
  );
}