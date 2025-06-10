import type { Product } from "@/data/types/product";
import { setActiveProduct } from "@/store/pos/product-slice";
import type { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useProductActions = () => {
    const [filter, setFilter] = useState(""); 
    const dispatch = useDispatch();
    const selected = useSelector((state: RootState) => state.products.selectedProduct);

    useEffect(() => {
        dispatch(setActiveProduct(undefined));
    }, []);
    
    const handleRowClick = (product: Product) => {
        dispatch(setActiveProduct(product));
    }

    const handleNewProduct = () => {
        dispatch(setActiveProduct(null));
    };

    return {
        filter,
        setFilter,
        selected,
        handleRowClick,
        handleNewProduct
    }
}