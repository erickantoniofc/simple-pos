import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import { type Sale, DocumentType, DocumentStatus } from "@/data/types/sale";
import { format } from "date-fns";
import { useState } from "react";
import { Printer, Send } from "lucide-react";
import { printTicketHtml } from "@/helpers/print-ticket-html";

interface SaleSummaryDialogProps {
  open: boolean;
  onClose: () => void;
  sale: Sale | null;
  onResend?: () => void;
  onNewSale?: () => void;
  onGoToSales?: () => void;
  onCancel?: (saleId : string) => void;
  onSendContingency?: () => void;
}

export const SaleSummaryDialog = ({
  open,
  onClose,
  sale,
  onResend,
  onNewSale,
  onGoToSales,
  onCancel,
  onSendContingency,
}: SaleSummaryDialogProps) => {
  const isFactura = sale?.documentType === DocumentType.FE;
  const total = sale?.total ?? 0;
  const subtotal = isFactura ? total : total / 1.13;
  const tax = isFactura ? 0 : subtotal * 0.13;

  const isCancelled = sale?.status === DocumentStatus.CANCELLED;
  const isError = sale?.status === DocumentStatus.SEND_ERROR;
  const isSend = sale?.status === DocumentStatus.SEND;

  const [confirmOpen, setConfirmOpen] = useState(false);

  const onPrint = () => {
      if (sale) {
        printTicketHtml(sale);
      }
  }
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col h-full">
        <DialogHeader>
          <DialogTitle>Resumen de venta</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col flex-1 overflow-hidden space-y-4 h-full">
          {/* Información de cabecera */}
          <div className="text-sm text-muted-foreground shrink-0">
            <p><strong>ID:</strong> {sale?._id}</p>
            <p><strong>Fecha:</strong> {sale?.date ? format(new Date(Number(sale.date)), "dd/MM/yyyy HH:mm") : "-"}</p>
            <p><strong>Cliente:</strong> {sale?.customer?.name || "-"}</p>
            <p><strong>Documento:</strong> {isFactura ? "Factura Electrónica" : "Crédito Fiscal"}</p>
            {isCancelled && (
              <p className="text-red-600 font-semibold">
                DOCUMENTO ANULADO — {sale.cancelledDate ? format(new Date(Number(sale.cancelledDate)), "dd/MM/yyyy HH:mm") : "Fecha desconocida"}
              </p>
            )}
          </div>

          {/* Detalles de productos */}
          <div className="border rounded p-3 flex flex-col flex-1 overflow-hidden space-y-2">
            <ScrollArea className="h-full">
              <div className="space-y-2 pr-2">
                {sale?.saleItems.map((item) => (
                  <div key={item.product._id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3 min-w-0">
                      {item.product.imageUrl ? (
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-muted text-xs flex items-center justify-center font-semibold uppercase flex-shrink-0">
                          {item.product.name.charAt(0)}
                        </div>
                      )}
                      <span className="truncate">{item.quantity} x {item.product.name}</span>
                    </div>
                    <span className="whitespace-nowrap">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Totales */}
            <hr />
            <div className="space-y-1 text-sm px-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {!isFactura && (
                <div className="flex justify-between">
                  <span>Impuestos (13%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Acciones */}
        {!isCancelled && !isError && (
          <div className="flex flex-wrap justify-center gap-2 pt-4 shrink-0">
            {onPrint && <Button variant="secondary" onClick={onPrint} className="cursor-pointer text-foreground"><Printer/></Button>}
            {onResend && <Button variant="secondary" onClick={onResend} className="cursor-pointer text-foreground"><Send/>Reenviar</Button>}
            {onNewSale && <Button onClick={onNewSale} className="cursor-pointer text-foreground">Nueva venta</Button>}
            {onGoToSales && <Button variant="outline" onClick={onGoToSales} className="cursor-pointer">Ir a ventas</Button>}
            {isSend && onCancel && (
              <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="cursor-pointer">Anular</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás seguro que deseas anular esta venta?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción no se puede deshacer. El documento quedará marcado como anulado.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={() => sale?._id && onCancel(sale._id)}>Confirmar</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        )}

        {isError && onSendContingency && (
          <div className="flex justify-center pt-4">
            <Button variant="default" onClick={onSendContingency}>
              Enviar contingencia
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};