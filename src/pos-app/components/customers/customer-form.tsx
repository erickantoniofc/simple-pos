import { useCustomerForm } from "@/hooks/use-customer-form";

import { departamentos } from "@/data/catalogs/departamentos";
import { municipios } from "@/data/catalogs/municipios";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Button,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  DropdownMenu, 
  DropdownMenuCheckboxItem, 
  DropdownMenuContent, 
  DropdownMenuTrigger
} from "@/components";
import { CustomerActivityCombobox } from "@/pos-app/components/customers/customer-activity-combobox";




export const CustomerForm = () => {
  
 const { form, onSubmit, formatDui, formatNit, formatNrc } = useCustomerForm();

  return (
        <Form {...form}>
          <form id="customer-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full h-full">
            
            {/* Nombre o razon social */}
            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem className="w-full">
                <FormLabel>Nombre o razon social:</FormLabel>
                <FormControl>
                    <Input
                    {...field}
                    placeholder="Nombre del cliente"
                    className="w-full"
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            {/* Email y telefono */}
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
            
            {/* Departamento y municipio */}
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

            {/* Direccion */}
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

            {/* DUI, NIT y NRC */}
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

            {/* Actividad economica */}
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