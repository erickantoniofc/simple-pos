import { useSelector } from "react-redux";

import type { RootState } from "@/store/store";
import type { Category } from "@/data/types/category";

import { 
    Input,
    Button,
    ScrollArea, 
    ScrollBar, 
} from "@/components/";
import { Plus } from "lucide-react";



export const SearchProductComponent = (
    { selectedCategories, setSelectedCategories, searchText, setSearchText, } 
    : 
    {selectedCategories: Category[]; setSelectedCategories: (cats: Category[]) => void; searchText: string; setSearchText: (text: string) => void;}
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
    <div className="space-y-4">
        <div className="flex gap-2 w-full">
            <Input 
                placeholder="Busca un producto o escanea el codigo de barras.."
                className="flex-1 h-12"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <Button className="whitespace-nowrap h-12 text-white cursor-pointer"><Plus/> Agregar producto</Button>
        </div>
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
                        key={category._id} 
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
    </div>
  )
}
