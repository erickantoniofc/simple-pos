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



export const DocumentSelectComponent = () => {

  const documentType = useSelector((state: RootState) => state.sales.activeSale?.documentType);
  const dispatch = useDispatch();
  const onDocumentChange = (value: string) => {
    dispatch(updateActiveSale({ documentType: Number(value) }));
  }

  return (
    <Select 
    value={ 
        documentType === 1 ? "1" :
        documentType === 2 ? "2" :
        ""
     } 
     onValueChange={onDocumentChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Documento.." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Tipo de documento</SelectLabel>
          <SelectItem value="1">Factura electronica</SelectItem>
          <SelectItem value="2">Credito fiscal</SelectItem>
          
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
