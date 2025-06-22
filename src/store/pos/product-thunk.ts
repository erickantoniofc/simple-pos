import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Product } from "@/data/types/product";
import { productService } from "@/services/product.service";


import type { RootState } from "../store"; // adjust the import path as needed

export const fetchProducts = createAsyncThunk<Product[], void, { state: RootState }>(
  "products/fetchAll",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const alreadyLoaded = state.products.products.length > 0;
    if (alreadyLoaded) return state.products.products;
    try {
      const products = await productService.getAll();
      return products;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch products");
    }
  }
);

export const createProductThunk = createAsyncThunk<Product, Product>(
  "products/createProduct",
  async (product, thunkAPI) => {
    try {
      const created = await productService.create(product);
      return created; 
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to create product");
    }
  }
);


export const updateProductThunk = createAsyncThunk<
  Product,
  Product,
  { rejectValue: string }
>("products/updateProduct", async (product, thunkAPI) => {
  try {
    await productService.update(product);
    return product;
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to update product");
  }
});

export const toggleProductActiveThunk = createAsyncThunk<Product, string, { state: RootState }>(
  "products/toggleProduct",
  async (productId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const product = state.products.products.find(p => p.id === productId);

      if (!product) throw new Error("Producto no encontrado");

      const updated = await productService.toggle(product);
      return updated; // ✅ Este retorno es clave
    } catch (err) {
      return thunkAPI.rejectWithValue("Error al cambiar el estado del producto");
    }
  }
);
