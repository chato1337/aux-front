import { useForm } from 'react-hook-form'
import './AddInventoryForm.styles.scss'
import { InventoryService } from '../../services/InventoryService'
import { Inventory } from '../../models/Inventory.model.d';
import { useMutation } from 'react-query';

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
    const { register, handleSubmit, reset, formState: {errors} } = useForm<Inventory>()
    const onSubmit = (data: Inventory) => {
        // InventoryService.addInventory(data)
        mutate(data)
    }

    const { mutate } = useMutation(InventoryService.addInventory, {
        onSuccess(data, variables, context) {
            console.log(data)
            console.log(variables)
            console.log(context)
            reset()
        },
    })

    return (
        <div className='add-inventory-container'>
            <h2>Add new product:</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="">Name:</label>
                    <input
                        {...register('name', {required: true})}
                        type="text"
                        defaultValue={productData.name}
                        className={ errors.name ? 'error' : '' }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">Category:</label>
                    <input
                        {...register('category', {required: true})}
                        type="text"
                        defaultValue={productData.category}
                        className={ errors.category ? 'error' : '' }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">Stock:</label>
                    <input
                        {...register('stock', {required: true})}
                        type="text"
                        defaultValue={productData.stock}
                        className={ errors.stock ? 'error' : '' }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">Unit:</label>
                    <input
                        {...register('unit', {required: true})}
                        type="text"
                        defaultValue={productData.unit}
                        className={ errors.unit ? 'error' : '' }
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddInventoryForm
