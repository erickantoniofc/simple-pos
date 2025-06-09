import { useState } from "react";

import type { Category } from "@/data/types/category";

import { Card, CardContent } from "@/components";
import { 
    CustomerSelectComponent,
    DocumentSelectComponent,
    SearchProductComponent,
    ProductGrid
 } from "@/pos/components/pos"
import { CustomerDialog } from "../customers";
import { ProductDialog } from "../products/product-dialog";
export const ProductContainer = () => {
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
    const [searchText, setSearchText] = useState("");

      
    return(
        <Card className="flex flex-row h-full">
            <CardContent className="flex flex-col flex-1 p-4 space-y-4 h-full w-full">
                
                <div className="grid grid-cols-4 gap-2">
                    <div className="col-span-3 grid grid-cols-5 gap-2">
                    <CustomerSelectComponent />
                     <CustomerDialog />
                    </div>
                    <div className="col-span-1">
                    <DocumentSelectComponent />
                    </div>
                </div>
                
                {/* Add Product UI */}
                <div className="w-full">
                    <SearchProductComponent 
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                        searchText={searchText}
                        setSearchText={setSearchText} 
                    />
                    <ProductDialog />
                </div>

                {/* Scrollable Product Grid */}
                <div className="flex-1 overflow-y-auto">
                    <ProductGrid selectedCategories={selectedCategories} searchText={searchText}/>
                </div>

            </CardContent>
        </Card>
    )
}