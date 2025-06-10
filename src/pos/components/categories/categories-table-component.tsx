import { Button, Card, CardContent, DataTable, Input } from "@/components";
import type { Category } from "@/data/types/category";
import { useCategoryActions } from "@/hooks/use-category-actions";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Plus } from "lucide-react";
import { categoryColumns } from "./categories-columns";
import { cn } from "@/lib/utils";
import { CategoryDialog } from "./category-dialog";


export const CategoriesTableComponent = ({categories} : {categories: Category[]}) => {

    const {
        filter,
        setFilter,
        selected,
        handleRowClick,
        handleNewCategory
    } = useCategoryActions();

  return (
     <Card className="flex flex-row h-full">
      <CardContent className="flex flex-col flex-1 p-4 space-y-4 h-full w-full">
       <div className="flex items-center justify-between gap-4">
          <Input
            type="text"
            placeholder="Buscar por nombre de categoria"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="max-w-sm"
          />
          <div className="ml-auto">

            <Button className="text-foreground cursor-pointer" onClick={handleNewCategory}><Plus /> Nueva categoria</Button>
          </div>
        </div>

      <ScrollArea className="flex-1 overflow-y-auto">
        <DataTable 
          columns={categoryColumns} 
          data={categories} 
          filter={filter}  
          onRowClick={handleRowClick} 
          rowClassName={(category) =>
          cn(
            !category.active && "opacity-50 bg-muted",
            selected?._id === category._id && "bg-primary/10 border-l-4 border-primary"
          )}
        />
      </ScrollArea>
    </CardContent>
    <CategoryDialog activeCategory={selected} />
    </Card>
    
  )
}
