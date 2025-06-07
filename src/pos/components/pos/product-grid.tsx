import { useSelector } from "react-redux";

import type { RootState } from "@/store/store";
import type { Product } from "@/data/types/product";
import type { Category } from "@/data/types/category";

import { ProductCard } from "@/pos/components/pos";
import { ScrollArea } from "@/components";

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
      <ScrollArea className="sm:h-screen md:h-full pr-2">

        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 w-full justify-items-center">
        {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
        ))}
        </div>
      </ScrollArea>
  );
}