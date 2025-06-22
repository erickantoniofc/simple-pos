import { useSelector } from "react-redux";
import { type RootState } from "@/store/store";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Button,
  ScrollArea
} from "@/components";
import { Loader2, Save } from "lucide-react";
import { CustomerForm } from "@/pos-app/components/customers/customer-form";
import { useCustomerForm } from "@/hooks/use-customer-form";

export const CustomerDialog = () => {
  const selected = useSelector((state: RootState) => state.customers.selectedCustomer);
  const {open, handleToggleActive, handleClose, loading, toggleLoading} = useCustomerForm();



  return (
    <Dialog open={open} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-3xl w-full h-[90vh] p-0 flex flex-col">
        <div className="flex flex-col h-full w-full">

          {/* Header */}
          <div className="px-6 pt-6 pb-2 border-b">
            <DialogHeader>
              <DialogTitle>{selected ? "Editar Cliente" : "Nuevo Cliente"}</DialogTitle>
              <DialogDescription>
                Llena la información para registrar o actualizar el cliente.
              </DialogDescription>
            </DialogHeader>
          </div>

          {/* Scrollable content */}
          
            <ScrollArea className="flex-1 overflow-auto px-6 py-4 w-full">
                <CustomerForm />
            </ScrollArea>


          {/* Footer */}
          <div className="border-t px-6 py-4 flex justify-center gap-2">
            <Button disabled={loading || toggleLoading} form="customer-form" type="submit" className="text-foreground cursor-pointer">
               {loading 
               ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> 
               : <span><Save className="h-4 w-4 mr-2" /> Guardar</span>}
            </Button>
            {selected && (
              <Button
                disabled={loading || toggleLoading}
                className="cursor-pointer"
                type="button"
                variant={selected.active ? "destructive" : "secondary"}
                onClick={handleToggleActive}
              >
                { toggleLoading
                 ? <Loader2 className="animate-spin h-4 w-4 mr-2" />
                 : (selected.active ? "Deshabilitar" : "Habilitar")
                }
              </Button>
            )}
            <Button variant="outline" type="button" onClick={handleClose} className="cursor-pointer">
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};