import { useSupplier } from '../../hooks/useSupplier';

const AddSupplierForm = () => {
    const { handleSubmit, onSubmit, register, errors } = useSupplier()
    
    return (
        <div>
            <h2>Add new Supplier</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input id='name' type="text" {...register('name', {required: true})} className={ errors.name ? 'error' : '' } />
                </div>
                <div className="form-group">
                    <label htmlFor="ident">Identifier:</label>
                    <input id='ident' type="text" {...register('identifier', {required: true})} />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    <input id='phone' type="text" {...register('phone', {required: true})} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input id='email' type="text" {...register('email', {required: true})} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description/notes:</label>
                    <input id='description' type="text" {...register('other_details', {required: true})} />
                </div>
                <button type='submit'>Create Supplier</button>
            </form>
        </div>
    )
}

export default AddSupplierForm