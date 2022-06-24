import './AddInventoryForm.styles.scss'
import { Inventory } from '../../models/Inventory.model.d';
import { useInventory } from '../../hooks/useInventory';
import { InventoryConstant } from '../../constants';

type AddInventoryFormProps = {
    productData?: Inventory
}

const AddInventoryForm = ({ productData = InventoryConstant.defaultValue }: AddInventoryFormProps) => {
    const { handleSubmit, onSubmit, register, errors } = useInventory()

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
