import React from 'react'
import { useForm } from 'react-hook-form'
import { InventoryService } from '../../services/InventoryService'

const AddInventoryForm = () => {
    const { register, handleSubmit } = useForm()
    const onSubmit = data => {
        InventoryService.addInventory(data)
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('name')} type="text" />
                <input {...register('category')} type="text" />
                <input {...register('stock')} type="text" />
                <input {...register('unit')} type="text" />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddInventoryForm
