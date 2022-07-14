import { useForm } from 'react-hook-form';
import { useModal } from './useModal';
import { Inventory } from '../models/Inventory.model.d';
import { StockDTO } from '../models/Stock.model';
import { useMutation, useQuery } from 'react-query';
import { StockService } from '../services/StockService';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setInventory } from '../redux/InventorySlice';
import { useEffect } from 'react';

export const useStock = () => {
    const { register, reset, handleSubmit, formState: {errors} } = useForm<StockDTO>()
    const { modalIsOpen, setModalIsOpen, closeModal } = useModal()
    const productSelected = useSelector((state: RootState) => state.inventory.inventoryProduct)
    const dispatch = useDispatch()
    const { data, isSuccess } = useQuery("stock", StockService.getStock)

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

    const handleModal = (product: Inventory) => {
        setModalIsOpen(true)
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