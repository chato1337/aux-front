import { useSupplier } from '../../hooks/useSupplier';
import { Supplier } from '../../models/Supplier.model.d';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

type AddSupplierFormProps = {
    supplierData?: Supplier 
}

const AddSupplierForm = ({ supplierData }: AddSupplierFormProps) => {
    const { handleSubmit, onSubmit, register, errors } = useSupplier()
    const [ t ] = useTranslation()
    const actionForm = useSelector((state: RootState) => state.settings.actionForm)

    return (
        <div>
            <h2>{ actionForm === "create" ? t('supplier.add') : t('supplier.edit') }</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="name">{ t('supplier.name') }:</label>
                    <input
                        id='name'
                        type="text"
                        {...register('name', {required: true})}
                        className={ errors.name ? 'error' : '' }
                        defaultValue={supplierData?.name}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="ident">{ t('supplier.id') }:</label>
                    <input
                        id='ident'
                        type="text"
                        {...register('identifier', {required: true})}
                        className={ errors.identifier ? 'error' : '' }
                        defaultValue={supplierData?.identifier}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">{ t('supplier.phone') }:</label>
                    <input
                        id='phone'
                        type="phone"
                        {...register('phone', {required: true})}
                        className={ errors.phone? 'error' : '' }
                        defaultValue={supplierData?.phone}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">{ t('supplier.email') }:</label>
                    <input
                        id='email'
                        type="email"
                        {...register('email', {required: true})}
                        className={ errors.email ? 'error' : '' }
                        defaultValue={supplierData?.email}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description/notes:</label>
                    <input
                        id='description'
                        type="text"
                        {...register('other_details', {required: true})}
                        className={ errors.other_details ? 'error' : '' }
                        defaultValue={supplierData?.other_details}
                    />
                </div>
                <button className='btn btn-success' type='submit'>{ actionForm === "create" ? t('supplier.add') : t('supplier.edit') }</button>
            </form>
        </div>
    )
}

export default AddSupplierForm