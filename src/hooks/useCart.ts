import { useInventory } from "./useInventory"
import { Product } from '../models/Inventory.model.d';
import { ProductCart } from "../models/cart.model";
import { useDispatch, useSelector } from 'react-redux';
import { addProductCart, cleanProductCart } from "../redux/cartSlice";
import { ChangeEvent, useState } from "react";
import { RootState } from "../redux/store";
import { setActionForm, setModal } from "../redux/settingsSlice";
import { useMutation } from 'react-query';
import { StockService } from '../services/StockService';
import { ApiError } from '../utils/index';
import { useForm } from 'react-hook-form';
import { useToast } from "./useToast";
import { Bill } from '../models/Stock.model.d';

export const useCart = () => {
    const { data, isSuccess, handleModal, modalIsOpen, closeModal } = useInventory(5)
    const dispatch = useDispatch()
    const [ quantity, setQuantity ] = useState(0)
    const [ cash, setCash ] = useState(0)
    const products = useSelector((state: RootState) => state.cart.products)
    const { setError } = useForm()
    const { notify, notifyError } = useToast()
    const [ showForm, setShowForm ] = useState(true)

	const total = products.reduce(
		(prev, item: ProductCart) => item.subtotal + prev, 0
	);

    const handleSubmitPay = () => {
        mutate(products)
    }

    const { mutate } = useMutation(StockService.addStock, {
        onSuccess(data, variables, context) {
            setShowForm(false)
            const res: Bill = data
            const msg = `the transaction #${res.id} by ${res.total} $ was created succesfully`
            notify(msg)
        },
        onError(error) {
            ApiError.getErrorMsg(error, setError, notifyError)
        },
    })

    const handleChangePay = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "") {
            setCash(0)
        }else {
            const parseQuantity = parseInt(e.target.value)
            setCash(parseQuantity)
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const parseQuantity = parseInt(e.target.value)
        setQuantity(parseQuantity)
    }

    const handlePay = () => {
        setShowForm(true)
        dispatch(setActionForm("pay"))
        dispatch(setModal(true))
    }

    const handleRemoveCart = (product: ProductCart) => {
        const removeCartProducts = products.filter((el: ProductCart) => el.id !== product.id)
        dispatch(cleanProductCart(removeCartProducts))
    }

    const handleCancelOrder = () => {
        if (products.length > 0) {
            dispatch(cleanProductCart([]))
        }
    }

    const handleAddCart = (product: Product) => {
        const cartItem: ProductCart = {
            id: product.id,
            name: product.name,
            quantity: quantity,
            unit_price: product.price,
            subtotal: product.price * quantity
        }

        const alreadyExist = products.some((el: ProductCart) => el.id === product.id)

        if (quantity > 0 && !alreadyExist) {
            dispatch(addProductCart(cartItem))
            setQuantity(0)

        //if product already exist in cart
        }else if(quantity > 0 && alreadyExist) {
            //get stored product in products list
            const storedProduct = products.find((item: ProductCart) => item.id === product.id)

            //cast quantity stored & sum with older
            const castQuantity = storedProduct?.quantity ?? 0
            const sumQuantity = quantity + castQuantity

            //updated product with quantity & subtotal
            const updateCartItem: ProductCart = { ...cartItem, quantity: sumQuantity, subtotal: product.price * sumQuantity }

            //get products without product exists
            const cleanProducts = products.filter((item: ProductCart) => item.id !== product.id)

            dispatch(cleanProductCart([...cleanProducts, updateCartItem]))
            setQuantity(0)
        }
    }

    return {
        data,
        isSuccess,
        handleAddCart,
        quantity,
        handleChange,
        handleRemoveCart,
        handleModal,
        modalIsOpen,
        closeModal,
        handleCancelOrder,
        handlePay,
        total,
        cash,
        handleChangePay,
        handleSubmitPay,
        showForm
    }
}