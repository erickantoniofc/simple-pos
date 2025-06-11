import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { 
  DataTable,
  Card, 
  CardContent, 
  Input,
  ScrollArea,
  Button,
} from "@/components"
import { Plus } from "lucide-react"
import { salesColumns } from "./sales-columns"
import { SaleSummaryDialog } from "./sale-summary-dialog"
import { useSaleActions } from "@/hooks/use-sale-actions"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"

export const SalesTableComponent = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const {activePos} = useSelector((state: RootState) => state.branches);
  const {
    handleNewSaleFromSalesTable, 
    setShowSaleSummary, 
    showSaleSummary,
    handleRowClick,
    onCancelSaleAction,
    sale: selected,
    sales,
    handleCloseSaleSummary
  } = useSaleActions();

  const salesToShow = sales.filter((s) => s.posId === activePos.id );

  return (
     <>
     <Card className="flex flex-row h-full">
      <CardContent className="flex flex-col flex-1 p-4 space-y-4 h-full w-full">
       <div className="flex items-center justify-between gap-4">
          <Input
            type="text"
            placeholder="Buscar una venta..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="max-w-sm"
          />
          <div className="ml-auto">

            <Button 
            className="text-foreground cursor-pointer" 
            onClick={handleNewSaleFromSalesTable}>
              <Plus /> Nueva venta
            </Button>
          </div>
        </div>

      <ScrollArea className="flex-1 overflow-y-auto">
        <DataTable 
          columns={salesColumns} 
          data={salesToShow} 
          filter={filter}  
          onRowClick={handleRowClick} 
        />
      </ScrollArea>
    </CardContent>
    </Card>

    <SaleSummaryDialog
      open={showSaleSummary}
      onClose={handleCloseSaleSummary}
      sale={selected}
      onNewSale={() => {
        handleNewSaleFromSalesTable();
      }}
      onGoToSales={() => {
        setShowSaleSummary(false);
        navigate("/facturas");
      }}
      onResend={() => {
        console.log("reenviando");
      }}

      onCancel={onCancelSaleAction}
    />
  </>
    
  )
}
