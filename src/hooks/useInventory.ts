import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useQuery, useMutation, useQueryClient } from "react-query"
import { Product } from "../models/Inventory.model"
import { InventoryService } from "../services/InventoryService"
import { useModal } from './useModal';
import { Option, useSelect } from "./useSelect"
import { useDispatch, useSelector } from 'react-redux';
import { setCount, setModal } from "../redux/settingsSlice"
import { useTranslation } from 'react-i18next';
import { AxiosResponse } from 'axios';
import { useToast } from './useToast';
import { RootState } from "../redux/store"
import { ApiError } from "../utils"
import { setInventory } from "../redux/InventorySlice"

const initialSupplier: Option = {
    value: 0,
    label: 'select a supplier...'
}

export interface FormValues {
    suppliers: Option[]
}

export const useInventory = (pageLimit: number | null = null) => {
    const productSelected = useSelector((state: RootState) => state.inventory.productSelected)
    const { modalIsOpen, closeModal } = useModal()
    const { selectedOption, handleChange } = useSelect(initialSupplier)
    const dispatch = useDispatch()
    const [ t ] = useTranslation()
    const queryClient = useQueryClient()
    const { notify, notifyError } = useToast()
    const actionForm = useSelector((state: RootState) => state.settings.actionForm)
    const searchQuery = useSelector((state: RootState) => state.settings.searchQuery)
    const storedLimit = useSelector((state: RootState) => state.settings.limit)
    const limit = pageLimit ? pageLimit : storedLimit
    const offset = useSelector((state: RootState) => state.settings.offset)
    const count = useSelector((state: RootState) => state.settings.count)
    const order = useSelector((state: RootState) => state.settings.order)

    console.log(limit)

    const handleModal = (product: Product | null) => {
        dispatch(setModal(true))
        dispatch(setInventory(product))
    }

    const { register, handleSubmit, reset, control, setError, formState: { errors, isDirty } } = useForm<Product>()

    const onSubmit = (data: Product) => {
        console.log('entro?')
        if(!isDirty) {
            notify( t('formAlert') )
        }

        if (actionForm === "create" && isDirty) {
            mutate(data)
        } else if(actionForm === "edit") {
            const editForm = { ...data, id: productSelected?.id }
            mutateEdit(editForm)
        }
    }

    //create product
    const { mutate } = useMutation(InventoryService.addInventory, {
        onSuccess(data, variables, context) {
            const res: AxiosResponse<Product> = data
            const msg = `${ t('category.createMsg1') } ${res.data.name} ${ t('createMsg2') }`
            reset()
            queryClient.refetchQueries()
            closeModal()
            notify(msg)
        },
    })

    //put product
    const { mutate: mutateEdit } = useMutation(InventoryService.editInventory, {
        onSuccess(data, variables, context) {
            const res: AxiosResponse<Product> = data
            const msg = `${ t('product.createMsg1') } ${res.data.name} ${ t('createMsg2') }`
            queryClient.refetchQueries()
            closeModal()
            notify(msg)
        },
        onError(error: any) {
            ApiError.getErrorMsg(error, setError, notifyError)
        },
    })

    const { data, isSuccess } = useQuery(
        ['inventory', searchQuery, limit, offset, order],
        InventoryService.getInventories,
        { keepPreviousData: true }
    )

    //preload next category
    useEffect(() => {
        if (isSuccess) {
            dispatch(setCount(data.count));
            //prevent unnecessary request if the next page not exist
            if (limit + offset <= count && !searchQuery) {
                const nextOffset = offset + limit;
                queryClient.prefetchQuery(
                    ["inventory", null, limit, nextOffset, order],
                    InventoryService.getInventories
                );
            }
        }
    }, [
        data,
        dispatch,
        isSuccess,
        limit,
        offset,
        queryClient,
        count,
        order,
        searchQuery,
    ]);


    return {
        data,
        isSuccess,
        modalIsOpen,
        productSelected,
        closeModal,
        handleModal,
        errors,
        register,
        handleSubmit,
        onSubmit,
        selectedOption,
        handleChange,
        control,
        isDirty
    }
}