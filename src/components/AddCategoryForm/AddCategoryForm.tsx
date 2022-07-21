import { useCategory } from '../../hooks/useCategory';
import { useTranslation } from 'react-i18next';
import { Category } from '../../models/Inventory.model';
import { CategoryConstant } from '../../constants';

type AddCategoryFormProps = {
    categoryData?: Category 
}

const AddCategoryForm = ({ categoryData = CategoryConstant.defaultCategory }: AddCategoryFormProps) => {
    const { register, handleSubmit, onSubmit, errors } = useCategory()
    const [ t ] = useTranslation()

    return (
        <div>
            <h2>{ t('category.add') }</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="name">{ t('name') }:</label>
                    <input
                        type="text"
                        {...register('name', {required: true, max: 30})}
                        className={ errors.name ? 'error' : '' }
                        defaultValue={ categoryData.name }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">{ t('category.description') }:</label>
                    <input
                        type="text"
                        {...register('description', {required: true, max: 300})}
                        className={ errors.description ? 'error' : '' }
                        defaultValue={ categoryData.description }
                    />
                </div>
                <button type='submit'>{ t('category.add') }</button>
            </form>
        </div>
    )
}

export default AddCategoryForm