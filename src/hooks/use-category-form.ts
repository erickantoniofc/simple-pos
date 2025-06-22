import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema } from "@/data/schemas/category-schema";
import type { Category } from "@/data/types/category";
import { setActiveCategory, clearCategoryErrors } from "@/store/pos/category-slice";
import { saveCategoryThunk, toggleCategoryActiveThunk } from "@/store/pos/category-thunk";
import type { AppDispatch, RootState } from "@/store/store";
import { toast } from "sonner";

export type CategoryFormInput = z.input<typeof categorySchema>;

export const useCategoryForm = (selected: Category | null | undefined) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, toggleLoading, error } = useSelector((state: RootState) => state.categories);

  const form = useForm<CategoryFormInput>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: ""
    },
  });

  useEffect(() => {
    if (selected) {
      form.reset({ ...selected });
    } else {
      form.reset();
    }
  }, [selected]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const open = selected !== undefined;

  const handleClose = () => {
    dispatch(clearCategoryErrors());
    dispatch(setActiveCategory(undefined));
  };

  const handleToggleActive = async () => {
    if (!selected?.id) return;

    const action = selected.active ? "deshabilitar" : "habilitar";
    const actionPast = selected.active ? "deshabilitado" : "habilitado";

    try {
      await dispatch(toggleCategoryActiveThunk(selected.id)).unwrap();
      toast.success(`La categoría ha sido ${actionPast} exitosamente`);
      handleClose();
    } catch (err) {
      toast.error(`Error al ${action} la categoría`);
    }
    finally {
      dispatch(clearCategoryErrors());
    }
  };

  const onSubmit = async (data: CategoryFormInput) => {
    try {
      const base: Category = {
        ...selected,
        ...data,
        active: true,
      };

      await dispatch(saveCategoryThunk(base)).unwrap();

      toast.success(selected ? "Categoría modificada exitosamente" : "Categoría creada exitosamente");
      dispatch(setActiveCategory(undefined));
    } catch (error) {
      toast.error("Hubo un error al guardar la categoría");
    }
    finally {
      dispatch(clearCategoryErrors());
    }
  };

  return {
    form,
    selected,
    open,
    loading,
    toggleLoading,
    onSubmit,
    handleToggleActive,
    handleClose,
  };
};