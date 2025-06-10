import { DocumentStatus, DocumentType } from "@/data/types/sale";
import { ActionButtonsComponent } from "./action-buttons-component";

export const CartCardFooter = (
  {
    documentType, 
    subtotal, 
    tax, 
    total,
    status
  } : {
    documentType: number; // DocumentType.FE or DocumentType.CCF
    subtotal: number,
    tax: number,
    total: number,
    status: number | undefined,
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
          <ActionButtonsComponent status={status ?? DocumentStatus.INIT} />
        </div>
  )
}
