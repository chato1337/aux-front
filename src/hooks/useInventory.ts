import { useState } from "react"
import { useForm } from "react-hook-form"
import { useQuery, useMutation } from "react-query"
import { Inventory } from "../models/Inventory.model"
import { InventoryService } from "../services/InventoryService"
import { useModal } from './useModal';

export const useInventory = () => {
    const { data, isSuccess } = useQuery('inventory', InventoryService.getInventories)
    const [productSelected, setProductSelected] = useState<null | Inventory>(null)
    const { modalIsOpen, setModalIsOpen, closeModal } = useModal()

    const handleModal = (product: Inventory | null) => {
        setModalIsOpen(true)
        setProductSelected(product)
    }

    const { register, handleSubmit, reset, formState: {errors} } = useForm<Inventory>()
    const onSubmit = (data: Inventory) => {
        // InventoryService.addInventory(data)
        mutate(data)
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
        onSubmit
    }
}