export interface Product {
    supplier_id: number | string,
    id: number
    stock: number,
    name: string,
    price: number,
    category: string,
    unit: string,
    expiration_date: string
    entry_date: string
    is_active: boolean
}