import { useSelector } from "react-redux";
import type { Category } from "@/data/types/category";
import type { RootState } from "@/store/store";
import { Button, ScrollArea, ScrollBar } from "@/components";

export const CategoriesFilterComponent = (
    {selectedCategories, setSelectedCategories,} 
    : 
    {selectedCategories: Category[]; setSelectedCategories: (cats: Category[]) => void;}
) => {

    const categories = useSelector((state: RootState) => state.categories.categories);
    const toggleCategory = (category: Category) => {
            selectedCategories.includes(category)
                ? setSelectedCategories(selectedCategories.filter((c: Category) => c !== category))
                : setSelectedCategories([...selectedCategories, category]);
    };

        const categoriesOnWheelHandler = (e: React.WheelEvent<HTMLDivElement>) => {
            if (e.deltaY !== 0) {
                const target = e.currentTarget.querySelector("div");
                if (target) {
                    target.scrollLeft += e.deltaY;
                }
            }
        }

  return (
    <ScrollArea className="w-full whitespace-nowrap overflow-auto" onWheel={categoriesOnWheelHandler}>

        <div className="flex gap-2 w-max pb-1">
            {
                categories
                .filter(c => c.active)
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((category) => {
                    const isActive = selectedCategories.includes(category);
                    return (
                    <Button 
                        key={category.id} 
                        variant={isActive ? "default" : "outline"} 
                        size="sm"
                        onClick={() => toggleCategory(category)}
                        className={isActive ? "text-white cursor-pointer" : "cursor-pointer"}
                        >
                        {category.name}
                    </Button>
                )})
            }
        </div>
        <ScrollBar orientation="horizontal" />

        </ScrollArea>
  )
}
