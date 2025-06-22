import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { DocumentStatus, type Sale, type SalesState } from '@/data/types/sale';
import type { SaleItem } from '@/data/types/sale-item';
import { getAllSalesThunk, saveSaleThunk, sendSaleThunk } from './sale-thunks';



const initialState: SalesState = {
    sales: [],
    activeSale: null,
    loading: false,
    saveLoading: false,
    sendLoading: false,
    error: null,
    listLoading: false
}

export const saleSlice = createSlice({
    name: 'sales',
    initialState,
    reducers: {
        addSale: (state, action: PayloadAction<Sale>) => {
            state.sales.push(action.payload);
        },
        updateSale: (state, action: PayloadAction<Sale>) => {
            state.sales = state.sales.map(
                sale => 
                    sale.id === action.payload.id
                ? {...sale, ...action.payload}
                : sale
            ); 
        },
        setActiveSale: (state) => {
            state.activeSale = {
               saleItems: [],
               posId: '',
               customer: undefined,
               documentType: 1,
               status: DocumentStatus.INIT,
               documentNumber: '',
               total: 0,
               paymentMethod: "01",
               transactionTerm: "1",
               paymentTerm: [0,  "01"]
            };
        },
        updateActiveSale: (state, action: PayloadAction<Partial<Sale>>) => {
            if (state.activeSale) {
                Object.assign(state.activeSale, action.payload);
            }
        },
        addItemToActiveSale: (state, action: PayloadAction<SaleItem>) => {
            if (!state.activeSale) return;

            const existingItem = state.activeSale.saleItems.find(
                item => item.product.id === action.payload.product.id
            );

            if(existingItem) {
                existingItem.quantity += action.payload.quantity;
                existingItem.subtotal = existingItem.price * existingItem.quantity;
                existingItem.total = existingItem.subtotal - existingItem.discount;
            }
            else {
                state.activeSale.saleItems.push(action.payload);
            }

            state.activeSale.total = state.activeSale.saleItems.reduce((acc, item) => acc + item.total, 0);
        },
        updateItemQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
            if (!state.activeSale) return;
            const item = state.activeSale.saleItems.find(i => i.product.id === action.payload.productId);
            if (item) {
                item.quantity = action.payload.quantity;
                item.subtotal = item.quantity * item.price;
                item.total = item.subtotal - item.discount;
            }
            state.activeSale.total = state.activeSale.saleItems.reduce((acc, item) => acc + item.total, 0);
        },
        removeItemFromActiveSale: (state, action: PayloadAction<string>) => {
            if (!state.activeSale) return;
            state.activeSale.saleItems = state.activeSale.saleItems.filter(item => item.product.id !== action.payload);
            state.activeSale.total = state.activeSale.saleItems.reduce((acc, item) => acc + item.total, 0);
        },
        resetActiveSale: (state) => {
            state.activeSale = null;
        },
        updateItemPrice: (state, action: PayloadAction<{ productId: string; price: number }>) => {
            if (!state.activeSale) return;
            const item = state.activeSale.saleItems.find(i => i.product.id === action.payload.productId);
            if (item) {
                item.price = action.payload.price;
                item.subtotal = item.price * item.quantity;
                item.total = item.subtotal - item.discount;
            }
            state.activeSale.total = state.activeSale.saleItems.reduce((acc, item) => acc + item.total, 0);
        },
        removeSale: (state, action: PayloadAction<string>) => {
            state.sales = state.sales.filter(sale => sale.id !== action.payload);
        },
        clearSaleItems: (state) => {
        if (state.activeSale) {
            state.activeSale.saleItems = [];
            state.activeSale.total = 0;
        }
        },
        cancelSaleById: (state, action: PayloadAction<string>) => {
        const saleId = action.payload;
        const sale = state.sales.find((s) => s.id === saleId);
        if (sale) {
            sale.status = DocumentStatus.CANCELLED;
            sale.cancelledDate = Date.now().toString(); // o new Date().getTime()
        }
},
        
    },
    extraReducers: (builder) => {
  builder
    // Carga de ventas
    .addCase(getAllSalesThunk.pending, (state) => {
      state.listLoading = true;
      state.error = null;
    })
    .addCase(getAllSalesThunk.fulfilled, (state, action) => {
      state.listLoading = false;
      state.sales = action.payload;
    })
    .addCase(getAllSalesThunk.rejected, (state, action) => {
      state.listLoading = false;
      state.error = action.payload as string;
    })

    // Guardar o actualizar venta
    .addCase(saveSaleThunk.fulfilled, (state, action) => {
      state.saveLoading = false;
      const index = state.sales.findIndex(s => s.id === action.payload.id);
      if (index >= 0) {
        state.sales[index] = action.payload;
      } else {
        state.sales.push(action.payload);
      }
      state.activeSale = action.payload;
    })
    .addCase(saveSaleThunk.pending, (state) => {
      state.saveLoading = true;
      state.error = null;
    })
    .addCase(saveSaleThunk.rejected, (state, action) => {
      state.saveLoading = false;
      state.error = action.payload as string;
    }
    )

    // Enviar venta
    .addCase(sendSaleThunk.fulfilled, (state) => {
        state.sendLoading = false;
    })
    .addCase(sendSaleThunk.pending, (state) => {
        state.sendLoading = true;
        state.error = null;
    })
    .addCase(sendSaleThunk.rejected, (state, action) => {
        state.sendLoading = false;
        state.error = action.payload as string;
    }
    );
}
})

export const {
    updateSale, 
    addSale, 
    setActiveSale, 
    updateActiveSale,
    addItemToActiveSale,
    removeItemFromActiveSale,
    resetActiveSale,
    updateItemQuantity,
    updateItemPrice,
    removeSale,
    clearSaleItems,
    cancelSaleById
} = saleSlice.actions;
export default saleSlice.reducer;