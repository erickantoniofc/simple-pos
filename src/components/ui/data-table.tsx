import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table"
 
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState } from "react";
import { cn } from "@/lib/utils";
 

interface DataTableProps<TData, TValue> {
 columns: ColumnDef<TData, TValue>[]
  data: TData[]
  filter?: string;
  onRowClick?: (row: TData) => void;
  rowClassName?: (row: TData) => string;
}
 
export function DataTable<TData, TValue>({ columns, data, filter, onRowClick, rowClassName} : DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);

  // Aquí se define el tipo de datos que se espera en la tabla
    const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter: filter,
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: (row, _columnId, filterValue) => {
      const value = row.getValue("name");
      return String(value).toLowerCase().includes(String(filterValue).toLowerCase());
    },
    })
 
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead 
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    style={{
                      width: header.column.columnDef.size
                        ? `${header.column.columnDef.size}px`
                        : undefined,
                    }}
                    className="cursor-pointer select-none"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                    }
                    {{
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted() as string] ?? null}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={cn(
                  "h-16 cursor-pointer hover:bg-muted/30 transition-colors",
                  rowClassName?.(row.original)
                )}
                onClick={() => onRowClick?.(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell 
                    key={cell.id}
                      style={{
                        width: cell.column.columnDef.size
                          ? `${cell.column.columnDef.size}px`
                          : undefined,
                          maxWidth: cell.column.columnDef.size
                          ? `${cell.column.columnDef.size}px`
                          : undefined,
                      }}
                      className="truncate overflow-hidden whitespace-nowrap"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}