import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { type RootState } from "@/store/store";
import {
  addCustomer,
  updateCustomer,
  setActiveCustomer,
  toggleCustomerActive,
} from "@/store/pos/customer-slice";

import { customerSchema } from "@/mocks/types/customer";
import type { z } from "zod";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { departamentos } from "@/mocks/catalogs/departamentos";
import { municipios } from "@/mocks/catalogs/municipios";
import { CustomerActivityCombobox } from "./customer-activity-combobox";

type CustomerFormValues = z.infer<typeof customerSchema>;

export const CustomerForm = () => {
  const dispatch = useDispatch();
  const selected = useSelector((state: RootState) => state.customers.selectedCustomer);

  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      dui: "",
      nit: "",
      nrc: "",
      activity: undefined,
      sendMethod: undefined,
    },
  });

  useEffect(() => {
    if (selected) {
        const convertSendMethod = (method?: number): ("email" | "whatsapp")[] => {
        if (method === 1) return ["email"];
        if (method === 2) return ["whatsapp"];
        if (method === 3) return ["email", "whatsapp"];
        return [];
        };
      form.reset({ ...selected, sendMethod: convertSendMethod(selected.sendMethod) });
    } else {
      form.reset({
        name: "",
        email: "",
        phone: "",
        address: "",
        dui: "",
        nit: "",
        nrc: "",
        activity: undefined,
        sendMethod: undefined,
      });
    }
  }, [selected]);

    const getSendMethodValue = (arr?: string[]): number | undefined => {
    if (!arr || arr.length === 0) return undefined;
    const hasEmail = arr.includes("email");
    const hasWhatsapp = arr.includes("whatsapp");

    if (hasEmail && hasWhatsapp) return 3;
    if (hasEmail) return 1;
    if (hasWhatsapp) return 2;
    return undefined;
    };

  const onSubmit = (data: CustomerFormValues) => {
    const base = {
      ...selected,
      ...data,
      sendMethod: getSendMethodValue(data.sendMethod),
      _id: selected?._id || uuidv4(), 
      active: true,
    };

    if (selected) {
      dispatch(updateCustomer(base));
    } else {
      dispatch(addCustomer(base));
    }

    dispatch(setActiveCustomer(null));
  };

  const formatDui = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 9); // máx. 9 dígitos (8 + 1)
  if (digits.length <= 8) return digits;
  return `${digits.slice(0, 8)}-${digits.slice(8)}`;
};

  const formatNit = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 14); // 4 + 6 + 3 + 1 = 14
  let formatted = "";

  if (digits.length > 0) formatted += digits.slice(0, 4);
  if (digits.length > 4) formatted += `-${digits.slice(4, 10)}`;
  if (digits.length > 10) formatted += `-${digits.slice(10, 13)}`;
  if (digits.length > 13) formatted += `-${digits.slice(13, 14)}`;

  return formatted;
 };

 const formatNrc = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 7); // 6 + 1
  if (digits.length <= 6) return digits;
  return `${digits.slice(0, 6)}-${digits.slice(6)}`;
};

  return (
        <Form {...form}>
          <form id="customer-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full h-full">
            
            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem className="w-full">
                <FormLabel>Nombre o razon social:</FormLabel>
                <FormControl>
                    <Input
                    {...field}
                    placeholder="Nombre de l cliente"
                    className="w-full"
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            <div className="flex gap-4">
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                <FormItem className="w-full flex-[2]">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                    <Input {...field} placeholder="Correo electrónico" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                <FormItem className="w-full flex-[1]">
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                    <Input {...field} placeholder="Número de teléfono" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            </div>
            
            <div className="flex gap-4">
                <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                    <FormItem className="w-full flex-1">
                    <FormLabel>Departamento</FormLabel>
                    <Select
                        onValueChange={(value) => {
                        field.onChange(value);
                        form.setValue("municipality", "");
                        }}
                        defaultValue={field.value}
                    >
                        <FormControl className="w-full">
                        <SelectTrigger>
                            <SelectValue placeholder="Seleccione un departamento" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {departamentos.map((dep) => (
                            <SelectItem key={dep.value} value={dep.value}>
                            {dep.label}
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="municipality"
                render={({ field }) => {
                    const selectedDep = form.watch("department");
                    const options = municipios[selectedDep as keyof typeof municipios] ?? [];

                    return (
                    <FormItem className="w-full flex-1">
                        <FormLabel>Municipio</FormLabel>
                        <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={!selectedDep}
                        >
                        <FormControl className="w-full">
                            <SelectTrigger>
                            <SelectValue placeholder="Seleccione un municipio" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {options.map((mun) => (
                            <SelectItem key={mun.value} value={mun.value}>
                                {mun.label}
                            </SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    );
                }}
                />
            </div>

            <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
                <FormItem className="w-full">
                <FormLabel>Dirección</FormLabel>
                <FormControl>
                    <Input {...field} placeholder="Dirección del cliente" />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            <div className="flex gap-4">
            <FormField
                control={form.control}
                name="dui"
                render={({ field }) => (
                <FormItem className="w-full flex-1">
                    <FormLabel>DUI</FormLabel>
                    <FormControl>
                    <Input {...field} placeholder="00000000-0" onChange={(e) => field.onChange(formatDui(e.target.value))}/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="nit"
                render={({ field }) => (
                <FormItem className="w-full flex-1">
                    <FormLabel>NIT</FormLabel>
                    <FormControl>
                    <Input {...field} placeholder="0000-000000-000-0" onChange={(e) => field.onChange(formatNit(e.target.value))}/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="nrc"
                render={({ field }) => (
                <FormItem className="w-full flex-1">
                    <FormLabel>NRC</FormLabel>
                    <FormControl>
                    <Input {...field} placeholder="123456-7" onChange={(e) => field.onChange(formatNrc(e.target.value))}/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            </div>

            <FormField
            control={form.control}
            name="activity"
            render={({ field }) => (
                <FormItem className="w-full">
                <FormLabel>Actividad económica</FormLabel>
                    <CustomerActivityCombobox field={field} />
                <FormMessage />
                </FormItem>
            )}
            />

            <FormField
            control={form.control}
            name="sendMethod"
            render={({ field }) => (
                <FormItem className="w-full">
                <FormLabel>Método de envío de dte</FormLabel>
                <FormControl>
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="min-w-max justify-start">
                        {field.value?.length
                            ? field.value.join(", ").replace("email", "Email").replace("whatsapp", "WhatsApp")
                            : "Seleccionar métodos"}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full">
                        <DropdownMenuCheckboxItem
                        checked={field.value?.includes("email")}
                        onCheckedChange={(checked) => {
                            const newValue = checked
                            ? [...(field.value ?? []), "email"]
                            : field.value?.filter((v) => v !== "email");
                            field.onChange(newValue);
                        }}
                        >
                        Email
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                        checked={field.value?.includes("whatsapp")}
                        onCheckedChange={(checked) => {
                            const newValue = checked
                            ? [...(field.value ?? []), "whatsapp"]
                            : field.value?.filter((v) => v !== "whatsapp");
                            field.onChange(newValue);
                        }}
                        >
                        WhatsApp
                        </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />           
            
          </form>
        </Form>
  );
};