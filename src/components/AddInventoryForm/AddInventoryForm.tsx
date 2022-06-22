import { useForm } from 'react-hook-form'
import { Inventory } from '../../models/Inventory.model'
import './AddInventoryForm.styles.scss'
import { InventoryService } from '../../services/InventoryService'

const AddInventoryForm = () => {
    const { register, handleSubmit } = useForm<Inventory>()
    const onSubmit = (data: Inventory) => {
        InventoryService.addInventory(data)
    }
    
    return (
        <div className='add-inventory-container'>
            <h2>Add new product:</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="">Name:</label>
                    <input {...register('name')} type="text" />
                </div>
                <div className="form-group">
                    <label htmlFor="">Category:</label>
                    <input {...register('category')} type="text" />
                </div>
                <div className="form-group">
                    <label htmlFor="">Stock:</label>
                    <input {...register('stock')} type="text" />
                </div>
                <div className="form-group">
                    <label htmlFor="">Unit:</label>
                    <input {...register('unit')} type="text" />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddInventoryForm
