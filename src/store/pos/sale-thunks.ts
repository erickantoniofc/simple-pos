import { createAsyncThunk } from "@reduxjs/toolkit";

import type { RootState } from "@/store/store";
import { DocumentStatus, DocumentType, type Sale } from "@/data/types/sale";
import { addSale, resetActiveSale, cancelSaleById } from "@/store/pos/sale-slice";
import { saleToFe } from "@/helpers/sale-to-fe";
import { dteService } from "@/services/dte.service";
import { createSale, getAllSales, updateSale } from "@/services/sale.service";

export const sendSaleThunk = createAsyncThunk<
  Sale,
  Sale,
  { state: RootState }
>("sales/send", async (sale, { getState, dispatch, rejectWithValue }) => {
  try {
    console.log('Sale thunk')
    const state = getState();
    const activePos = state.branches.activePos;
    const activeBranch = state.branches.activeBranch;
    const company = state.company.company;
    const isNew = !sale?.id;

    if (!sale) return rejectWithValue("No hay venta activa");
    const posId = sale.posId?.trim() || activePos?.id?.trim();
    if (!posId) {
        return rejectWithValue("Debe seleccionar un punto de venta válido");
      }

    const now = new Date().toISOString();
    const saleToSend: Sale = {
      ...sale,
      status: DocumentStatus.SEND,
      sendDate: now,
      date: sale.date ?? now,
      posId
    };

    if (sale.documentType === DocumentType.FE) {
      const dte = saleToFe(saleToSend, activeBranch, activePos, "000000000000001", company);
      console.log(dte)
      const validationErrors = dteService.validateDTE(dte);
      if (validationErrors.length > 0) {
        return rejectWithValue(`DTE validation failed: ${validationErrors.join(', ')}`);
      }

      const signResult = await dteService.signDTE(dte);
      
      if (!signResult.success) {
        return rejectWithValue(`Failed to sign DTE: ${signResult.error}`);
      }

      saleToSend.signedDTE = signResult.signedDTE;
    }

    let persistedSale: Sale;
    if (isNew) {
      persistedSale = await createSale(saleToSend);
    } else {
      persistedSale = await updateSale(saleToSend);
    }

    dispatch(resetActiveSale());
    return persistedSale;
  } catch(error) {
    console.log("Error al enviar la venta:", error);
    return rejectWithValue("Ocurrió un error inesperado al enviar la venta");
  }
});

export const saveSaleThunk = createAsyncThunk<
  Sale,   // lo que retorna
  Sale,   // lo que recibe
  { state: RootState }
>("sales/save", async (sale, { getState, rejectWithValue }) => {
  const state = getState();
  const activePos = state.branches.activePos;
  const isNew = !sale.id;
  const now = new Date().toISOString();
  const posId = sale.posId?.trim() || activePos?.id?.trim();

  if (!posId) {
    return rejectWithValue("Debe seleccionar un punto de venta válido");
  }

  const saleToSave: Sale = {
    ...sale,
    status: DocumentStatus.SAVE,
    posId,
    date: sale.date ?? now,
  };

console.log("Saving sale:", saleToSave);
  try {
    const result = isNew
      ? await createSale(saleToSave)
      : await updateSale(saleToSave);

    return result;
  } catch (err: any) {
    return rejectWithValue(err.message ?? "Error al guardar la venta");
  }
});


export const cancelSaleThunk = createAsyncThunk<
  string, // id de la venta cancelada
  string, // recibe saleId
  { state: RootState }
>("sales/cancel", async (saleId, { dispatch }) => {

  dispatch(cancelSaleById(saleId));
  return saleId;
});

export const getAllSalesThunk = createAsyncThunk<Sale[]>(
  "sales/getAll",
  async (_, { rejectWithValue }) => {
    try {
      return await getAllSales();
    } catch (err: any) {
      return rejectWithValue(err.message || "Error al cargar las ventas");
    }
  }
);
