import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { cn } from "@/lib/utils"
import { setActiveProduct } from "@/store/pos/product-slice"

import type { Product } from "@/data/types/product"
import { productColumns } from "@/pos-app/components/products/product-columns"

import { 
  DataTable,
  Card, 
  CardContent, 
  Input,
  ScrollArea,
  Button,
} from "@/components"
import { Plus } from "lucide-react"
import { useProductActions } from "@/hooks/use-product-actions"

export const ProductsTableComponent = ({products} : {products: Product[]}) => {

  const {
    filter,
    setFilter,
    handleNewProduct,
    handleRowClick,
    selected
  } = useProductActions();

  return (
     <Card className="flex flex-row h-full">
      <CardContent className="flex flex-col flex-1 p-4 space-y-4 h-full w-full">
       <div className="flex items-center justify-between gap-4">
          <Input
            type="text"
            placeholder="Buscar por nombre de producto"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="max-w-sm"
          />
          <div className="ml-auto">

            <Button className="text-foreground cursor-pointer" onClick={handleNewProduct}><Plus /> Nuevo producto</Button>
          </div>
        </div>

      <ScrollArea className="flex-1 overflow-y-auto">
        <DataTable 
          columns={productColumns} 
          data={products} 
          filter={filter}  
          onRowClick={handleRowClick} 
          rowClassName={(product) =>
          cn(
            !product.active && "opacity-50 bg-muted",
            selected?.id === product.id && "bg-primary/10 border-l-4 border-primary"
          )}
        />
      </ScrollArea>
    </CardContent>
    </Card>
    
  )
}
