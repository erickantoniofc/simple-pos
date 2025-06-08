import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { addProduct, setActiveProduct, updateProduct } from "@/store/pos/product-slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";

import { productSchema } from "@/data/schemas/product-schema";
import type { RootState } from "@/store/store";
import type { z } from "zod";

export type ProductFormInput = z.input<typeof productSchema>;
export type ProductFormValues = z.infer<typeof productSchema>;

export const useProductForm = () => {
  
    const dispatch = useDispatch();
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    // Get the currently selected customer from Redux state
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
      
         /**
         * Submit handler that dispatches create or update actions based on selection.
         */
        const onSubmit = (data: ProductFormValues) => {
            const base = {
            ...selected,
            ...data,
            price: Number(Number(data.price).toFixed(2)),
            active: true,
            
            // Change this logic when connecting to backend
            _id: selected?._id || uuidv4(),
            };

            if (selected) {
            dispatch(updateProduct(base));
            } else {
            console.log(base)
            dispatch(addProduct(base));
            }

            dispatch(setActiveProduct(undefined)); // close dialog after saving
        };

    return {form, selected, onSubmit, imageFile, previewUrl, onFileSelect}
    
}
