import { type ColumnDef } from "@tanstack/react-table";
import { type Category } from "@/data/types/category"; // ajusta el path si es necesario

export const categoryColumns: ColumnDef<Category>[] = [
  {
    accessorKey: "id",
    header: "ID",
    size: 50,
  },
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "description",
    header: "Descripción",
  },
];