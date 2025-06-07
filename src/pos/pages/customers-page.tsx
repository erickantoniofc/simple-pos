import { useSelector } from "react-redux"

import type { RootState } from "@/store/store"
import type { Customer } from "@/data/types/customer";

import { CustomersTableComponent, CustomerDialog } from "@/pos/components/customers"


export const CustomersPage = () => {
  const customers: Customer[] = useSelector((state: RootState) => state.customers.customers);


  return (
       <div className="grid grid-cols-1 gap-4 px-4 pb-5 box-border">
          <div className="col-span-1 md:h-[calc(100vh-3rem)]">
            <CustomersTableComponent customers={customers}/>
            
            <CustomerDialog />
          </div>

        </div>
  )
}
