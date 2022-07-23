import { useForm } from "react-hook-form"
import { Category } from "../models/Inventory.model"
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { CategoryService } from '../services/CategoryService';
import { useModal } from "./useModal";
import { useToast } from "./useToast";
import { useDispatch, useSelector } from 'react-redux';
import { setCount, setModal } from "../redux/settingsSlice";
import { AxiosResponse } from "axios";
import { useTranslation } from 'react-i18next';
import { RootState } from "../redux/store";
import { setCategorySelected } from "../redux/InventorySlice";
import { useEffect } from "react";

export const useCategory = () => {
    const { register, handleSubmit, reset, setError, setValue, formState: { errors, isDirty } } = useForm<Category>()
    const { modalIsOpen, closeModal } = useModal()
    const categorySelected = useSelector((state: RootState) => state.inventory.categorySelected)
    const { notify, notifyError } = useToast()
    const queryClient = useQueryClient()
    const dispatch = useDispatch()
    const [ t ] = useTranslation()
    const actionForm = useSelector((state: RootState) => state.settings.actionForm)
    const searchQuery = useSelector((state: RootState) => state.settings.searchQuery)
    const limit = useSelector((state: RootState) => state.settings.limit)
    const offset = useSelector((state: RootState) => state.settings.offset)
    const count = useSelector((state: RootState) => state.settings.count)
    const order = useSelector((state: RootState) => state.settings.order)

    //submit form
    const onSubmit = (data: Category) => {
        if(!isDirty){
            notify("please edit any field first")
        }

        if (actionForm === "create" && isDirty) {
            mutate(data)
        }else if(actionForm === "edit" && isDirty){
            const editForm = { ...data, id: categorySelected?.id ?? 0 }
            console.log("entro en edit", editForm)
            mutateEdit(editForm)
        }
    }

    //post categories
    const { mutate } = useMutation(CategoryService.addCategory, {
        onSuccess(data, variables, context) {
            const res: AxiosResponse<Category> = data
            const msg = `${ t('category.createMsg1') } ${res.data.name} ${ t('createMsg2') }`
            reset()
            queryClient.refetchQueries()
            closeModal()
            notify(msg)
        },
        onError(error: any) {
            const errorList: { [key: string]: string[]; } = error.response.data

            Object.keys(errorList).forEach((keyError: string) => {
                // casting string to Object interface values
                const keyName = keyError as "name" | "id" | "description"
                setError(keyName, {type: "focus"}, {shouldFocus: true})
                errorList[keyError].forEach((msg: string) => notifyError(msg))
            })
        }
    })
    
    //put categories
    const { mutate: mutateEdit } = useMutation(CategoryService.editCategory, {
        onSuccess(data, variables, context) {
            const res: AxiosResponse<Category> = data
            const msg = `${ t('category.createMsg1') } ${res.data.name} ${ t('createMsg2') }`
            queryClient.refetchQueries()
            closeModal()
            notify(msg)
        },
    })

    //fetch categories
    const { data, isSuccess } = useQuery(
        ["category", searchQuery, limit, offset, order],
        CategoryService.getCategories,
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
						["category", null, limit, nextOffset, order],
						CategoryService.getCategories
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

    //when open modal create or edit
    const handleModal = (category: Category | null) => {
        dispatch(setCategorySelected(category))
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
        categorySelected,
        handleDelete,
        setValue
    }
}