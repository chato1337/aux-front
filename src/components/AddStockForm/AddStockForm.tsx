import { InventoryConstant } from '../../constants';
import { useStock } from '../../hooks/useStock';
import { Inventory } from '../../models/Inventory.model';

type AddStockFormTypes = {
    productData?: Inventory
}

const AddStockForm = ({ productData = InventoryConstant.defaultValue }: AddStockFormTypes) => {
    const { register, handleSubmit, errors, onSubmit } = useStock()

    return (
        <div>
            <h2>Generate price value for {productData.name}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="">Initial Value:</label>
                    <input
                        type="number"
                        {...register('initial_value', {required: true})}
                        className={ errors.initial_value ? 'error' : '' }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">Sale Value:</label>
                    <input
                        type="number"
                        {...register('sale_value', {required: true})}
                        className={ errors.sale_value ? 'error' : '' }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">tax:</label>
                    <input
                        type="number"
                        {...register('tax', {required: true, maxLength: 2})}
                        className={ errors.tax ? 'error' : '' }
                    />
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default AddStockForm