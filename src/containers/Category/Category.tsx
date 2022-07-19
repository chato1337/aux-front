import { useTranslation } from 'react-i18next';
import AddCategoryForm from '../../components/AddCategoryForm/AddCategoryForm';
import SimpleModal from '../../components/SimpleModal/SimpleModal';
import { useCategory } from '../../hooks/useCategory';
import { Category as CategoryModel } from '../../models/Inventory.model';

const Category = () => {
    const [ t ] = useTranslation()
    const { data, isSuccess, modalIsOpen, closeModal, handleModal, catetgorySelected, handleDelete } = useCategory()

    return (
        <div className='category-container'>
            <div className="category-header">
                <h2>{ t('category.title') }</h2>
                <button onClick={() => handleModal(null)} >{ t('category.add') }</button>
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
                                            <button onClick={ () => handleModal(item) } >edit</button>
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
                    categoryData={ catetgorySelected ? catetgorySelected : undefined }
                />
            </SimpleModal>
        </div>
    )
}

export default Category