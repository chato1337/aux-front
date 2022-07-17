import './AddInventoryForm.styles.scss'
import { Product } from '../../models/Inventory.model.d';
import { useInventory } from '../../hooks/useInventory';
import { InventoryConstant } from '../../constants';
import Select from "react-select";
import { useSupplier } from '../../hooks/useSupplier';
import { SupplierService } from '../../services/SupplierService';

type AddInventoryFormProps = {
    productData?: Product
}

const AddInventoryForm = ({ productData = InventoryConstant.defaultValue }: AddInventoryFormProps) => {
    const { handleSubmit, onSubmit, register, errors, selectedOption, handleChange } = useInventory()
    const { data, isSuccess } = useSupplier()

    return (
        <div className='add-inventory-container'>
            <h2>Add new product:</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="">Supplier:</label>
                    { isSuccess && (
                        <Select
                            defaultValue={selectedOption}
                            onChange={handleChange}
                            options={ SupplierService.genSupplierOpt(data) }
                        />
                    ) }
                </div>
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
                    <label htmlFor="">Price:</label>
                    <input
                        {...register('category', {required: true})}
                        type="number"
                        defaultValue={productData.price}
                        className={ errors.price ? 'error' : '' }
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
                <div className="form-group">
                    <label htmlFor="">Expiration date:</label>
                    <input
                        {...register('expiration_date', {required: true})}
                        type="date"
                        defaultValue={productData.unit}
                        className={ errors.expiration_date ? 'error' : '' }
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddInventoryForm
