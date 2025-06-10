import { useDispatch, useSelector } from "react-redux";
import { updateActiveSale } from "@/store/pos/sale-slice";

import type { RootState } from "@/store/store";

import {
    Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components"



export const PaymentTermComponent = () => {

  const paymentTerm = useSelector((state: RootState) => state.sales.activeSale?.paymentTerm);
  const dispatch = useDispatch();
  const onPaymentTermChange = (value: string) => {
    dispatch(updateActiveSale({ paymentTerm: [paymentTerm?.[0] ?? 0, value] }));
  }
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10) || 0;
    dispatch(updateActiveSale({ paymentTerm: [newValue, paymentTerm?.[1] ?? "01"] }));
  };

  return (
    <div className="flex col-span-1 gap-2">
    <Input
          id="term-quantity"
          onFocus={(e) => e.target.select()}
          type="number"
          value={paymentTerm?.[0]}
          min={0}
          step={1}
          onChange={handleNumberChange}
          placeholder="Cant."
          className="h-12 flex-[1]"
        />
    <Select 
    value={paymentTerm?.[1]} 
     onValueChange={onPaymentTermChange}>
      <SelectTrigger className="h-12 min-h-[3rem] py-0 px-3 flex-[2] w-full">
        <SelectValue placeholder="Plazo" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Plazo</SelectLabel>
          <SelectItem value="01">Dias</SelectItem>
          <SelectItem value="02">Meses</SelectItem>
          <SelectItem value="03">Años</SelectItem>          
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>
  )
}
