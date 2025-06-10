import { useState } from "react";
import { useRef } from "react"
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation"

import type { Category } from "@/data/types/category";

import { Card, CardContent } from "@/components";
import { 
    CustomerSelectComponent,
    DocumentSelectComponent,
    SearchProductComponent,
    ProductGrid
 } from "@/pos-app/components/pos"
import { CustomerDialog } from "../customers";
import { ProductDialog } from "../products/product-dialog";
import { CategoriesFilterComponent } from "./categories-filter-component";
import { TransactionTermComponent } from "./trasaction-term-component";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { PaymentTermComponent } from "./payment-term-component";
export const PosContainer = () => {
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
    const [searchText, setSearchText] = useState("");
    const transactionTerm = useSelector((state: RootState) => state.sales.activeSale?.transactionTerm);
    const isOnCreditSale = (transactionTerm === "2");
    

    return(
        <Card className="flex flex-row h-full">
            <CardContent className="flex flex-col flex-1 p-4 space-y-4 h-full w-full">
                
                <div className={`grid grid-cols-5 gap-2`}>
                    <div className="col-span-3">
                    <CustomerSelectComponent />
                     <CustomerDialog />
                    </div>
                    <DocumentSelectComponent />
                    <TransactionTermComponent />

                </div>
                
                <div className="grid grid-cols-5 gap-2">
                   <div className={isOnCreditSale ? "col-span-4" : "col-span-5"}>
                    <SearchProductComponent         
                        searchText={searchText}
                        setSearchText={setSearchText} 
                    />
                   </div>

                   {
                    isOnCreditSale && <PaymentTermComponent />
                   }

                </div>
                
                <ProductDialog />
                 <CategoriesFilterComponent 
                            selectedCategories={selectedCategories}
                            setSelectedCategories={setSelectedCategories}
                        />
                        
                {/* Scrollable Product Grid */}
                <div className="flex-1 overflow-y-auto">
                    <ProductGrid selectedCategories={selectedCategories} searchText={searchText}/>
                </div>
            </CardContent>
        </Card>
    )
}