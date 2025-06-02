import { ProductCard } from "./product-card";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import type { Product } from "@/mocks/types/product";
import type { Category } from "@/mocks/types/category";

export const ProductGrid = (
  {selectedCategories, searchText,} : {selectedCategories: Category[]; searchText: string;}
  ) => {
  const products : Product[] = useSelector((state: RootState) => state.products.products);
  
  const selectedIds = selectedCategories.map((c) => c._id);
  const text = searchText.trim().toLowerCase();
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedIds.length === 0 || selectedIds.includes(p.category);
    const matchesSearch = text === "" || p.name.toLowerCase().includes(text);

    return matchesCategory && matchesSearch;
  });

    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
        {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
        ))}
        </div>
  );
}