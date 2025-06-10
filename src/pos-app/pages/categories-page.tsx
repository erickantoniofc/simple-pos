import { useSelector } from "react-redux";

import type { RootState } from "@/store/store";
import type { Category } from "@/data/types/category";
import { CategoriesTableComponent } from "../components/categories/categories-table-component";

export const CategoriesPage = () => {

  const categories: Category[] = useSelector((state: RootState) => state.categories.categories);

  return (
    <div className="grid grid-cols-1 gap-4 px-4 pb-5 box-border">
      <div className="col-span-1 md:h-[calc(100vh-3rem)]">
        <CategoriesTableComponent categories={categories} />
        
      </div>
    </div>
  )
}
