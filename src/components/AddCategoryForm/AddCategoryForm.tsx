import { useCategory } from '../../hooks/useCategory';

const AddCategoryForm = () => {
    const { register, handleSubmit, onSubmit, errors } = useCategory()

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="name">category name:</label>
                    <input
                        type="text"
                        {...register('name', {required: true, max: 30})}
                        className={ errors.name ? 'error' : '' }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">description:</label>
                    <input
                        type="text"
                        {...register('description', {required: true, max: 300})}
                        className={ errors.name ? 'error' : '' }
                    />
                </div>
                <button type='submit'>Create Category</button>
            </form>
        </div>
    )
}

export default AddCategoryForm