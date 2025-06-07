import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { actividades } from "@/mocks/catalogs/activadades-economicas";

import { useState } from "react";

export const CustomerActivityCombobox = ({ field }: { field: any }) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const selected = actividades.find((item) => Number(item.value) === field.value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
       
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className={cn("w-full justify-between")}
          >
            <span className="w-full truncate break-words">{selected?.label || "Seleccionar actividad"}</span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
  
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] max-h-72 overflow-y-auto p-0 break-words">
        <Command>
          <CommandInput placeholder="Buscar actividad..." onValueChange={setSearchTerm} />
          <CommandEmpty>No se encontró ninguna actividad.</CommandEmpty>
          <CommandGroup>
            {actividades
                .filter((item) =>
                item.label.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .slice(0, 20) // mostrar solo primeros 20 resultados
                .map((item) => (
                <CommandItem
                    key={item.value}
                    value={item.label.toLowerCase()}
                    onSelect={() => {
                    field.onChange(Number(item.value));
                    setOpen(false);
                    }}
                >
                    <Check
                    className={cn(
                        "mr-2 h-4 w-4",
                        Number(item.value) === field.value ? "opacity-100" : "opacity-0"
                    )}
                    />
                    {item.label}
                </CommandItem>
                ))}
            </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
