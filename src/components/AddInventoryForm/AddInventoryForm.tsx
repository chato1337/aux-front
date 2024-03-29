import './AddInventoryForm.styles.scss'
import { Product } from '../../models/Inventory.model.d';
import { useInventory } from '../../hooks/useInventory';
import { InventoryConstant } from '../../constants';
import Select, {SingleValue} from "react-select";
import { useSupplier } from '../../hooks/useSupplier';
import { SupplierService } from '../../services/SupplierService';
import { Option } from '../../hooks/useSelect';
import { Controller } from 'react-hook-form';
import { useCategory } from '../../hooks/useCategory';
import { CategoryService } from '../../services/CategoryService';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { FORM_OPTION } from '../../redux/settingsSlice';
import FileUpload from '../FileUpload/FileUpload';

type AddInventoryFormProps = {
    productData?: Product
}

const AddInventoryForm = ({ productData = InventoryConstant.defaultValue }: AddInventoryFormProps) => {
    const { handleSubmit, onSubmit, register, errors, control, isDirty, handleChangeFile, file } = useInventory()
    const { fullData, isSuccessFull } = useSupplier()
    const { fullData: categoryData, isSuccessFull: isSuccessCategory } = useCategory()
    const categories = isSuccessCategory ? CategoryService.genCategoryOpt(categoryData.results) : []
    const suppliers = isSuccessFull ? SupplierService.genSupplierOpt(fullData.results) : []
    const currentDate = new Date().toLocaleDateString()
    const [ t ] = useTranslation()
    const actionForm = useSelector((state: RootState) => state.settings.actionForm)

    return (
        <div className='add-inventory-container'>
            <h2>{ actionForm === FORM_OPTION.create ? t('product.add') : t('product.edit') }:</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="">{ t('supplier.single') }:</label>
                    { isSuccessFull && (
                        <Controller
                            name="supplier_id"
                            control={control}
                            defaultValue={productData.supplier?.id}
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
                    <label htmlFor="">{ t('product.name') }:</label>
                    <input
                        {...register('name', {required: true, maxLength: 64})}
                        type="text"
                        defaultValue={productData.name}
                        className={ errors.name ? 'error' : '' }
                        maxLength={64}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">{ t('category.title') }:</label>
                    { isSuccessCategory && (
                        <Controller
                            name="category_id"
                            control={control}
                            defaultValue={productData.category?.id}
                            rules={{ required: true }}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <Select
                                    onChange={ (el: SingleValue<Option>) => onChange(el?.value) }
                                    defaultValue={ categories.filter((item: Option) => item.value === value) }
                                    options={ categories }
                                />
                            )}
                        />
                    ) }
                </div>
                <div className="form-group">
                    <label htmlFor="">{ t('product.price') }:</label>
                    <input
                        {...register('price', {required: true, min: 1})}
                        type="number"
                        min={1}
                        defaultValue={productData.price}
                        className={ errors.price ? 'error' : '' }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">{ t('product.stock') }:</label>
                    <input
                        {...register('stock', {required: true, min: 1})}
                        type="number"
                        min={1}
                        defaultValue={productData.stock}
                        className={ errors.stock ? 'error' : '' }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">{ t('product.unit') }:</label>
                    <input
                        {...register('unit', {required: true})}
                        type="text"
                        defaultValue={productData.unit}
                        className={ errors.unit ? 'error' : '' }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">{ t('product.entry_date') }:</label>
                    <input
                        {...register('entry_date', {required: true})}
                        type="date"
                        defaultValue={productData.entry_date}
                        className={ errors.entry_date ? 'error' : '' }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">{ t('product.expiration_date') }:</label>
                    <input
                        {...register('expiration_date', {required: true})}
                        type="date"
                        min={currentDate}
                        defaultValue={productData.expiration_date}
                        className={ errors.expiration_date ? 'error' : '' }
						/>
                </div>
                <div className="form-group">
                    <label htmlFor="">brand:</label>
                    <input
                        {...register('brand', {required: true})}
                        defaultValue={productData.brand}
                        type="text"
                        className={ errors.description ? 'error' : '' }
                    />
                </div>
				<div className="form-group">
					<label htmlFor="">Is Featured</label>
					<input defaultChecked={productData.is_featured} type="checkbox" {...register('is_featured', { required: true })} />
				</div>
                <div className="form-group">
                    <label htmlFor="">{ t('description') }:</label>
                    <input
                        {...register('description', {required: true})}
                        type="text"
                        defaultValue={productData.description}
                        className={ errors.description ? 'error' : '' }
                    />
                </div>
				<FileUpload handleChange={handleChangeFile}/>
                <button disabled={!isDirty || !Boolean(file)} className='btn btn-success' type="submit">{ actionForm === FORM_OPTION.create ? t('product.add') : t('product.edit') }</button>
            </form>
        </div>
    )
}

export default AddInventoryForm
