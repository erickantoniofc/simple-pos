import { z } from "zod";

export const customerSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),

  email: z.string().email("Correo inválido"), 
  phone: z.string().min(8, "Teléfono inválido").or(z.literal("")).optional(),
  dui: z.string().optional(),
  nit: z.string().optional(),
  nrc: z.string().optional(),
  address: z.string().optional(),
  activity: z.number().optional(), 

  department: z.string().min(1, "El departamento es requerido"),
  municipality: z.string().min(1, "El municipio es requerido"),

  sendMethod: z
    .array(z.enum(["email", "whatsapp"]))
    .min(1, "Debe seleccionar un método de envío"),
});