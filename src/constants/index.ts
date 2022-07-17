import { Product } from "../models/Inventory.model"

export class AuxConstants {
    static baseUrl = 'http://localhost:8000/api/v1/'
}

export class InventoryConstant {
    static apiUrl = 'inventory/product/'
    static addUrl = 'inventory/product/add/'
    static defaultValue: Product = {
        name: '',
        id: 0,
        category: '',
        stock: 0,
        unit: '',
        price: 0,
        is_active: true,
        supplier_id: 0,
        entry_date: '',
        expiration_date: ''
    }
    
}

export class StockConstant {
    static apiUrl = 'stock/get/'
    static addUrl = 'stock/add/'
}
export class SupplierConstant {
    static apiUrl = 'inventory/supplier/'
    static addUrl = 'inventory/supplier/add/'
}