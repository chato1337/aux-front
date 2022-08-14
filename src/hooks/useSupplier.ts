import { useModal } from "./useModal"
import { useForm } from 'react-hook-form';
import { Supplier, SupplierDTO } from "../models/Supplier.model";
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { SupplierService } from '../services/SupplierService';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { FORM_OPTION, setCount, setModal } from "../redux/settingsSlice";
import { AxiosResponse } from 'axios';
import { useTranslation } from 'react-i18next';
import { useToast } from './useToast';
import { RootState } from "../redux/store";
import { ApiError } from "../utils";
import { setSupplierSelected } from "../redux/InventorySlice";

export const useSupplier = () => {
    const { modalIsOpen, closeModal } = useModal()
    const { register, handleSubmit, reset, setError, formState: { errors, isDirty } } = useForm<Supplier>()
    const supplierSelected = useSelector((state: RootState) => state.inventory.supplierSelected)
    const dispatch = useDispatch()
    const queryClient = useQueryClient()
    const [ t ] = useTranslation()
    const { notify, notifyError } = useToast()
    const actionForm = useSelector((state: RootState) => state.settings.actionForm)
    const searchQuery = useSelector((state: RootState) => state.settings.searchQuery)
    const limit = useSelector((state: RootState) => state.settings.limit)
    const offset = useSelector((state: RootState) => state.settings.offset)
    const count = useSelector((state: RootState) => state.settings.count)
    const order = useSelector((state: RootState) => state.settings.order)

    //submit form
    const onSubmit = (data: SupplierDTO) => {
        if (!isDirty) {
            notify( t('formAlert') )
        }

        if(actionForm === FORM_OPTION.create && isDirty) {
            mutate(data)
        }else if(actionForm === FORM_OPTION.edit && isDirty) {
            const editForm = {...data, id: supplierSelected?.id}
            mutateEdit(editForm)
        }

    }

    const { mutate } = useMutation(SupplierService.addSupplier, {
        onSuccess(data, variables, context) {
            const res: AxiosResponse<Supplier> = data
            const msg = `${ t('supplier.createMsg1') } ${res.data.name} ${ t('createMsg2') }`
            reset()
            queryClient.refetchQueries()
            closeModal()
            notify(msg)
        },
        onError(error: any) {
            ApiError.getErrorMsg(error, setError, notifyError)
        },
    })

    const { mutate: mutateEdit } = useMutation(SupplierService.editSupplier, {
        onSuccess(data, variables, context) {
            const res: AxiosResponse<Supplier> = data
            const msg = `${ t('supplier.createMsg1') } ${res.data.name} ${ t('createMsg2') }`
            queryClient.refetchQueries()
            closeModal()
            notify(msg)
        },
        onError(error: any) {
            ApiError.getErrorMsg(error, setError, notifyError)
        },
    })

    //fetch suppliers
    const { data, isSuccess, isLoading } = useQuery(
        ["supplier", searchQuery, limit, offset, order],
        SupplierService.getSupplier,
        { keepPreviousData: true }
    )

    const { data: fullData, isSuccess: isSuccessFull } = useQuery(
        ['full-inventory', searchQuery, data?.count, offset, order],
        SupplierService.GetFullSuplier
    )


    //preload next supplier page
    useEffect(() => {
        if(isSuccess) {
            dispatch(setCount(data.count))
            //prevent unnecessary request if the next page not exist
            if(limit + offset <= count && !searchQuery) {
                const nextOffset = offset + limit;
                queryClient.prefetchQuery(
                    ["supplier", null, limit, nextOffset, order],
                    SupplierService.getSupplier
                )
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
    ])

    const handleModal = (sup: Supplier | null) => {
        dispatch(setSupplierSelected(sup))
        dispatch(setModal(true))
    }

    return {
        modalIsOpen,
        closeModal,
        handleModal,
        register,
        handleSubmit,
        errors,
        onSubmit,
        data,
        isSuccess,
        supplierSelected,
        fullData,
        isSuccessFull,
		isLoading
    }
}
