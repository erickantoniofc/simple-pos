import { createAsyncThunk } from "@reduxjs/toolkit";
import { addProduct, updateProduct, toggleProductActive } from "./product-slice";
import type { Product } from "@/data/types/product";

export const saveProductThunk = createAsyncThunk<
  Product, 
  Product
>("products/save", async (product, { dispatch }) => {
  if (product._id) {
    dispatch(updateProduct(product));
  } else {
    dispatch(addProduct(product));
  }
  return product;
});

export const toggleProductActiveThunk = createAsyncThunk<
  string, 
  string
>("products/toggle-active", async (productId, { dispatch }) => {
  dispatch(toggleProductActive(productId));
  return productId;
});