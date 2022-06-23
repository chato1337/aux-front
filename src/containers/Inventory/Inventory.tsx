import { useQuery } from 'react-query'
import { InventoryService } from '../../services/InventoryService'
import AddInventoryForm from '../../components/AddInventoryForm/AddInventoryForm'
import { Inventory } from '../../models/Inventory.model.d';
import SimpleModal from '../../components/SimpleModal/SimpleModal';
import { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa'
import { RiDeleteBinLine } from 'react-icons/ri'
import { BiAddToQueue } from 'react-icons/bi'
import './Inventory.styles.scss'

const InventoryComponent = () => {
    const { data, isSuccess } = useQuery('inventory', InventoryService.getInventories)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [productSelected, setProductSelected] = useState<null | Inventory>(null)

    const closeModal = () => setModalIsOpen(false)

    const handleModal = (product: Inventory | null) => {
        setModalIsOpen(true)
        setProductSelected(product)
    }

    return (
        <div className='inventory-container'>
            <div className='inventory-header'>
                <h2>Inventory Products:</h2>
                <button onClick={() => handleModal(null)}>
                    <BiAddToQueue />
                    Add product
                </button>
                <form>
                    <input type="text" placeholder='product name' />
                    <button>Search</button>
                </form>
            </div>
            <div className="table-container">
                { isSuccess && (
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Stock</th>
                                <th>Unit</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((product: Inventory) => {
                                    return (
                                        <tr key={product.id}>
                                            <td>{product.name}</td>
                                            <td>{product.category}</td>
                                            <td>{product.stock}</td>
                                            <td>{product.unit}</td>
                                            <td className='action-cell'>
                                                <button onClick={() => handleModal(product)}>
                                                    <FaRegEdit />
                                                </button>
                                                <button>
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
            <SimpleModal modalIsOpen={modalIsOpen} closeModal={closeModal}>
                <AddInventoryForm
                    productData={productSelected ? productSelected : undefined}
                />
            </SimpleModal>
        </div>
    )
}

export default InventoryComponent
