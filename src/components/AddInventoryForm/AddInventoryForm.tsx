import './AddInventoryForm.styles.scss'
import { Product } from '../../models/Inventory.model.d';
import { useInventory } from '../../hooks/useInventory';
import { InventoryConstant } from '../../constants';
import Select, {SingleValue} from "react-select";
import { useSupplier } from '../../hooks/useSupplier';
import { SupplierService } from '../../services/SupplierService';
import { Option } from '../../hooks/useSelect';
import { Controller } from 'react-hook-form';

type AddInventoryFormProps = {
    productData?: Product
}

const AddInventoryForm = ({ productData = InventoryConstant.defaultValue }: AddInventoryFormProps) => {
    const { handleSubmit, onSubmit, register, errors, control } = useInventory()
    const { data, isSuccess } = useSupplier()
    const suppliers = isSuccess ? SupplierService.genSupplierOpt(data) : []

    return (
        <div className='add-inventory-container'>
            <h2>Add new product:</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="">Supplier:</label>
                    { isSuccess && (
                        <Controller
                            name="supplier_id"
                            control={control}
                            defaultValue={productData.supplier_id}
                            rules={{ required: true }}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <Select
                                    onChange={(el: SingleValue<Option>) => onChange(el?.value)}
                                    defaultValue={suppliers.filter((item: Option) => item.value === value)}
                                    options={ suppliers }
                                />
                            )}
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
                        {...register('price', {required: true})}
                        type="number"
                        defaultValue={productData.price}
                        className={ errors.price ? 'error' : '' }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">Stock:</label>
                    <input
                        {...register('stock', {required: true})}
                        type="number"
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
                    <label htmlFor="">Entry date:</label>
                    <input
                        {...register('entry_date', {required: true})}
                        type="date"
                        defaultValue={productData.entry_date}
                        className={ errors.entry_date ? 'error' : '' }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">Expiration date:</label>
                    <input
                        {...register('expiration_date', {required: true})}
                        type="date"
                        defaultValue={productData.expiration_date}
                        className={ errors.expiration_date ? 'error' : '' }
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddInventoryForm
