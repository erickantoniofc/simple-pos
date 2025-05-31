import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

const categories = ["All", "Beverages", "Snacks", "Bakery", "Dairy", "Produce"]


export const AddProductComponent = () => {

    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const toggleCategory = (category: string) => {
        setSelectedCategories((prev) => 
            prev.includes(category)
            ? prev.filter((c) => c !== category)
            : [...prev, category]
        );
    }

  return (
    <div className="space-y-4">
        <div className="flex gap-2 w-full">
            <Input 
                placeholder="Busca un producto o escanea el codigo de barras.."
                className="flex-1 h-12"
            />
            <Button className="whitespace-nowrap h-12 text-white cursor-pointer"><Plus/> Agregar producto</Button>
        </div>
        <div className="flex gap-2 flex-wrap">
            {
                categories.map((category) => {
                    const isActive = selectedCategories.includes(category);
                    return (
                    <Button 
                        key={category} 
                        variant={isActive ? "default" : "outline"} 
                        size="sm"
                        onClick={() => toggleCategory(category)}
                        className={isActive ? "text-white cursor-pointer" : "cursor-pointer"}
                        >
                        {category}
                    </Button>
                )})
            }
        </div>
    </div>
  )
}
