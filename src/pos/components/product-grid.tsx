import { ProductCard } from "./product-card";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import type { Product } from "@/mocks/types/product";

export const ProductGrid = () => {
  const products : Product[] = useSelector((state: RootState) => state.products.products);
     return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
        {products.map((product) => (
            <ProductCard key={product._id} product={product} />
        ))}
        </div>
  );
}