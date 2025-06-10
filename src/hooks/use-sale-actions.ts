import { useDispatch, useSelector } from "react-redux";
import { useState, useCallback } from "react";
import { toast } from "sonner";
import equal from "fast-deep-equal";
import { nanoid } from "nanoid";

import {
  addSale,
  updateSale,
  updateActiveSale,
  resetActiveSale,
  setActiveSale,
  cancelSaleById,
} from "@/store/pos/sale-slice";

import type { RootState } from "@/store/store";
import { DocumentStatus, type Sale } from "@/data/types/sale";
import { validateSaleForSave } from "@/helpers/validate-sale-for-save";
import { validateSaleForSend } from "@/helpers/validate-sale-for-send";
import { useNavigate } from "react-router-dom";

export const useSaleActions = () => {
  const dispatch = useDispatch();
  const sale = useSelector((state: RootState) => state.sales.activeSale);
  const sales = useSelector((state: RootState) => state.sales.sales);
  const navigate = useNavigate();
  const [showDiscardDialog, setShowDiscardDialog] = useState(false);
  const [discardConfirmed, setDiscardConfirmed] = useState(false);    
  const  [showSaleSummary, setShowSaleSummary] = useState(false);
  const isNew = !sale?._id;

  const handleNewSaleFromSalesTable = () => {
    dispatch(setActiveSale());
    setShowSaleSummary(false);
    navigate("/pos");
  };

  const handleRowClick = (sale: Sale) => {
    if(sale?.status === DocumentStatus.SAVE) {
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

  
  const onCancelSaleAction = (saleId: string) => {
    dispatch(cancelSaleById(saleId));
    toast.success("El documento ha sido anulado exitosamente");
    setShowSaleSummary(false);
  }

  const handleSave = () => {
    if (!sale) return;

    const errors = validateSaleForSave(sale);
    if (errors.length) {
      toast.error(errors[0]);
      return;
    }

    const saleToSave = {
      ...sale,
      status: DocumentStatus.SAVE,
      _id: sale._id ?? nanoid(),
    };
    const now = new Date().getTime().toString();  
    if (isNew) {
      dispatch(addSale({ ...saleToSave, date: now }));
    } else {
      dispatch(updateSale(saleToSave));
    }

    dispatch(updateActiveSale({ ...saleToSave }));
    toast.success("Venta guardada correctamente.");
  };

  const handleSend = (): Sale | null => {
  if (!sale) return null;
  const errors = validateSaleForSend(sale);
  if (errors.length) {
    toast.error(errors[0]);
    return null;
  }

  const now = new Date().getTime().toString();
  const saleToSend = {
    ...sale,
    status: DocumentStatus.SEND,
    _id: sale._id ?? nanoid(),
  };

  if (isNew) {
    dispatch(addSale({ ...saleToSend, date: now }));
  } else {
    dispatch(updateSale({ ...saleToSend, sendDate: now }));
  }

  dispatch(resetActiveSale());
  toast.success("Venta enviada correctamente.");

  return saleToSend;
};

  const checkUnsavedChanges = useCallback(() => {
    if (!sale) return false;
    const original = sales.find((s) => s._id === sale._id);
    if (!original) return true;

    const { date, sendDate, ...restSale } = sale;
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
    handleCloseSaleSummary
  };
};