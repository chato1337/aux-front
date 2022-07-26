import AddInventoryForm from '../../components/AddInventoryForm/AddInventoryForm'
import SimpleModal from '../../components/SimpleModal/SimpleModal';
import { FaRegEdit } from 'react-icons/fa'
import { RiDeleteBinLine } from 'react-icons/ri'
import { BiAddToQueue } from 'react-icons/bi'
import './Inventory.styles.scss'
import { useInventory } from '../../hooks/useInventory';
import { Product } from '../../models/Inventory.model.d';
import { useTranslation } from 'react-i18next';
import SearchForm from '../../components/SearchForm/SearchForm';
import { useDispatch } from 'react-redux';
import { setActionForm } from '../../redux/settingsSlice';
import Pagination from '../../components/Pagination/Pagination';
import Ordering from '../../components/Ordering/Ordering';

const InventoryComponent = () => {
    const { data, isSuccess, modalIsOpen, productSelected, closeModal, handleModal } = useInventory()
    const [ t ] = useTranslation()
    const dispatch = useDispatch()

    const handleEdit = (product: Product) => {
        dispatch(setActionForm("edit"))
        handleModal(product)
    }

    const handleCreate = () => {
        dispatch(setActionForm("create"))
        handleModal(null)
    }


    return (
        <div className='module-container'>
            <div className='module-header'>
                <h2>{ t('product.title') }</h2>
                <button onClick={() => handleCreate()}>
                    <BiAddToQueue />
                    { t('product.add') }
                </button>
                <SearchForm placeholder={ t('product.name') } />
            </div>
            <div className="module-table">
                { isSuccess && (
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>
                                    { t('product.name') }
                                    <Ordering orderField="name" />
                                </th>
                                <th>{ t('category.title') }</th>
                                <th>{ t('product.stock') }</th>
                                <th>{ t('product.unit') }</th>
                                <th>{ t('actions') }</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.results.map((product: Product) => {
                                    return (
                                        <tr key={ product.id }>
                                            <td>{ product.id }</td>
                                            <td>{ product.name }</td>
                                            <td>{ product.category?.name }</td>
                                            <td>{ product.stock }</td>
                                            <td>{ product.unit }</td>
                                            <td className='action-cell'>
                                                <button className='btn btn-outline' onClick={() => handleEdit(product)}>
                                                    <FaRegEdit />
                                                </button>
                                                <button className='btn btn-danger'>
                                                    <RiDeleteBinLine />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })       
                            }
                        </tbody>
                    </table>
                ) }
            </div>
            <Pagination />
            <SimpleModal modalIsOpen={ modalIsOpen } closeModal={ closeModal }>
                <AddInventoryForm
                    productData={ productSelected ? productSelected : undefined }
                />
            </SimpleModal>
        </div>
    )
}

export default InventoryComponent
