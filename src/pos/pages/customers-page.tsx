import { useDispatch, useSelector } from "react-redux"
import { CustomersTableComponent } from "../components/customers/customers-table-component"
import type { RootState } from "@/store/store"
import type { Customer } from "@/mocks/types/customer";
import { CustomerDialog } from "../components/customers/customer-dialog";

export const CustomersPage = () => {
  const customers: Customer[] = useSelector((state: RootState) => state.customers.customers);
  const dispatch = useDispatch();

  return (
       <div className="grid grid-cols-1 gap-4 px-4 pb-5 box-border">
          <div className="col-span-1 md:h-[calc(100vh-3rem)]">
            <CustomersTableComponent customers={customers}/>
            
            <CustomerDialog />
          </div>

        </div>
  )
}
