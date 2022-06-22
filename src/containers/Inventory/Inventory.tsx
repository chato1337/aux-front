import { useQuery } from 'react-query'
import { InventoryService } from '../../services/InventoryService'
import AddInventoryForm from '../../components/AddInventoryForm/AddInventoryForm'
import { Inventory } from '../../models/Inventory.model.d';

const InventoryComponent = () => {
    const { data, isSuccess } = useQuery('inventory', InventoryService.getInventories)

    return (
        <div>
            inventory component:
            { isSuccess && (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Stock</th>
                            <th>Unit</th>
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
                                    </tr>
                                )
                            })       
                        }
                    </tbody>
                </table>
            ) }
            <AddInventoryForm />
        </div>
    )
}

export default InventoryComponent
