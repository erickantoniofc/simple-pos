import { useSelector } from "react-redux";

import type { RootState } from "@/store/store";

import { ProductForm } from "@/pos-app/components/products/product-form";
import { Button, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, ScrollArea } from "@/components";
import { Save } from "lucide-react";
import { useProductForm } from "@/hooks/use-product-form";

export const ProductDialog = () => {
    const selected = useSelector((state: RootState) => state.products.selectedProduct);
    const {handleClose, handleToggleActive, open} = useProductForm();

    return (
    <Dialog open={open} onOpenChange={(open)=> !open && handleClose()}>
        <DialogContent className="max-w-3xl w-full max-h-[90vh] p-0 flex flex-col">

          <div className="flex flex-col h-full w-full">

          {/* Header */}
          <div className="px-6 pt-6 pb-2 border-b">
            <DialogHeader>
              <DialogTitle>{selected ? "Editar Producto" : "Nuevo Producto"}</DialogTitle>
              <DialogDescription>
                Llena la información para registrar o actualizar un producto.
              </DialogDescription>
            </DialogHeader>
          </div>

          {/* Scrollable content */}
          
            <ScrollArea className="flex-1 overflow-auto px-6 py-4 w-full">
                <ProductForm />
            </ScrollArea>


          {/* Footer */}
          <div className="border-t px-6 py-4 flex justify-center gap-2">
            <Button form="product-form" type="submit" className="text-foreground cursor-pointer">
              <Save />
              Guardar
            </Button>
            {selected && (
              <Button
                type="button"
                variant={selected.active ? "destructive" : "secondary"}
                onClick={handleToggleActive}
                className="cursor-pointer"
              >
                {selected.active ? "Deshabilitar" : "Habilitar"}
              </Button>
            )}
            <Button variant="outline" type="button" onClick={handleClose} className="cursor-pointer">
              Cancelar
            </Button>
          </div>
        </div>  

        </DialogContent>
    </Dialog>
  )
}
