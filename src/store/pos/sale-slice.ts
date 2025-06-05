import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Sale } from '@/mocks/types/sale';
import { mockSales } from '@/mocks/sales';
import type { SaleItem } from '@/mocks/types/sale-item';

interface SalesState {
    sales: Sale[];
    activeSale: Sale | null;
}

const initialState: SalesState = {
    sales: mockSales,
    activeSale: null,
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
                    sale._id === action.payload._id
                ? {...sale, ...action.payload}
                : sale
            ); 
        },
        setActiveSale: (state) => {
            state.activeSale = {
               saleItems: [],
               customer: undefined,
               documentType: 1,
               state: 1,
               documentNumber: '',
               total: 0
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
                item => item.product._id === action.payload.product._id
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
            const item = state.activeSale.saleItems.find(i => i.product._id === action.payload.productId);
            if (item) {
                item.quantity = action.payload.quantity;
                item.subtotal = item.quantity * item.price;
                item.total = item.subtotal - item.discount;
            }
            state.activeSale.total = state.activeSale.saleItems.reduce((acc, item) => acc + item.total, 0);
        },
        removeItemFromActiveSale: (state, action: PayloadAction<string>) => {
            if (!state.activeSale) return;
            state.activeSale.saleItems = state.activeSale.saleItems.filter(item => item.product._id !== action.payload);
            state.activeSale.total = state.activeSale.saleItems.reduce((acc, item) => acc + item.total, 0);
        },
        resetActiveSale: (state) => {
            state.activeSale = null;
        },
        updateItemPrice: (state, action: PayloadAction<{ productId: string; price: number }>) => {
            if (!state.activeSale) return;
            const item = state.activeSale.saleItems.find(i => i.product._id === action.payload.productId);
            if (item) {
                item.price = action.payload.price;
                item.subtotal = item.price * item.quantity;
                item.total = item.subtotal - item.discount;
            }
            state.activeSale.total = state.activeSale.saleItems.reduce((acc, item) => acc + item.total, 0);
        }
        
    }
});

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
} = saleSlice.actions;
export default saleSlice.reducer;