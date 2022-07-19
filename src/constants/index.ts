import { Category, Product } from "../models/Inventory.model"
import { Supplier } from "../models/Supplier.model"

export class AuxConstants {
    static baseUrl = 'http://localhost:8000/api/v1/'
}


export class StockConstant {
    static apiUrl = 'stock/get/'
    static addUrl = 'stock/add/'
}
export class SupplierConstant {
    static apiUrl = 'inventory/supplier/'
    static addUrl = 'inventory/supplier/add/'
    static defaultSupplier: Supplier = {
        id: 0,
        name: '',
        identifier: '',
        phone: 0,
        email: '',
        other_details: ''
    }
}

export class CategoryConstant {
    static apiUrl = 'inventory/category/'
    static addUrl = 'inventory/category/add/'
    static defaultCategory: Category = {
        id: 0,
        name: '',
        description: ''
    }
}

export class InventoryConstant {
    static apiUrl = 'inventory/product/'
    static addUrl = 'inventory/product/add/'
    static defaultValue: Product = {
        name: '',
        id: 0,
        category_id: 0,
        category: CategoryConstant.defaultCategory,
        stock: 0,
        unit: '',
        price: 0,
        is_active: true,
        supplier_id: 0,
        entry_date: '',
        expiration_date: '',
        supplier: SupplierConstant.defaultSupplier
    }
    
}
