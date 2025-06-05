import { useDispatch } from "react-redux";
import { useCallback, useMemo } from "react";
import {
  updateItemQuantity,
  removeItemFromActiveSale,
  resetActiveSale,
  updateItemPrice,
} from "@/store/pos/sale-slice";
import type { Sale } from "@/mocks/types/sale";
import { DocumentType } from "@/mocks/types/sale";

export const useCartSaleLogic = (sale: Sale | null) => {
  const dispatch = useDispatch();

  const saleItems = sale?.saleItems ?? [];
  const totalRaw = sale?.total ?? 0;
  const documentType = sale?.documentType ?? DocumentType.FE;

  const subtotal = documentType === DocumentType.FE ? totalRaw : totalRaw / 1.13; 
  const tax = documentType === DocumentType.FE ? 0 : subtotal * 0.13;
  const total = subtotal + tax;

  const handleQuantityChange = useCallback((productId: string, quantity: number) => {
    dispatch(updateItemQuantity({ productId, quantity }));
  }, [dispatch]);

  const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, productId: string) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      handleQuantityChange(productId, newQuantity);
    }
  }, [handleQuantityChange]);

  const onRemoveItem = useCallback((productId: string) => {
    dispatch(removeItemFromActiveSale(productId));
  }, [dispatch]);

  const clearCart = useCallback(() => {
    dispatch(resetActiveSale());
  }, [dispatch]);

  const updatePrice = useCallback((productId: string, e: React.ChangeEvent<HTMLInputElement> ) => {
    const value = e.target.value.trim();
    const newPrice = parseFloat(value);
    const isValid = /^\d+(\.\d{1,2})?$/.test(value);
    if (!isNaN(newPrice) && newPrice >= 0 && isValid) {
        dispatch(updateItemPrice({ productId: productId, price: newPrice }));
    }
  }, [dispatch]);

  return {
    saleItems,
    documentType,
    subtotal,
    tax,
    total,
    handleQuantityChange,
    onInputChange,
    onRemoveItem,
    clearCart,
    updatePrice,
  };
};