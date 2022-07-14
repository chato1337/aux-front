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
        stock: 0,
        unit: '',
        is_active: true
    }
    
}

export class StockConstant {
    static apiUrl = 'api/stock/get/'
    static addUrl = 'api/stock/add/'
    
}