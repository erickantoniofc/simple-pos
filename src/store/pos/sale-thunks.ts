import { createAsyncThunk } from "@reduxjs/toolkit";

import type { RootState } from "@/store/store";
import { DocumentStatus, DocumentType, type Sale } from "@/data/types/sale";
import { addSale, updateSale, resetActiveSale, updateActiveSale, cancelSaleById } from "@/store/pos/sale-slice";
import { saleToFe } from "@/helpers/sale-to-fe";
import { dteService } from "@/services/dte.service";
import { v4 as uuidv4 } from "uuid";

export const sendSaleThunk = createAsyncThunk<
  Sale,
  Sale,
  { state: RootState }
>("sales/send", async (sale, { getState, dispatch, rejectWithValue }) => {
  try {
    const state = getState();
    const activePos = state.branches.activePos;
    const activeBranch = state.branches.activeBranch;
    const company = state.company.company;
    const isNew = !sale?._id;

    if (!sale) return rejectWithValue("No hay venta activa");


    const now = Date.now().toString();
    const saleToSend: Sale = {
      ...sale,
      _id: sale._id ?? uuidv4(),
      status: DocumentStatus.SEND,
      sendDate: now,
      date: sale.date ?? now,
      posId: sale.posId ?? activePos.id
    };

    if (sale.documentType === DocumentType.FE) {
      const dte = saleToFe(saleToSend, activeBranch, activePos, "000000000000001", company);

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

    if (isNew) {
      dispatch(addSale(saleToSend));
    } else {
      dispatch(updateSale(saleToSend));
    }

    dispatch(resetActiveSale());
    return saleToSend;
  } catch {
    return rejectWithValue("Ocurrió un error inesperado al enviar la venta");
  }
});

export const saveSaleThunk = createAsyncThunk<
  Sale,                      // valor de retorno
  Sale,                      // argumento (ya validado)
  { state: RootState }
>("sales/save", async (sale, { getState, dispatch }) => {
  const state = getState();
  const activePos = state.branches.activePos;
  const isNew = !sale._id;
  const now = Date.now().toString();

  const saleToSave: Sale = {
    ...sale,
    _id: sale._id ?? uuidv4(),
    status: DocumentStatus.SAVE,
    posId: sale.posId ?? activePos.id,
    date: sale.date ?? now,
  };

  if (isNew) {
    dispatch(addSale(saleToSave));
  } else {
    dispatch(updateSale(saleToSave));
  }

  dispatch(updateActiveSale(saleToSave));

  return saleToSave;
});

export const cancelSaleThunk = createAsyncThunk<
  string, // id de la venta cancelada
  string, // recibe saleId
  { state: RootState }
>("sales/cancel", async (saleId, { dispatch }) => {

  dispatch(cancelSaleById(saleId));
  return saleId;
});
