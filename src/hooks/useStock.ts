
import { useForm } from 'react-hook-form';
import { useModal } from './useModal';
import { Inventory } from '../models/Inventory.model.d';
import { useState } from 'react';
import { Stock } from '../models/Stock.model';

export const useStock = () => {
    const { register, reset, handleSubmit, formState: {errors} } = useForm<Stock>()
    const { modalIsOpen, setModalIsOpen, closeModal } = useModal()
    const [productSelected, setProductSelected] = useState<null | Inventory>(null)

    const onSubmit = (formData: Stock) => {
        console.log(formData)
    }

    const handleModal = (product: Inventory | null) => {
        setModalIsOpen(true)
        setProductSelected(product)
    }

    return {
        register,
        reset,
        errors,
        handleSubmit,
        onSubmit,
        modalIsOpen,
        closeModal,
        handleModal,
        productSelected,
    }
}