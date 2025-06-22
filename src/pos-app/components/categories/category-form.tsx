import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@/components"


export const CategoryForm = ({form, onSubmit} : {form: any, onSubmit: any}) => {


  return (
    <Form {...form}>
        <form id="category-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full h-full">
            {/* Nombre de la categoria */}
            <FormField
            control={form.control}
            name="name"
            render={({field}) => (
                <FormItem className="w-full">
                    <FormLabel>Nombre de la categoria:</FormLabel>
                    <FormControl>
                        <Input 
                        {...field}
                        onFocus={(e) => e.target.select()}
                        placeholder="Nombre de la categoria"
                        className="w-full"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />

            {/* Descripcion de la categoria */}
            <FormField
            control={form.control}
            name="description"
            render={({field}) => (
                <FormItem className="w-full">
                    <FormLabel>Descripcion</FormLabel>
                    <FormControl>
                        <Input 
                        {...field}
                        onFocus={(e) => e.target.select()}
                        placeholder="Descripcion de la categoria"
                        className="w-full"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />

        </form>
    </Form>
  )
}
