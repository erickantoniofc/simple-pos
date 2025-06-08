import { useSelector } from "react-redux";

import type { RootState } from "@/store/store";
import type { Product } from "@/data/types/product"

import { ProductsTableComponent } from "../components/products/products-table-component"
import { ProductDialog } from "../components/products/product-dialog";

export const ProductsPage = () => {

  const products: Product[] = useSelector((state: RootState) => state.products.products);

  return (
    <div className="grid grid-cols-1 gap-4 px-4 pb-5 box-border">
      <div className="col-span-1 md:h-[calc(100vh-3rem)]">
        <ProductsTableComponent products={products} />
        <ProductDialog />
      </div>
    </div>
  )
}
