import { useForm } from "react-hook-form"
import { Category } from "../models/Inventory.model"
import { useMutation, useQuery } from 'react-query';
import { CategoryService } from '../services/CategoryService';


export const useCategory = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Category>()
    const onSubmit = (data: any) => {
        mutate(data)
    }

    const {mutate} = useMutation(CategoryService.addInventory, {
        onSuccess(data, variables, context) {
            console.log(data)
        },
    })

    const { data, isSuccess } = useQuery("category", CategoryService.getCategories)

    return {
        register,
        handleSubmit,
        errors,
        onSubmit,
        data,
        isSuccess
    }
}