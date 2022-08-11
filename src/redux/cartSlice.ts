import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart, ProductCart } from '../models/cart.model';
import { Customer } from '../models/User.model.d';

export interface CartState {
    products: ProductCart[],
	cart: Cart | null,
	pendingCarts: Cart[],
	customer: Customer | null
}

const initialState: CartState = {
    products: [],
	cart: null,
	pendingCarts: [],
	customer: null
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
        },
		setCart: (state: CartState, action: PayloadAction<Cart | null>) => {
			state.cart = action.payload
		},
		setPendigCarts: (state: CartState, action: PayloadAction<Cart>) => {
			state.pendingCarts = [ ...state.pendingCarts, action.payload ]
		},
		setCustomer: (state: CartState, action: PayloadAction<Customer | null>) => {
			state.customer = action.payload
		}
    }
})

export const { addProductCart, cleanProductCart, setCustomer } = cartSlice.actions

export default cartSlice.reducer
