import { useForm } from 'react-hook-form';
import { useModal } from './useModal';
import { Product } from '../models/Inventory.model.d';
import { StockDTO } from '../models/Stock.model';
import { useMutation, useQuery } from 'react-query';
import { StockService } from '../services/StockService';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setInventory } from '../redux/InventorySlice';
import { useEffect } from 'react';
import { setModal } from '../redux/settingsSlice';

export const useStock = () => {
    const { register, reset, handleSubmit, formState: {errors} } = useForm<StockDTO>()
    const { modalIsOpen, closeModal } = useModal()
    const productSelected = useSelector((state: RootState) => state.inventory.productSelected)
    const dispatch = useDispatch()
    const { data } = useQuery("stock", StockService.getStock)

    useEffect(() => {
        console.log(data)
    }, [data])

    const onSubmit = (formData: StockDTO) => {
        const newStock: StockDTO = {
            ...formData,
            inventory_id: productSelected?.id ?? -1
        }
        mutate(newStock)
    }

    const handleModal = (product: Product) => {
        dispatch(setModal(true))
        dispatch(setInventory(product))
    }

    const { mutate } = useMutation(StockService.addStock, {
        onSuccess(data, variables, context) {
            console.log(data)
            console.log(variables)
            console.log(context)
        },
    })

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
        mutate
    }
}