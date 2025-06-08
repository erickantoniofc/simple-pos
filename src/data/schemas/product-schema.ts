// product-schema.ts
import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  price: z.preprocess(
    (val) => val === "" ? undefined : Number(val),
    z.number()
      .nonnegative("El precio no puede ser negativo")
      .refine((val) => Number((val).toFixed(2)) === val, {
        message: "El precio debe tener como máximo 2 decimales",
      })
  ),
  imageUrl: z.string().optional(),
  category: z.string().min(1, "La categoría es requerida"),
});