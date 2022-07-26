import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductCart } from '../models/cart.model';

export interface CartState {
    products: ProductCart[]
}

const initialState: CartState = {
    products: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProductCart: (state: CartState, action: PayloadAction<ProductCart>) => {
            state.products = [ ...state.products, action.payload ]
        },
        cleanProductCart: (state: CartState, action: PayloadAction<ProductCart[]>) => {
            state.products = action.payload
        }
    }
})

export const { addProductCart, cleanProductCart } = cartSlice.actions

export default cartSlice.reducer