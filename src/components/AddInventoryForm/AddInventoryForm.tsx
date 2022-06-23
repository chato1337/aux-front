import { useForm } from 'react-hook-form'
import './AddInventoryForm.styles.scss'
import { InventoryService } from '../../services/InventoryService'
import { Inventory } from '../../models/Inventory.model.d';

type AddInventoryFormProps = {
    productData?: Inventory
}

const defaultValue: Inventory = {
    name: '',
    id: 0,
    category: '',
    stock: '',
    unit: '',
    is_active: true
}

const AddInventoryForm = ({ productData = defaultValue }: AddInventoryFormProps) => {
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
                    <input
                        {...register('name')}
                        type="text"
                        defaultValue={productData.name}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">Category:</label>
                    <input
                        {...register('category')}
                        type="text"
                        defaultValue={productData.category}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">Stock:</label>
                    <input
                        {...register('stock')}
                        type="text"
                        defaultValue={productData.stock}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">Unit:</label>
                    <input
                        {...register('unit')}
                        type="text"
                        defaultValue={productData.unit}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddInventoryForm
