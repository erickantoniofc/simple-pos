import { Card, CardContent } from "@/components/ui/card";
import { ProductGrid } from "./product-grid";
import { CustomerSelectComponent } from "./customer-select-component";
import { DocumentSelectComponent } from "./document-select-component";
import { SearchProductComponent } from "./search-product-component";
export const ProductContainer = () => {
    return(
        <Card className="flex flex-row h-full">
            <CardContent className="flex flex-col flex-1 p-4 space-y-4 h-full">
                
                <div className="grid grid-cols-4 gap-2">
                    <div className="col-span-3 grid grid-cols-5 gap-2">
                    <CustomerSelectComponent />
                    </div>
                    <div className="col-span-1">
                    <DocumentSelectComponent />
                    </div>
                </div>
                
                {/* Add Product UI */}
                <div className="">
                    <SearchProductComponent />
                </div>

                {/* Scrollable Product Grid */}
                <div className="flex-1 overflow-y-auto">
                    <ProductGrid />
                </div>

            </CardContent>
        </Card>
    )
}