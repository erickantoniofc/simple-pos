import { useDispatch, useSelector } from "react-redux";
import { updateActiveSale } from "@/store/pos/sale-slice";

import type { RootState } from "@/store/store";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components"



export const TransactionTermComponent = () => {

  const transactionTerm = useSelector((state: RootState) => state.sales.activeSale?.transactionTerm);
  const dispatch = useDispatch();
  const onTransactionTermChange = (value: string) => {
    if(value != "2") dispatch(updateActiveSale({ paymentTerm: [0, ""] }));
    dispatch(updateActiveSale({ transactionTerm: value }));
  }

  return (
    <Select 
    value={transactionTerm} 
     onValueChange={onTransactionTermChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Documento.." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Tipo de transaccion</SelectLabel>
          <SelectItem value="1">Contado</SelectItem>
          <SelectItem value="2">A credito</SelectItem>
          <SelectItem value="3">Otro</SelectItem>          
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
