import type { Category } from "@/data/types/category";
import { setActiveCategory } from "@/store/pos/category-slice";
import type { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useCategoryActions = () => {
    const [filter, setFilter] = useState(""); 
    const dispatch = useDispatch();
    const selected = useSelector((state: RootState) => state.categories.activeCategory);

    useEffect(() => {
        dispatch(setActiveCategory(undefined));
    }, []);
    
    const handleRowClick = (category: Category) => {
        dispatch(setActiveCategory(category));
    }

    const handleNewCategory = () => {
        dispatch(setActiveCategory(null));
    };

    return {
        filter,
        setFilter,
        selected,
        handleRowClick,
        handleNewCategory
    }
}