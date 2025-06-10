import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@/components"
import { useProductForm } from "@/hooks/use-product-form"
import { cn } from "@/lib/utils"; 

import { mockCategories } from "@/data/mocks/categories";

import {

  Popover,
  PopoverContent,
  PopoverTrigger,
  Command, 
  CommandInput, 
  CommandItem, 
  CommandList,
  Button
} from "@/components";
import { Check, ChevronsUpDown } from "lucide-react";

export const ProductForm = () => {

    const {form, onSubmit, previewUrl, onFileSelect} = useProductForm();

  return (
    <Form {...form}>
        <form id="product-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full h-full">
            {/* Nombre del producto */}
            <FormField
            control={form.control}
            name="name"
            render={({field}) => (
                <FormItem className="w-full">
                    <FormLabel>Nombre del producto:</FormLabel>
                    <FormControl>
                        <Input 
                        {...field}
                        onFocus={(e) => e.target.select()}
                        placeholder="Nombre del producto"
                        className="w-full"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />

            {/* Precio e imagen */}
            <div className="flex gap-4">
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                    <FormItem className="w-full flex-[1]">
                        <FormLabel>Precio</FormLabel>
                        <FormControl>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                            <Input
                            {...field}
                            formNoValidate
                            step="0.01"
                            onFocus={(e) => e.target.select()}
                            type="number"
                            placeholder="Precio"
                            className="pl-7"
                            value={field.value as number | string | undefined}
                            />
                        </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

               <FormField
                control={form.control}
                name="imageUrl"
                render={(field) => (
                    <FormItem className="w-full flex-[2]">
                    <FormLabel>Imagen del producto</FormLabel>
                    <FormControl>
                        <div className="flex items-center gap-4">
                        {previewUrl && (
                        <img
                            src={previewUrl}
                            alt="Vista previa"
                            className="w-12 h-10 object-cover rounded"
                        />
                        )}

                        <Input
                            type="file"
                            accept="image/*"
                            onBlur={field.field.onBlur}
                            onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                onFileSelect(file);
                            }}
                        />
                        </div>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

            </div>

            {/* Category */}
            <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
                <FormItem className="w-full">
                <FormLabel>Categoría</FormLabel>
                <Popover>
                    <PopoverTrigger asChild>
                    <FormControl>
                        <Button
                        variant="outline"
                        role="combobox"
                        className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
                        >
                        {field.value
                            ? mockCategories.find(cat => cat._id === field.value)?.name
                            : "Selecciona una categoría"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0 h-[200px]">
                    <Command>
                        <CommandInput placeholder="Buscar categoría..." className="h-9" />
                        <CommandList>
                        {mockCategories.map(cat => (
                            <CommandItem
                            key={cat._id}
                            value={cat.name}
                            onSelect={() => {
                                form.setValue("category", cat._id, 
                                { shouldValidate: true, 
                                  shouldTouch: true,
                                  shouldDirty: true, });
                                  
                            }}
                            >
                            <Check
                                className={cn(
                                "mr-2 h-4 w-4",
                                cat._id === field.value ? "opacity-100" : "opacity-0"
                                )}
                            />
                            {cat.name}
                            </CommandItem>
                        ))}
                        </CommandList>
                    </Command>
                    </PopoverContent>
                </Popover>
                <FormMessage />
                </FormItem>
            )}
            />

        </form>
    </Form>
  )
}
