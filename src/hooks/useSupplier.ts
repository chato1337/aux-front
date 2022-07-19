import { useModal } from "./useModal"
import { useForm } from 'react-hook-form';
import { Supplier, SupplierDTO } from "../models/Supplier.model";
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { SupplierService } from '../services/SupplierService';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { setModal } from "../redux/settingsSlice";
import { AxiosResponse } from 'axios';
import { useTranslation } from 'react-i18next';
import { useToast } from './useToast';

export const useSupplier = () => {
    const { modalIsOpen, closeModal } = useModal()
    const { register, handleSubmit, reset, formState: {errors} } = useForm<Supplier>()
    const [ supplierSelected, setSupplierSelected ] = useState<null | Supplier>(null)
    const dispactch = useDispatch()
    const queryClient = useQueryClient()
    const [ t ] = useTranslation()
    const { data, isSuccess } = useQuery("supplier", SupplierService.getSupplier)
    const { notify } = useToast()
    
    const onSubmit = (data: SupplierDTO) => {
        mutate(data)
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
    })

    const handleModal = (sup: Supplier | null) => {
        dispactch(setModal(true))
        setSupplierSelected(sup)
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
        supplierSelected
    }
}