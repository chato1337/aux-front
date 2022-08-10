import { Category, Product } from "../models/Inventory.model"
import { Supplier } from "../models/Supplier.model"

export class AuxConstants {
    static baseUrl = 'http://localhost:8000/api/v1/'
}

export class AccountConstant {
    static apiUrl = 'user/login/'
    static addUrl = 'user/add/'
	static staffUrl = 'user/staff/'
}

export class OrganizationConstant {
    static addUrl = 'user/organization/add/'
}

export class StockConstant {
    static apiUrl = 'stock/invoice/'
    static addUrl = 'stock/invoice/add/'
}
export class SupplierConstant {
    static apiUrl = 'inventory/supplier/'
    static fullUrl = 'inventory/supplier/full/'
    static addUrl = 'inventory/supplier/add/'
    static editUrl = 'inventory/supplier/edit/'
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
    static fullUrl = 'inventory/category/full/'
    static addUrl = 'inventory/category/add/'
    static editUrl = 'inventory/category/edit/'
    static defaultCategory: Category = {
        id: 0,
        name: '',
        description: ''
    }
}

export class InventoryConstant {
    static apiUrl = 'inventory/product/'
    static fullUrl = 'inventory/product/full/'
    static addUrl = 'inventory/product/add/'
    static editUrl = 'inventory/product/edit/'
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
        supplier: SupplierConstant.defaultSupplier,
        description: ''
    }

}
