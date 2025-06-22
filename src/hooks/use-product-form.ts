import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { clearAllErrors, setActiveProduct, setLoading, } from "@/store/pos/product-slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";

import { productSchema } from "@/data/schemas/product-schema";
import type { AppDispatch, RootState } from "@/store/store";
import type { z } from "zod";
import { toast } from "sonner";
import { createProductThunk, toggleProductActiveThunk, updateProductThunk } from "@/store/pos/product-thunk";
import { uploadImageToSupabase } from "@/helpers/images-handler";

export type ProductFormInput = z.input<typeof productSchema>;
export type ProductFormValues = z.infer<typeof productSchema>;

export const useProductForm = () => {
  
    const dispatch = useDispatch<AppDispatch>();
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    // Get the currently selected product from Redux state
  const selected = useSelector((state: RootState) => state.products.selectedProduct);

    // Handler for file selection, sets the image file and generates a preview URL
    const onFileSelect = (file: File) => {
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    };

    
      // Initialize react-hook-form with schema-based validation and default values
      const form = useForm<ProductFormInput, any, ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
          name: "",
          price: 0,
          imageUrl: "",
          category: "",
        },
      });

      /**
         * Populate form when a product is selected,
         * or reset it to blank when creating a new one.
         */
        useEffect(() => {
          if (selected) {
            form.reset({
              ...selected,
            });
            setPreviewUrl(selected.imageUrl ?? null);
          } else {
            form.reset();
            setPreviewUrl(null);
            setImageFile(null);
          }
        }, [selected]);


        const open = selected !== undefined;

        const handleClose = () => dispatch(setActiveProduct(undefined));

        const handleToggleActive = async () => {
        if (!selected?.id) return;

        const action = selected.active ? "deshabilitar" : "habilitar";
        const actionPast = selected.active ? "deshabilitado" : "habilitado";

        try {
          await dispatch(toggleProductActiveThunk(selected.id)).unwrap();

          toast.success(`El producto ha sido ${actionPast} exitosamente`);
          
          dispatch(setActiveProduct(undefined));

        } catch (err) {
          toast.error(`Error al ${action} el producto`);
        }
        finally {
          dispatch(clearAllErrors());
        }
      };
      
         /**
         * Submit handler that dispatches create or update actions based on selection.
         */
        const onSubmit = async (data: ProductFormValues) => {
        try {
          dispatch(setLoading(true));
          
          let imageUrl = data.imageUrl;

          if (imageFile) {
            const fileName = `${selected?.imageUrl ?? uuidv4()}.jpg`;
            imageUrl = await uploadImageToSupabase(imageFile, fileName);
          }


          const product = {
            ...selected,
            ...data,
            imageUrl,
            price: Number(Number(data.price).toFixed(2)),
            active: true,
          };;

          if (selected) {
            await dispatch(updateProductThunk({ ...product })).unwrap();
            toast.success("Producto modificado exitosamente");
          } else {
            await dispatch(createProductThunk(product)).unwrap();
            toast.success("Producto creado exitosamente");
          }
          dispatch(setActiveProduct(undefined));
        } catch (err) {
          toast.error("Hubo un error al guardar el producto");
        }
        finally {
          dispatch(setLoading(false)); 
          dispatch(clearAllErrors());
        }
      };
    return {form, selected, onSubmit, imageFile, previewUrl, onFileSelect, handleToggleActive, handleClose, open}
    
}
