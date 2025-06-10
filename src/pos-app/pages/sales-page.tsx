

import { ProductDialog } from "../components/products/product-dialog";

import { SalesTableComponent } from "../components/sales/sales-table-component";

export const SalesPage = () => {

  return (
    <div className="grid grid-cols-1 gap-4 px-4 pb-5 box-border">
      <div className="col-span-1 md:h-[calc(100vh-3rem)]">
        <SalesTableComponent />
        <ProductDialog />
      </div>
    </div>
  )
}
