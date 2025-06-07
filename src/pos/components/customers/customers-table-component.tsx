import { DataTable } from "@/components/ui/data-table"
import type { Customer } from "@/mocks/types/customer"
import { customerColumns } from "./customers-columns"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useDispatch, useSelector } from "react-redux"
import { setActiveCustomer } from "@/store/pos/customer-slice"
import type { RootState } from "@/store/store"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export const CustomersTableComponent = ({customers} : {customers: Customer[]}) => {
  const [filter, setFilter] = useState(""); 
  const dispatch = useDispatch();
  const selected = useSelector((state: RootState) => state.customers.selectedCustomer);

  useEffect(() => {
    dispatch(setActiveCustomer(undefined));
  }, []);
  
  const handleRowClick = (customer: Customer) => {
    dispatch(setActiveCustomer(customer));
  }

  const handleNewCustomer = () => {
    dispatch(setActiveCustomer(null));
  };
  return (
     <Card className="flex flex-row h-full">
      <CardContent className="flex flex-col flex-1 p-4 space-y-4 h-full w-full">
       <div className="flex items-center justify-between gap-4">
          <Input
            type="text"
            placeholder="Buscar por nombre"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="max-w-sm"
          />
          <div className="ml-auto">
            <Button className="text-foreground" onClick={handleNewCustomer}><Plus /> Nuevo Cliente</Button>
          </div>
        </div>

      <ScrollArea className="flex-1 overflow-y-auto">
        <DataTable 
          columns={customerColumns} 
          data={customers} 
          filter={filter}  
          onRowClick={handleRowClick} 
          rowClassName={(customer) =>
          cn(
            !customer.active && "opacity-50 bg-muted",
            selected?._id === customer._id && "bg-primary/10 border-l-4 border-primary"
          )}
        />
      </ScrollArea>
    </CardContent>
    </Card>
    
  )
}
