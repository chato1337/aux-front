import { useModal } from "./useModal"
import { useForm } from 'react-hook-form';
import { Supplier, SupplierDTO } from "../models/Supplier.model";
import { useMutation, useQuery } from 'react-query';
import { SupplierService } from '../services/SupplierService';
import { useState } from "react";

export const useSupplier = () => {
    const { modalIsOpen, setModalIsOpen, closeModal } = useModal()
    const { register, handleSubmit, reset, formState: {errors} } = useForm<Supplier>()
    const [ supplierSelected, setSupplierSelected ] = useState<null | Supplier>(null)

    const { data, isSuccess } = useQuery("supplier", SupplierService.getSupplier)
    const onSubmit = (data: SupplierDTO) => {
        mutate(data)
    }

    const { mutate } = useMutation(SupplierService.addSupplier, {
        onSuccess(data, variables, context) {
            console.log(data)
            console.log(variables)
            console.log(context)
        },
    })

    const handleModal = (sup: Supplier | null) => {
        setModalIsOpen(!modalIsOpen)
        setSupplierSelected(sup)
    }

    return {
        modalIsOpen,
        closeModal,
        handleModal,
        register,
        handleSubmit,
        reset,
        errors,
        onSubmit,
        data,
        isSuccess,
        supplierSelected
    }
}