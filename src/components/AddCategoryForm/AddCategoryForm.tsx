import { useCategory } from '../../hooks/useCategory';
import { useTranslation } from 'react-i18next';
import { Category } from '../../models/Inventory.model';
import { CategoryConstant } from '../../constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

type AddCategoryFormProps = {
    categoryData?: Category
}

const AddCategoryForm = ({ categoryData = CategoryConstant.defaultCategory }: AddCategoryFormProps) => {
    const { register, handleSubmit, onSubmit, errors } = useCategory()
    const [ t ] = useTranslation()
    const actionForm = useSelector((state: RootState) => state.settings.actionForm)

    return (
        <div>
            <h2>{ actionForm === "create" ? t('category.add') : t('category.edit') }</h2>
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
                <button className='btn btn-success' type='submit'>{ actionForm === "create" ? t('category.add') : t('category.edit') }</button>
            </form>
        </div>
    )
}

export default AddCategoryForm