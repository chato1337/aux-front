import { Supplier } from "./Supplier.model"

export interface Product {
    supplier_id: number | string,
    supplier: Supplier,
    id: number
    stock: number,
    name: string,
    price: number,
    category: Category,
    category_id: number,
    unit: string,
    expiration_date: string
    entry_date: string
    is_active: boolean,
    description: string,
	brand: string,
	is_featured: boolean,
	image: string | null
}

export interface ProductDTO extends Omit<Product, id> {
	logo: File
}

export interface Category {
    id: number,
    name: string,
    description: string
}

export interface ErrorCategoryResponse {
    name: string[],
    description: string[]
}
