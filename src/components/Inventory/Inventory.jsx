import React from 'react'
import { useQuery } from 'react-query'
import { InventoryService } from '../../services/InventoryService'
import AddInventoryForm from './AddInventoryForm'

const Inventory = () => {
    const { data, status } = useQuery('inventory', InventoryService.getInventories)

    return (
        <div>
            inventory component:
            <ul>
                {
                    data?.map(item =>
                        <li key={item.id}>{item.name} - {item.category} - {item.stock}</li>
                    )
                }
            </ul>
            <AddInventoryForm />
        </div>
    )
}

export default Inventory