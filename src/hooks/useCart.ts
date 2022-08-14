import { useInventory } from "./useInventory"
import { Product } from '../models/Inventory.model.d';
import { Cart, ProductCart } from "../models/cart.model";
import { useDispatch, useSelector } from 'react-redux';
import { addProductCart, cleanProductCart } from "../redux/cartSlice";
import { ChangeEvent, useState } from "react";
import { RootState } from "../redux/store";
import { FORM_OPTION, setActionForm, setModal } from "../redux/settingsSlice";
import { useMutation } from 'react-query';
import { StockService } from '../services/StockService';
import { ApiError } from '../utils/index';
import { useForm } from 'react-hook-form';
import { useToast } from "./useToast";
import { Invoice } from '../models/Stock.model.d';
import { Option } from "./useSelect";
import { useTranslation } from "react-i18next";

export const useCart = () => {
    const { data, isSuccess, handleModal, modalIsOpen, closeModal, isLoading } = useInventory()
    const dispatch = useDispatch()
    const [ quantity, setQuantity ] = useState(0)
    const products = useSelector((state: RootState) => state.cart.products)
    const { setError, register, handleSubmit, control, watch, formState: {errors, isDirty} } = useForm<Cart>()
    const { notify, notifyError } = useToast()
    const [ showForm, setShowForm ] = useState(true)
	const [ t ] = useTranslation()
	const payOptions: Option[] = [
        { value: "cash", label: t('sales.cash') },
        { value: "credit", label: t('sales.credit') }
    ]

	//total price sell
	const total = products.reduce(
		(prev, item: ProductCart) => item.subtotal + prev, 0
	);

	const staff = useSelector((state: RootState) => state.account.staff)

    const onSubmit = (data: Cart) => {
		const cartData: Cart = {
			...data,
			products,
			seller: staff?.id ?? 1,
			total,
		}
		mutate(cartData)
    }

    const { mutate } = useMutation(StockService.addStock, {
        onSuccess(data, variables, context) {
            setShowForm(false)
            const res: Invoice = data
            const msg = `the transaction #${res.id} by ${res.total} $ was created succesfully`
            notify(msg)
        },
        onError(error) {
            ApiError.getErrorMsg(error, setError, notifyError)
        },
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const parseQuantity = parseInt(e.target.value)
        setQuantity(parseQuantity)
    }

    const handlePay = () => {
        setShowForm(true)
        dispatch(setActionForm(FORM_OPTION.pay))
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
        onSubmit,
        showForm,
		payOptions,
		register,
		errors,
		isDirty,
		handleSubmit,
		control,
		watch,
		isLoading
    }
}
