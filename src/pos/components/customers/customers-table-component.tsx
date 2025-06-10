import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { cn } from "@/lib/utils"
import { setActiveCustomer } from "@/store/pos/customer-slice"

import type { Customer } from "@/data/types/customer"

import { 
  DataTable,
  Card, 
  CardContent, 
  Input,
  ScrollArea,
  Button,
} from "@/components"
import { customerColumns } from "@/pos/components/customers/customers-columns"
import { Plus } from "lucide-react"
import { useCustomerActions } from "@/hooks/use-customer-actions"

export const CustomersTableComponent = ({customers} : {customers: Customer[]}) => {

  const {
    filter,
    setFilter,
    handleNewCustomer,
    handleRowClick,
    selected
  } = useCustomerActions();

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
            <Button className="text-foreground cursor-pointer" onClick={handleNewCustomer}><Plus /> Nuevo Cliente</Button>
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
