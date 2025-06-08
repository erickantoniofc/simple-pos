import { type ColumnDef } from "@tanstack/react-table"
import type { Product } from "@/data/types/product"
import { mockCategories } from "@/data/mocks/categories";

const categoryMap = new Map(mockCategories.map(c => [c._id, c.name]));

export const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "_id",
    header: "ID",
    size: 50,
 },
  {
  accessorKey: "imageUrl",
  header: "Imagen",
  size: 50,
  cell: ({ row }) => {
    const src = row.getValue<string>("imageUrl");
    const name = row.getValue<string>("name") ?? "";
    const initial = name.charAt(0).toUpperCase();

    if (src?.trim()) {
      return (
        <img
          src={src}
          alt="Producto"
          className="w-10 h-10 object-cover rounded"
        />
      );
    }

    // Si no hay imagen, muestra la inicial como un círculo
    return (
      <div className="w-10 h-10 flex items-center justify-center bg-muted rounded-full text-sm font-medium text-muted-foreground">
        {initial}
      </div>
    );
  },
},
  {
    accessorKey: "name",
    header: "Producto",
    size: 150,
  },
  {
    accessorKey: "price",
    header: "Precio",
    size: 50,
    cell: ({ getValue }) => {
    const value = getValue<number>();
    return `$${value.toFixed(2)}`;
    }
  },
    {
    accessorKey: "category",
    header: "Categoria",
    size: 50,
    cell: ({ getValue }) => categoryMap.get(getValue<string>()) ?? "Sin categoría"
  }
]


