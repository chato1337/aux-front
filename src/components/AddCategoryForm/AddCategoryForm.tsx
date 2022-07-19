import { useCategory } from '../../hooks/useCategory';
import { useTranslation } from 'react-i18next';

const AddCategoryForm = () => {
    const { register, handleSubmit, onSubmit, errors } = useCategory()
    const [ t ] = useTranslation()

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="name">{ t('name') }:</label>
                    <input
                        type="text"
                        {...register('name', {required: true, max: 30})}
                        className={ errors.name ? 'error' : '' }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">{ t('category.description') }:</label>
                    <input
                        type="text"
                        {...register('description', {required: true, max: 300})}
                        className={ errors.name ? 'error' : '' }
                    />
                </div>
                <button type='submit'>{ t('category.add') }</button>
            </form>
        </div>
    )
}

export default AddCategoryForm