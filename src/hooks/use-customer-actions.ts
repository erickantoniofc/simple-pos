import type { Customer } from "@/data/types/customer";
import { setActiveCustomer } from "@/store/pos/customer-slice";
import type { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useCustomerActions = () => {
    const [filter, setFilter] = useState(""); 
    const dispatch = useDispatch();
    const selected = useSelector((state: RootState) => state.customers.selectedCustomer);

    useEffect(() => {
        dispatch(setActiveCustomer(undefined));
    }, []);
    
    const handleRowClick = (customer: Customer) => {
        dispatch(setActiveCustomer(customer));
    }

    const handleNewCustomer = () => {
        dispatch(setActiveCustomer(null));
    };

    return {
        filter,
        setFilter,
        selected,
        handleRowClick,
        handleNewCustomer
    }
}