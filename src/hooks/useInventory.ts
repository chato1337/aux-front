import { useState } from "react"
import { useForm } from "react-hook-form"
import { useQuery, useMutation } from "react-query"
import { Product } from "../models/Inventory.model"
import { InventoryService } from "../services/InventoryService"
import { useModal } from './useModal';
import { Option, useSelect } from "./useSelect"

const initialSupplier: Option = {
    value: 0,
    label: 'select a supplier...'
}

export const useInventory = () => {
    const { data, isSuccess } = useQuery('inventory', InventoryService.getInventories)
    const [productSelected, setProductSelected] = useState<null | Product>(null)
    const { modalIsOpen, setModalIsOpen, closeModal } = useModal()
    const { selectedOption, handleChange } = useSelect(initialSupplier)

    const handleModal = (product: Product | null) => {
        setModalIsOpen(true)
        setProductSelected(product)
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm<Product>()

    const onSubmit = (data: Product) => {
        const supplier = selectedOption as Option

        if (supplier.value > 0) {
            const productData = { ...data, supplier: supplier.value }
            mutate(productData)
            // console.log(productData)
        }else {
            alert('select a supplier first!')
        }
    }

    const { mutate } = useMutation(InventoryService.addInventory, {
        onSuccess(data, variables, context) {
            console.log(data)
            console.log(variables)
            console.log(context)
            reset()
            closeModal()
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
        handleChange
    }
}