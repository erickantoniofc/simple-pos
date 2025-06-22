import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import type { Sale } from "@/data/types/sale";
import { Badge } from "@/components/";

export const salesColumns: ColumnDef<Sale>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
{
  accessorKey: "date",
  header: "Fecha",
  cell: ({ row }) => {
    const date = row.original.date;
    return date
      ? format(new Date(date), "dd/MM/yyyy")
      : "-";
  },
},
{
  accessorKey: "sendDate",
  header: "Fecha Envío",
  cell: ({ row }) => {
    const date = row.original.sendDate;
    return date
      ? format(new Date(date), "dd/MM/yyyy")
      : "-";
  },
},
  {
    accessorKey: "customer.name",
    header: "Cliente",
    cell: ({ row }) => row.original.customer?.name ?? "-",
  },
  {
    accessorKey: "documentType",
    header: "Tipo Doc.",
    cell: ({ row }) =>
      row.original.documentType === 1
        ? "FE"
        : row.original.documentType === 2
        ? "CCFE"
        : "Desconocido",
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      const total = row.original.total;
      return total.toLocaleString("es-SV", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      });
    },
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const status = row.original.status;
      const statusMap: Record<
        number,
        { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
      > = {
        0: { label: "Borrador", variant: "secondary" },
        1: { label: "Guardado", variant: "secondary" },
        2: { label: "Enviado", variant: "default" },
        3: { label: "Anulado", variant: "destructive" },
        4: { label: "Error", variant: "destructive" },
      };
      const mapped = statusMap[status] ?? { label: "Desconocido", variant: "outline" };
      return <Badge className="text-foreground" variant={mapped.variant}>{mapped.label}</Badge>;
    },
  },
];