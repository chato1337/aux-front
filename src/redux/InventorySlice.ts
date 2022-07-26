import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Category, Product } from '../models/Inventory.model.d';
import { Supplier } from '../models/Supplier.model.d';

export interface InventoryState {
    productSelected: Product | null;
    categorySelected: Category | null;
    supplierSelected: Supplier | null;
}

const initialState: InventoryState = {
    productSelected: null,
    categorySelected: null,
    supplierSelected: null
}

export const inventorySlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {
        setInventory: (state: InventoryState, action: PayloadAction<Product | null>) => {
            state.productSelected = action.payload
        },
        resetInventory: (state: InventoryState) => {
            state.productSelected = null
        },
        setCategorySelected: (state: InventoryState, action: PayloadAction<Category | null>) => {
            state.categorySelected = action.payload
        },
        setSupplierSelected: (state: InventoryState, action: PayloadAction<Supplier | null>) => {
            state.supplierSelected = action.payload
        }
    }
})

export const { setInventory, resetInventory, setCategorySelected, setSupplierSelected } = inventorySlice.actions

export default inventorySlice.reducer