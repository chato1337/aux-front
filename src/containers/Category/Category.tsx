import { useTranslation } from 'react-i18next';
import AddCategoryForm from '../../components/AddCategoryForm/AddCategoryForm';
import SimpleModal from '../../components/SimpleModal/SimpleModal';
import { useCategory } from '../../hooks/useCategory';
import { Category as CategoryModel } from '../../models/Inventory.model';
import { useDispatch } from 'react-redux';
import { setActionForm } from '../../redux/settingsSlice';
import { BiAddToQueue } from 'react-icons/bi';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBinLine } from 'react-icons/ri';
import SearchForm from '../../components/SearchForm/SearchForm';
import Pagination from '../../components/Pagination/Pagination';
import Ordering from '../../components/Ordering/Ordering';

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
        <div className='module-container'>
            <div className="module-header">
                <h2>{ t('category.title') }</h2>
                <button onClick={() => handleCreate()} >
                    <BiAddToQueue />
                    { t('category.add') }
                </button>
                <SearchForm />
            </div>
            <div className="module-table">
                <table>
                    <thead>
                        <tr>
                            <th>
                                { t('name') }
                                <Ordering orderField="name" />
                            </th>
                            <th>{ t('category.description') }</th>
                            <th>{ t('actions') }</th>
                        </tr>
                    </thead>
                    <tbody>
                        { isSuccess && (
                                data.results.map((item: CategoryModel) => (
                                    <tr key={item.id}>
                                        <td>{ item.name }</td>
                                        <td>{ item.description }</td>
                                        <td className='action-cell'>
                                            <button className='btn btn-outline' onClick={ () => handleEdit(item) } >
                                                <FaRegEdit />
                                            </button>
                                            <button className='btn btn-danger' onClick={ () => handleDelete(item) }>
                                                <RiDeleteBinLine />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) }
                    </tbody>
                </table>
            </div>
            <Pagination />
            <SimpleModal modalIsOpen={ modalIsOpen } closeModal={ closeModal } >
                <AddCategoryForm
                    categoryData={ categorySelected ? categorySelected : undefined }
                />
            </SimpleModal>
        </div>
    )
}

export default Category