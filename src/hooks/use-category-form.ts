import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema } from "@/data/schemas/category-schema";
import type { Category } from "@/data/types/category";
import { addCategory, setActiveCategory, toggleCategoryActive, updateCategory } from "@/store/pos/category-slice";

import { toast } from "sonner";

export type CategoryFormInput = z.input<typeof categorySchema>;
//export type CategoryFormValues = z.infer<typeof categorySchema>;

export const useCategoryForm = (selected: Category | null | undefined) => {
  
    const dispatch = useDispatch();

    
      // Initialize react-hook-form with schema-based validation and default values
      const form = useForm<CategoryFormInput>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
          name: "",
          description: ""
        },
      });

      /**
         * Populate form when a category is selected,
         * or reset it to blank when creating a new one.
         */
        useEffect(() => {
          if (selected) {
            form.reset({
              ...selected,
            });
          } else {
            form.reset();
          }
        }, [selected]);


        const open = selected !== undefined;

        const handleClose = () => dispatch(setActiveCategory(undefined));

        const handleToggleActive = () => {
          try {
            if(selected?._id) {
              dispatch(toggleCategoryActive(selected._id));
              const message = selected.active ? "deshabilitado" : "habilitado";
              toast.success(`El produto ha sido ${message} exitosamente`); 
            }
            
            handleClose();
            
          } catch (error) {
            const message = selected?.active ? "deshabilitar" : "habilitar"
            toast.error(`Error al ${message} el producto`);
          }
       
        }
      
         /**
         * Submit handler that dispatches create or update actions based on selection.
         */
        const onSubmit = (data: CategoryFormInput) => {
          try {
            const base = {
            ...selected,
            ...data,
            description: data.description ?? "",
            active: true,
            
            // Change this logic when connecting to backend
            _id: selected?._id || uuidv4(),
            };
            
            if (selected) {
              dispatch(updateCategory(base));
              toast.success("Categoria modificado exitosamente");

            } else {
              dispatch(addCategory(base));
              toast.success("Categoria creado exitosamente");

            }

            dispatch(setActiveCategory(undefined)); // close dialog after saving
          } catch (error) {
             

            toast.error("Hubo un error al guardar la categoria");
          }
            
        };

    return {form, selected, onSubmit, handleToggleActive, handleClose, open}
    
}
