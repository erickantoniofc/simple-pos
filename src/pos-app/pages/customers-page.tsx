import { useSelector } from "react-redux"

import type { RootState } from "@/store/store"
import type { Customer } from "@/data/types/customer";

import { CustomersTableComponent, CustomerDialog } from "@/pos-app/components/customers"
import { Loader2 } from "lucide-react";


export const CustomersPage = () => {
  const customers: Customer[] = useSelector((state: RootState) => state.customers.customers);
  const {listLoading} = useSelector((state: RootState) => state.customers);
  if (listLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-[80vh] text-muted-foreground">
          <Loader2 className="animate-spin w-6 h-6 mb-2" />
          <p className="text-sm">Cargando clientes...</p>
        </div>
      );
    }  

  return (
       <div className="grid grid-cols-1 gap-4 px-4 pb-5 box-border">
          <div className="col-span-1 md:h-[calc(100vh-3rem)]">
            <CustomersTableComponent customers={customers}/>
            
            <CustomerDialog />
          </div>

        </div>
  )
}
