import { Inventory } from "../models/Inventory.model"

export class AuxConstants {
    static baseUrl = 'http://localhost:8000/'
}

export class InventoryConstant {
    static apiUrl = 'api/inventory/get/'
    static addUrl = 'api/inventory/add/'
    static defaultValue: Inventory = {
        name: '',
        id: 0,
        category: '',
        stock: '',
        unit: '',
        is_active: true
    }
    
}