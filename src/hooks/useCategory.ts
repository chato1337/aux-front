import { useForm } from "react-hook-form"
import { Category } from "../models/Inventory.model"
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { CategoryService } from '../services/CategoryService';
import { useModal } from "./useModal";
import { useState } from "react";
import { useToast } from "./useToast";
import { useDispatch } from 'react-redux';
import { setModal } from "../redux/settingsSlice";
import { AxiosResponse } from "axios";
import { useTranslation } from 'react-i18next';

export const useCategory = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Category>()
    const { modalIsOpen, closeModal } = useModal()
    const [ catetgorySelected, setCategorySelected ] = useState<null | Category>(null)
    const { notify } = useToast()
    const queryClient = useQueryClient()
    const dispatch = useDispatch()
    const [ t ] = useTranslation()

    const onSubmit = (data: any) => {
        mutate(data)
    }

    const { mutate } = useMutation(CategoryService.addCategory, {
        onSuccess(data, variables, context) {
            const res: AxiosResponse<Category> = data
            const msg = `${ t('category.createMsg1') } ${res.data.name} ${ t('createMsg2') }`
            reset()
            queryClient.refetchQueries()
            closeModal()
            notify(msg)
        },
    })

    const { data, isSuccess } = useQuery("category", CategoryService.getCategories)

    const handleModal = (category: Category | null) => {
        setCategorySelected(category)
        dispatch(setModal(true))
    }

    const handleDelete = (category: Category) => console.log(category)

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
        catetgorySelected,
        handleDelete
    }
}