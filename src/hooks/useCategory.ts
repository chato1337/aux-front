import { useForm } from "react-hook-form"
import { Category } from "../models/Inventory.model"
import { useMutation, useQuery } from 'react-query';
import { CategoryService } from '../services/CategoryService';
import { useModal } from "./useModal";
import { useState } from "react";


export const useCategory = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Category>()
    const { modalIsOpen, setModalIsOpen, closeModal } = useModal()
    const [ catetgorySelected, setCategorySelected ] = useState<null | Category>(null)
    const onSubmit = (data: any) => {
        mutate(data)
    }

    const {mutate} = useMutation(CategoryService.addInventory, {
        onSuccess(data, variables, context) {
            console.log(data)
        },
    })

    const { data, isSuccess } = useQuery("category", CategoryService.getCategories)

    const handleModal = (category: Category | null) => {
        setCategorySelected(category)
        setModalIsOpen(true)
    }

    return {
        register,
        handleSubmit,
        errors,
        onSubmit,
        data,
        isSuccess,
        modalIsOpen,
        closeModal,
        handleModal,
        catetgorySelected
    }
}