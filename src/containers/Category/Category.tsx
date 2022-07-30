import { useTranslation } from 'react-i18next';
import AddCategoryForm from '../../components/AddCategoryForm/AddCategoryForm';
import SimpleModal from '../../components/SimpleModal/SimpleModal';
import { useCategory } from '../../hooks/useCategory';
import { Category as CategoryModel } from '../../models/Inventory.model';
import { useDispatch, useSelector } from 'react-redux';
import { setActionForm } from '../../redux/settingsSlice';
import { BiAddToQueue } from 'react-icons/bi';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBinLine } from 'react-icons/ri';
import SearchForm from '../../components/SearchForm/SearchForm';
import Pagination from '../../components/Pagination/Pagination';
import Ordering from '../../components/Ordering/Ordering';
import { RootState } from '../../redux/store';

const Category = () => {
    const [ t ] = useTranslation()
    const { data, isSuccess, modalIsOpen, closeModal, handleModal, categorySelected, handleDelete } = useCategory()
    const dispatch = useDispatch()
    const searchQuery = useSelector((state: RootState) => state.settings.searchQuery)

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
                <SearchForm placeholder={ t("category.search") } />
            </div>
            <div className="module-table">
                <table>
                    <thead>
                        <tr>
                            <th>
                                <Ordering orderField='id'>
                                    { t('id') }
                                </Ordering>
                            </th>
                            <th>
                                <Ordering orderField="name">
                                    { t('name') }
                                </Ordering>
                            </th>
                            <th>
                                <Ordering orderField='description'>
                                    { t('category.description') }
                                </Ordering>
                            </th>
                            <th>{ t('actions') }</th>
                        </tr>
                    </thead>
                    <tbody>
                        { isSuccess && (
                                data.results.map((item: CategoryModel) => (
                                    <tr key={ item.id }>
                                        <td>{ item.id }</td>
                                        <td>{ item.name }</td>
                                        <td>{ item.description }</td>
                                        <td className='action-cell'>
                                            <button className='btn btn-outline' onClick={ () => handleEdit(item) } >
                                                <FaRegEdit />
                                                { t('table.edit') }
                                            </button>
                                            <button className='btn btn-danger' onClick={ () => handleDelete(item) }>
                                                <RiDeleteBinLine />
                                                { t('table.delete') }
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) }
                        { isSuccess && data.results.length === 0 && (
                            <tr>
                                <td className='no-results' colSpan={4}>No results for: "{searchQuery}" 🧐</td>
                            </tr>
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