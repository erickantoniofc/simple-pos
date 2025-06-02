import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Check, ChevronsUpDown, Edit, Plus } from "lucide-react"
import { useState } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"


export const CustomerSelectComponent = () => {

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")

    const customers = useSelector((state: RootState) => state.customers.customers)

  return (
    <>

<div className="col-span-4">

    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between cursor-pointer"
        >
          {value
            ? customers.find((customer) => customer._id === value)?.name
            : "Seleccionar cliente"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Busqueda de clientes..." className="h-9" />
          <CommandList>
            <CommandEmpty>Ningun cliente encontrado...</CommandEmpty>
            <CommandGroup>
              {customers.map((customer) => (
                <CommandItem
                  key={customer._id}
                  value={customer.name}   
                  onSelect={() => {
                    setValue(customer._id === value ? "" : customer._id)
                    setOpen(false)
                  }}
                >
                  {customer.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === customer._id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>

    </div>
    <div className="col-span-1 grid grid-cols-2 gap-1">

        <Button className="text-accent-foreground cursor-pointer"><Edit /></Button>

        <Button className="text-accent-foreground cursor-pointer"><Plus /></Button>
    </div>
        </>
  )
}
