import { useSaleActions } from "@/hooks/use-sale-actions";
import { 
  Button, 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle  } from "@/components/";
import { Save, Send, Plus } from "lucide-react";
import { DocumentStatus, type Sale } from "@/data/types/sale";
import { PaymentMethodComponent } from "./payment-method-component";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { SaleSummaryDialog } from "../sales/sale-summary-dialog";

export const ActionButtonsComponent = ({ status }: { status: number }) => {
  const {
    handleSave,
    handleSend,
    handleNewSale,
    showDiscardDialog,
    setShowDiscardDialog,
    confirmDiscard,
  } = useSaleActions();

  const [sentSale, setSentSale] = useState<Sale | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const navigate = useNavigate();

  const handleSendClick = async () => {
    const result = await handleSend(); 
    if (result) {
      setSentSale(result);
      setShowSummary(true);
    }
  };


  return (
    <>
      {status === DocumentStatus.INIT && (
        <div className="grid grid-cols-12 gap-2 w-full items-end">
          <div className="col-span-4">
            <PaymentMethodComponent />
          </div>

          <Button onClick={handleSave} className="col-span-2 h-10 text-accent-foreground cursor-pointer">
            <Save className="h-4 w-4 mr-1" />
          </Button>

          <Button onClick={handleSendClick} className="col-span-6 h-10 text-accent-foreground cursor-pointer">
            <Send className="h-4 w-4 mr-1" />
            Enviar DTE
          </Button>
        </div>
      )}

      {status === DocumentStatus.SAVE && (
        <div className="grid grid-cols-12 gap-2 w-full items-end">
          <div className="col-span-4">
            <PaymentMethodComponent />
          </div>

          <Button onClick={handleSave} className="col-span-2 h-10 text-accent-foreground cursor-pointer">
            <Save className="h-4 w-4 mr-1" />
          </Button>

          <Button onClick={handleSendClick} className="col-span-4 h-10 text-accent-foreground cursor-pointer">
            <Send className="h-4 w-4 mr-1" />
            Enviar DTE
          </Button>

          <Button onClick={handleNewSale} className="col-span-2 h-10 text-accent-foreground cursor-pointer">
            <Plus className="h-4 w-4 mr-1" />
          </Button>

          <AlertDialog open={showDiscardDialog} onOpenChange={setShowDiscardDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Descartar venta sin guardar</AlertDialogTitle>
                <AlertDialogDescription>
                  Hay cambios sin guardar. ¿Deseas descartarlos y comenzar una nueva venta?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={confirmDiscard}>Sí, descartar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}

      {/* SaleSummaryDialog solo se renderiza una vez */}
      {showSummary && sentSale && (
        <SaleSummaryDialog
          open={showSummary}
          onClose={() => setShowSummary(false)}
          sale={sentSale}
          onNewSale={() => {
            setShowSummary(false);
            handleNewSale();
          }}
          onGoToSales={() => {
            setShowSummary(false);
            navigate("/facturas");
          }}
          onResend={() => {
            console.log("reenviando");
          }}
        />
      )}
    </>
  );
};