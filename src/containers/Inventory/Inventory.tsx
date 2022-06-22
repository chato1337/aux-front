import { useQuery } from 'react-query'
import { InventoryService } from '../../services/InventoryService'
import AddInventoryForm from '../../components/AddInventoryForm/AddInventoryForm'

const Inventory = () => {
    const { data } = useQuery('inventory', InventoryService.getInventories)
    // const { data, status } = useQuery('inventory', InventoryService.getInventories)

    return (
        <div>
            inventory component:
            <ul>
                {
                    data?.map((item: any) =>
                        <li key={item.id}>{item.name} - {item.category} - {item.stock}</li>
                    )
                }
            </ul>
            <AddInventoryForm />
        </div>
    )
}

export default Inventory
