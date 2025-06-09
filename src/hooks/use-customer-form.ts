import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { customerSchema } from "@/data/schemas/customer-schema";
import type { z } from "zod";
import { type RootState } from "@/store/store";


import {
  addCustomer,
  updateCustomer,
  setActiveCustomer,
  toggleCustomerActive,
} from "@/store/pos/customer-slice";
import { toast } from "sonner";


import { formatDui, formatNit, formatNrc } from "@/helpers";

export type CustomerFormValues = z.infer<typeof customerSchema>;

/**
 * Custom hook to manage the customer form logic.
 * It handles state initialization, value formatting,
 * data transformation, and submission via Redux actions.
 */
export const useCustomerForm = () => {
  const dispatch = useDispatch();

  // Get the currently selected customer from Redux state
  const selected = useSelector(
    (state: RootState) => state.customers.selectedCustomer
  );

  // Initialize react-hook-form with schema-based validation and default values
  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      department: "",
      municipality: "",
      dui: "",
      nit: "",
      nrc: "",
      activity: undefined,
      sendMethod: undefined,
    },
  });

  /**
   * Populate form when a customer is selected,
   * or reset it to blank when creating a new one.
   */
  useEffect(() => {
    if (selected) {
      const convertSendMethod = (method?: number): ("email" | "whatsapp")[] => {
        if (method === 1) return ["email"];
        if (method === 2) return ["whatsapp"];
        if (method === 3) return ["email", "whatsapp"];
        return [];
      };

      form.reset({
        ...selected,
        sendMethod: convertSendMethod(selected.sendMethod)
      });
    } else {
      form.reset();
    }
  }, [selected]);

    const open = selected !== undefined;

    const handleClose = () => dispatch(setActiveCustomer(undefined));

    const handleToggleActive = () => {
      try {
        if (selected?._id) {
          dispatch(toggleCustomerActive(selected._id));
          const message = selected.active ? "deshabilitado" : "habilitado";
          toast.success(`El cliente ha sido ${message} exitosamente`); 
        }
        handleClose();
        
      } catch (error) {
        const message = selected?.active ? "deshabilitar" : "habilitar";
        toast.error(`Error al ${message} el cliente`);
        console.log(error);
      }
    };


  /**
   * Convert selected sendMethod values from string[] to numeric code.
   */
  const getSendMethodValue = (arr?: string[]): number | undefined => {
    if (!arr || arr.length === 0) return undefined;
    const hasEmail = arr.includes("email");
    const hasWhatsapp = arr.includes("whatsapp");

    if (hasEmail && hasWhatsapp) return 3;
    if (hasEmail) return 1;
    if (hasWhatsapp) return 2;
    return undefined;
  };

  /**
   * Submit handler that dispatches create or update actions based on selection.
   */
  const onSubmit = (data: CustomerFormValues) => {
    try {
      const base = {
        ...selected,
        ...data,
        sendMethod: getSendMethodValue(data.sendMethod),
        activity: data.activity ? Number(data.activity) : undefined,
        // Change logic when connecting to backend
        _id: selected?._id || uuidv4(),
        active: true,
      };
  
      if (selected) {
        dispatch(updateCustomer(base));
        toast.success("Cliente actualizado exitosamente");
      } else {
        dispatch(addCustomer(base));
        toast.success("Cliente creado exitosamente");

      }
  
      dispatch(setActiveCustomer(undefined)); // close dialog after saving
      
    } catch (error) {
      
      toast.error("Hubo un error al guardar el cliente");
    }
  };

  // Expose all necessary logic and helpers for use in the form component
  return {
    form,
    selected,
    onSubmit,
    formatDui,
    formatNit,
    formatNrc,
    open,
    handleToggleActive,
    handleClose
  };
};