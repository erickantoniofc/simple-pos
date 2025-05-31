import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



export const DocumentSelectComponent = () => {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Documento.." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Tipo de documento</SelectLabel>
          <SelectItem value="apple">Credito fiscal</SelectItem>
          <SelectItem value="banana">Consumidor final</SelectItem>
          <SelectItem value="blueberry">Nota de credito</SelectItem>
          <SelectItem value="grapes">Nota de debito</SelectItem>
          
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
