import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cn } from "@/lib/utils";

import type { RootState } from "@/store/store";
import type { Customer } from "@/data/types/customer";
import { updateActiveSale } from "@/store/pos/sale-slice";
import { setActiveCustomer, setSelectCreatedCustomerInSale } from "@/store/pos/customer-slice";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components";
import { Check, ChevronsUpDown, Edit, Plus } from "lucide-react";

export const CustomerSelectComponent = () => {
  const [open, setOpen] = useState(false);
  const customers = useSelector((state: RootState) => state.customers.customers);
  const activeCustomer = useSelector((state: RootState) => state.sales.activeSale?.customer);
  const dispatch = useDispatch();

  const onCustomerSelect = (customer: Customer) => {
    const isSelected = customer._id === activeCustomer?._id;
    dispatch(updateActiveSale({ customer: isSelected ? undefined : customer }));
    setOpen(false);
  };

  const handleEditCustomer = () => {
    if (activeCustomer) {
      dispatch(setActiveCustomer(activeCustomer)); // modo edición
    }
  };

  const handleAddCustomer = () => {
    dispatch(setSelectCreatedCustomerInSale(true));
    dispatch(setActiveCustomer(null)); // modo nuevo
  };

  return (
    <div className="grid grid-cols-6 gap-2">
      <div className="col-span-4">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between cursor-pointer"
            >
              {activeCustomer ? activeCustomer.name : "Seleccionar cliente"}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0">
            <Command>
              <CommandInput placeholder="Buscar cliente..." className="h-9" />
              <CommandList>
                <CommandEmpty>No se encontraron clientes...</CommandEmpty>
                <CommandGroup>
                  {customers
                    .filter((c) => c.active)
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((customer) => (
                      
                        <CommandItem
                          value={`${customer.name} ${customer._id} ${customer.nrc ?? ""} ${customer.dui ?? ""}`.toLowerCase()}
                          onSelect={() => onCustomerSelect(customer)}
                          className="py-2"
                        >
                          <div className="flex flex-col w-full">
                            <div className="text-sm font-medium text-foreground truncate">
                              {customer.name}
                            </div>
                            <div className="flex justify-between text-muted-foreground text-xs mt-1">
                              <span>{`NRC: ${customer.nrc || "-"}`}</span>
                              <span>{`DUI: ${customer.dui || "-"}`}</span>
                            </div>
                          </div>

                          <Check
                            className={cn(
                              "ml-auto",
                              activeCustomer?._id === customer._id ? "opacity-100" : "opacity-0"
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

      <div className="col-span-2 grid grid-cols-2 gap-1">
        <Button
          className="text-accent-foreground cursor-pointer"
          disabled={!activeCustomer}
          onClick={handleEditCustomer}
        >
          <Edit />
        </Button>
        <Button className="text-accent-foreground cursor-pointer" onClick={handleAddCustomer}>
          <Plus />
        </Button>
      </div>
    </div>
  );
};