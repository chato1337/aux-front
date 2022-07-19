import { useState } from "react"
import { useForm } from "react-hook-form"
import { useQuery, useMutation, useQueryClient } from "react-query"
import { Product } from "../models/Inventory.model"
import { InventoryService } from "../services/InventoryService"
import { useModal } from './useModal';
import { Option, useSelect } from "./useSelect"
import { useDispatch } from 'react-redux';
import { setModal } from "../redux/settingsSlice"
import { useTranslation } from 'react-i18next';
import { AxiosResponse } from 'axios';
import { useToast } from './useToast';

const initialSupplier: Option = {
    value: 0,
    label: 'select a supplier...'
}

export interface FormValues {
    suppliers: Option[]
}

export const useInventory = () => {
    const { data, isSuccess } = useQuery('inventory', InventoryService.getInventories)
    const [productSelected, setProductSelected] = useState<null | Product>(null)
    const { modalIsOpen, closeModal } = useModal()
    const { selectedOption, handleChange } = useSelect(initialSupplier)
    const dispatch = useDispatch()
    const [ t ] = useTranslation()
    const queryClient = useQueryClient()
    const { notify } = useToast()

    const handleModal = (product: Product | null) => {
        dispatch(setModal(true))
        setProductSelected(product)
    }

    const { register, handleSubmit, reset, control, formState: { errors, isDirty } } = useForm<Product>()

    const onSubmit = (data: Product) => {
        if(isDirty) {
            mutate(data)
        }else {
            alert('update change something pls')
        }
    }

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
        control
    }
}