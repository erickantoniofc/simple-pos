import { type ColumnDef } from "@tanstack/react-table"
import { type Customer } from "@/data/types/customer"

export const customerColumns: ColumnDef<Customer>[] = [
  {
    accessorKey: "_id",
    header: "ID",
    size: 50,
  },
  {
    accessorKey: "name",
    header: "Nombre",
    size: 150,
  },
  {
    accessorKey: "email",
    header: "Email",
    size: 150,
  },
  {
    accessorKey: "phone",
    header: "Teléfono",
    size: 50,
  },
    {
    accessorKey: "dui",
    header: "DUI",
    size: 50,
  },
  {
    accessorKey: "nit",
    header: "NIT",
    size: 100,
  },
    {
    accessorKey: "nrc",
    header: "NRC",
    size: 50,
  },
]


