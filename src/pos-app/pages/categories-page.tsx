import { useSelector } from "react-redux";

import type { RootState } from "@/store/store";
import type { Category } from "@/data/types/category";
import { CategoriesTableComponent } from "../components/categories/categories-table-component";
import { Loader2 } from "lucide-react";

export const CategoriesPage = () => {

  const categories: Category[] = useSelector((state: RootState) => state.categories.categories);
  const listLoading: boolean = useSelector((state: RootState) => state.categories.listLoading);
  return (
    <div className="grid grid-cols-1 gap-4 px-4 pb-5 box-border">
      <div className="col-span-1 md:h-[calc(100vh-3rem)]">
      {listLoading ? (
        <div className="flex items-center justify-center h-full">
          <Loader2 className="animate-spin w-6 h-6 text-muted-foreground" />
          <span className="ml-2 text-sm text-muted-foreground">Cargando categorías...</span>
        </div>
      ) : (
        <CategoriesTableComponent categories={categories} />
      )}
    </div>
    </div>
  )
}
