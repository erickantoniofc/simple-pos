import { z } from "zod";

export interface Customer {
    _id: string;
    name: string;
    email?: string;
    phone?: string; 
    address?: string;
    department?: string;
    municipality?: string;
    dui?: string;
    nit?: string;
    nrc?: string;
    activity?: number;
    sendMethod? : number; // 1: email, 2: whatsapp, 3: both
    active: boolean;
}

export const customerSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  email: z.string().email("Correo inválido").optional().or(z.literal("")),  
  phone: z.string().optional(),
  address: z.string().optional(),
  department: z.string().min(1, "Seleccione un departamento"),
  municipality: z.string().min(1, "Seleccione un municipio"),
  dui: z
    .string()
    .regex(/^\d{8}-\d$/, "Formato inválido. Ej: 12345678-9")
    .optional()
    .or(z.literal("")),
  nit: z
    .string()
    .regex(/^\d{4}-\d{6}-\d{3}-\d$/, "Formato inválido. Ej: 0614-251235-102-3")
    .optional()
    .or(z.literal("")),
  nrc: z
    .string()
    .regex(/^\d{6}-\d$/, "Formato inválido. Ej: 123456-7")
    .optional()
    .or(z.literal("")),
    activity: z.coerce.number().int().min(1, "Seleccione una actividad económica"),
    sendMethod: z.array(z.enum(["email", "whatsapp"])).optional(),
});
