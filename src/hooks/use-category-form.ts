import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema } from "@/data/schemas/category-schema";
import type { Category } from "@/data/types/category";
import { addCategory, setActiveCategory, toggleCategoryActive, updateCategory } from "@/store/pos/category-slice";

import { toast } from "sonner";
import { saveCategoryThunk, toggleCategoryActiveThunk } from "@/store/pos/category-thunk";
import type { AppDispatch } from "@/store/store";

export type CategoryFormInput = z.input<typeof categorySchema>;
//export type CategoryFormValues = z.infer<typeof categorySchema>;

export const useCategoryForm = (selected: Category | null | undefined) => {
  
    const dispatch = useDispatch<AppDispatch>();

    
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

       const handleToggleActive = async () => {
          if (!selected?._id) return;

          const action = selected.active ? "deshabilitar" : "habilitar";
          const actionPast = selected.active ? "deshabilitado" : "habilitado";

          try {
            await dispatch(toggleCategoryActiveThunk(selected._id)).unwrap();
            toast.success(`El producto ha sido ${actionPast} exitosamente`);
            handleClose();
          } catch (err) {
            toast.error(`Error al ${action} el producto`);
          }
        };
      
         /**
         * Submit handler that dispatches create or update actions based on selection.
         */
        const onSubmit = async(data: CategoryFormInput) => {
            try {
            const base = {
              ...selected,
              ...data,
              active: true
            };

            const result = await dispatch(saveCategoryThunk(base)).unwrap();

            toast.success(selected ? "Categoría modificada exitosamente" : "Categoría creada exitosamente");
            dispatch(setActiveCategory(undefined));
          } catch (error) {
            toast.error("Hubo un error al guardar la categoría");
          }
        };

    return {form, selected, onSubmit, handleToggleActive, handleClose, open}
    
}
