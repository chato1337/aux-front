import { useTranslation } from 'react-i18next';
import AddCategoryForm from '../../components/AddCategoryForm/AddCategoryForm';
import SimpleModal from '../../components/SimpleModal/SimpleModal';
import { useCategory } from '../../hooks/useCategory';
import { Category as CategoryModel } from '../../models/Inventory.model';
import { useDispatch } from 'react-redux';
import { setActionForm } from '../../redux/settingsSlice';

const Category = () => {
    const [ t ] = useTranslation()
    const { data, isSuccess, modalIsOpen, closeModal, handleModal, categorySelected, handleDelete } = useCategory()
    const dispatch = useDispatch()

    const handleEdit = (category: CategoryModel) => {
        dispatch(setActionForm("edit"))
        handleModal(category)
    }

    const handleCreate = () => {
        dispatch(setActionForm("create"))
        handleModal(null)
    }

    return (
        <div className='category-container'>
            <div className="category-header">
                <h2>{ t('category.title') }</h2>
                <button onClick={() => handleCreate()} >{ t('category.add') }</button>
            </div>
            <div className="category-table">
                <table>
                    <thead>
                        <tr>
                            <th>{ t('name') }</th>
                            <th>{ t('category.description') }</th>
                            <th>{ t('actions') }</th>
                        </tr>
                    </thead>
                    <tbody>
                        { isSuccess && (
                                data.map((item: CategoryModel) => (
                                    <tr key={item.id}>
                                        <td>{ item.name }</td>
                                        <td>{ item.description }</td>
                                        <td className='action-cell'>
                                            <button onClick={ () => handleEdit(item) } >edit</button>
                                            <button onClick={ () => handleDelete(item) }>delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) }
                    </tbody>
                </table>
            </div>
            <SimpleModal modalIsOpen={ modalIsOpen } closeModal={ closeModal } >
                <AddCategoryForm
                    categoryData={ categorySelected ? categorySelected : undefined }
                />
            </SimpleModal>
        </div>
    )
}

export default Category