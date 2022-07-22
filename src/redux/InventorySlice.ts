import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Category, Product } from '../models/Inventory.model.d';

export interface InventoryState {
    inventoryProduct: Product | null;
    categorySelected: Category | null;
}

const initialState: InventoryState = {
    inventoryProduct: null,
    categorySelected: null
}

export const inventorySlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {
        setInventory: (state: InventoryState, action: PayloadAction<Product>) => {
            state.inventoryProduct = action.payload
        },
        resetInventory: (state: InventoryState) => {
            state.inventoryProduct = null
        },
        setCategorySelected: (state: InventoryState, action: PayloadAction<Category | null>) => {
            state.categorySelected = action.payload
        }
    }
})

export const { setInventory, resetInventory, setCategorySelected } = inventorySlice.actions

export default inventorySlice.reducer