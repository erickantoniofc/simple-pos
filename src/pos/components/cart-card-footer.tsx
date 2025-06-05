import { Button } from "@/components/ui/button"
import { DocumentType } from "@/mocks/types/sale";
import { Plus, Save, Send } from "lucide-react"

export const CartCardFooter = (
  {
    documentType, 
    subtotal, 
    tax, 
    total
  } : {
    documentType: number; // DocumentType.FE or DocumentType.CCF
    subtotal: number,
    tax: number,
    total: number,
  }) => {
  return (
    <div className="space-y-1 text-sm text-right mt-auto">
          <div className="flex justify-between ">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className={`flex justify-between ${(documentType === DocumentType.CCF) ? "" : "hidden"}`}>
            <span>Impuestos (13%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-primary text-base">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="grid grid-cols-5 gap-2 w-full">
            <Button className="col-span-1 h-10 text-accent-foreground cursor-pointer">
              <Save className="h-4 w-4"/>
            </Button>
            <Button className="col-span-1 h-10 text-accent-foreground cursor-pointer">
              <Plus className="h-4 w-4"/>
            </Button>
            <Button className="col-span-3 h-10 text-accent-foreground cursor-pointer">
              <Send className="h-4 w-4"/>
              <p>Enviar DTE</p>
            </Button>
          </div>
        </div>
  )
}
