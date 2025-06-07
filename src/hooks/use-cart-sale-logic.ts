import { useDispatch } from "react-redux";
import { useCallback } from "react";
import {
  updateItemQuantity,
  removeItemFromActiveSale,
  resetActiveSale,
  updateItemPrice,
} from "@/store/pos/sale-slice";
import type { Sale } from "@/data/types/sale";
import { DocumentType } from "@/data/types/sale";

/**
 * Custom hook to encapsulate business logic related to a shopping cart
 * tied to an active sale in the POS system.
 */
export const useCartSaleLogic = (sale: Sale | null) => {
  const dispatch = useDispatch();

  // Extract basic sale information or provide defaults
  const saleItems = sale?.saleItems ?? [];
  const totalRaw = sale?.total ?? 0;
  const documentType = sale?.documentType ?? DocumentType.FE;

  // Calculate subtotal and tax depending on document type (FE or CCFC)
  const subtotal = documentType === DocumentType.FE ? totalRaw : totalRaw / 1.13; 
  const tax = documentType === DocumentType.FE ? 0 : subtotal * 0.13;
  const total = subtotal + tax;

  /**
   * Updates the quantity of a product in the cart.
   */
  const handleQuantityChange = useCallback((productId: string, quantity: number) => {
    dispatch(updateItemQuantity({ productId, quantity }));
  }, [dispatch]);

  /**
   * Handles change event from quantity input fields.
   * Only allows positive integers >= 1.
   */
  const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, productId: string) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      handleQuantityChange(productId, newQuantity);
    }
  }, [handleQuantityChange]);

  /**
   * Removes a product from the cart.
   */
  const onRemoveItem = useCallback((productId: string) => {
    dispatch(removeItemFromActiveSale(productId));
  }, [dispatch]);

  /**
   * Clears the entire cart (resets active sale).
   */
  const clearCart = useCallback(() => {
    dispatch(resetActiveSale());
  }, [dispatch]);

  /**
   * Updates the unit price of a product in the cart.
   * Only allows numbers with up to 2 decimal places.
   */
  const updatePrice = useCallback((productId: string, e: React.ChangeEvent<HTMLInputElement> ) => {
    const value = e.target.value.trim();
    const newPrice = parseFloat(value);
    const isValid = /^\d+(\.\d{1,2})?$/.test(value);
    if (!isNaN(newPrice) && newPrice >= 0 && isValid) {
        dispatch(updateItemPrice({ productId: productId, price: newPrice }));
    }
  }, [dispatch]);

  // Return relevant values and handlers for use in cart components
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