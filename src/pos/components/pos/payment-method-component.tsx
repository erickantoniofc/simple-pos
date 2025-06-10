import { useDispatch, useSelector } from "react-redux";
import { updateActiveSale } from "@/store/pos/sale-slice";
import { formaDePago } from "@/data/catalogs/forma-de-pago";
import { type RootState } from "@/store/store";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components";

export const PaymentMethodComponent = () => {
  const dispatch = useDispatch();
  const paymentMethod = useSelector(
    (state: RootState) => state.sales.activeSale?.paymentMethod ?? ""
  );

  const handleChange = (value: string) => {
    dispatch(updateActiveSale({ paymentMethod: value }));
  };

  return (
    <div className="flex flex-col col-span-3">
      <label className="text-xs text-muted-foreground mb-1 text-left">Forma de pago</label>
      <Select value={paymentMethod} onValueChange={handleChange}>
        <SelectTrigger className="h-10 w-full">
          <SelectValue placeholder="Seleccione" />
        </SelectTrigger>
        <SelectContent>
          {formaDePago.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};