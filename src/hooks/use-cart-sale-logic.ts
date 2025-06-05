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
  const documentType = sale?.documentType ?? DocumentType.FE;

  const subtotal = useMemo(() => {
    const rawSubtotal = saleItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return rawSubtotal / 1.13;
  }, [saleItems]);

  const tax = useMemo(() => {
    return documentType === DocumentType.CCF ? subtotal * 0.13 : 0;
  }, [documentType, subtotal]);

  const total = useMemo(() => subtotal + tax, [subtotal, tax]);

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
    const newPrice = parseFloat(e.target.value);
    if (!isNaN(newPrice) && newPrice >= 0) {
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