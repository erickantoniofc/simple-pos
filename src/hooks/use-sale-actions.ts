import { useDispatch, useSelector } from "react-redux";
import { useState, useCallback } from "react";
import { toast } from "sonner";
import equal from "fast-deep-equal";

import {
  updateActiveSale,
  resetActiveSale,
  setActiveSale,
} from "@/store/pos/sale-slice";

import type { RootState, AppDispatch } from "@/store/store";
import { DocumentStatus, type Sale } from "@/data/types/sale";
import { validateSaleForSave } from "@/helpers/validate-sale-for-save";
import { validateSaleForSend } from "@/helpers/validate-sale-for-send";
import { useNavigate } from "react-router-dom";
import { cancelSaleThunk, saveSaleThunk, sendSaleThunk } from "@/store/pos/sale-thunks";

export const useSaleActions = () => {
  const dispatch: AppDispatch = useDispatch();
  const sale = useSelector((state: RootState) => state.sales.activeSale);
  const {saveLoading} = useSelector((state: RootState) => state.sales);
  const sales = useSelector((state: RootState) => state.sales.sales);
  const navigate = useNavigate();
  const [showDiscardDialog, setShowDiscardDialog] = useState(false);
  const [, setDiscardConfirmed] = useState(false);
  const [showSaleSummary, setShowSaleSummary] = useState(false);

  const handleNewSaleFromSalesTable = () => {
    dispatch(setActiveSale());
    setShowSaleSummary(false);
    navigate("/pos");
  };

  const handleRowClick = (sale: Sale) => {
    if (sale?.status === DocumentStatus.SAVE) {
      navigate("/pos")
      dispatch(setActiveSale());
      dispatch(updateActiveSale(sale));
    }
    else {
      dispatch(updateActiveSale(sale));
      setShowSaleSummary(true);
    }
  }

  const handleCloseSaleSummary = () => {
    setShowSaleSummary(false);
    dispatch(setActiveSale());
  }


  const onCancelSaleAction = async (saleId: string) => {
    try {
      await dispatch(cancelSaleThunk(saleId)).unwrap();
      toast.success("El documento ha sido anulado exitosamente");
      setShowSaleSummary(false);
    } catch {
      toast.error("Ocurrió un error al anular el documento");
    }
  };

  const handleSave = async () => {
    if (!sale) return;

    const errors = validateSaleForSave(sale);
    if (errors.length > 0) {
      toast.error(errors[0]);
      return;
    }

    try {
      const saved = await dispatch(saveSaleThunk(sale)).unwrap();
      toast.success("Venta guardada correctamente.");
    } catch (err) {
      toast.error(typeof err === "string" ? err : "Error al guardar la venta.");
    }
  };

  const handleSend = async (): Promise<Sale | null> => {
    if (!sale) return null;

    const errors = validateSaleForSend(sale);
    if (errors.length > 0) {
      toast.error(errors[0]);
      return null;
    }

    try {
      const result = await dispatch(sendSaleThunk(sale)).unwrap() as Sale;
      toast.success("Venta enviada correctamente.");
      return result; // ✅ retorna la Sale
    } catch (err) {
      toast.error(typeof err === "string" ? err : "Error al enviar la venta.");
      return null;
    }
  };

  const checkUnsavedChanges = useCallback(() => {
    if (!sale) return false;
    const original = sales.find((s) => s.id === sale.id);
    if (!original) return true;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { date, sendDate, ...restSale } = sale;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { date: origDate, sendDate: origSendDate, ...restOriginal } = original;

    return !equal(restSale, restOriginal);
  }, [sale, sales]);

  const handleNewSale = () => {
    const isDirty = checkUnsavedChanges();

    if (isDirty) {
      setShowDiscardDialog(true);
      return;
    }

    dispatch(resetActiveSale());
    dispatch(setActiveSale());
  };

  const confirmDiscard = () => {
    setShowDiscardDialog(false);
    setDiscardConfirmed(true);
    dispatch(resetActiveSale());
    dispatch(setActiveSale());
  };

  return {
    handleSave,
    handleSend,
    handleNewSale,
    showDiscardDialog,
    setShowDiscardDialog,
    confirmDiscard,
    handleNewSaleFromSalesTable,
    setShowSaleSummary,
    showSaleSummary,
    handleRowClick,
    onCancelSaleAction,
    sale,
    sales,
    handleCloseSaleSummary,
    saveLoading
  };
};
