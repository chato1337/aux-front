import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Inventory } from '../models/Inventory.model.d';

export interface InventoryState {
    inventoryProduct: Inventory | null
}

const initialState: InventoryState = {
    inventoryProduct: null
}

export const inventorySlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {
        setInventory: (state: InventoryState, action: PayloadAction<Inventory>) => {
            state.inventoryProduct = action.payload
        },
        resetInventory: (state: InventoryState) => {
            state.inventoryProduct = null
        }
    }
})

export const { setInventory, resetInventory } = inventorySlice.actions

export default inventorySlice.reducer