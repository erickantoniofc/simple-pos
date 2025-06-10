
import { ProductForm } from "@/pos/components/products/product-form";
import { Button, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, ScrollArea } from "@/components";
import { Save } from "lucide-react";
import type { Category } from "@/data/types/category";
import { useCategoryForm } from "@/hooks/use-category-form";
import { CategoryForm } from "./category-form";

export const CategoryDialog = ({activeCategory} : {activeCategory: Category | null | undefined}) => {
    const selected = activeCategory;
    const {handleClose, handleToggleActive, open, form, onSubmit} = useCategoryForm(activeCategory);

    return (
    <Dialog open={open} onOpenChange={(open)=> !open && handleClose()}>
        <DialogContent className="max-w-3xl w-full max-h-[90vh] p-0 flex flex-col">

          <div className="flex flex-col h-full w-full">

          {/* Header */}
          <div className="px-6 pt-6 pb-2 border-b">
            <DialogHeader>
              <DialogTitle>{selected ? "Editar Categoria" : "Nueva Categoria"}</DialogTitle>
              <DialogDescription>
                Llena la información para registrar o actualizar una categoria.
              </DialogDescription>
            </DialogHeader>
          </div>

          {/* Scrollable content */}
          
            <ScrollArea className="flex-1 overflow-auto px-6 py-4 w-full h-full">
                <CategoryForm form={form} onSubmit={onSubmit}/>
            </ScrollArea>


          {/* Footer */}
          <div className="border-t px-6 py-4 flex justify-center gap-2">
            <Button form="category-form" type="submit" className="text-foreground cursor-pointer">
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
