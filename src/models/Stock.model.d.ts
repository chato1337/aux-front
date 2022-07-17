import { Product } from './Inventory.model.d';

export interface Bill {
    id: number;
    created_at: string;
    customer_id: number;
    seller: string;
    payment_type: string
}

export interface StockDTO extends Omit<Stock, 'id'>{}

export interface Order {
    product_id: Product;
    bill_id: Bill;
    quantity: number;
    discount: number;
    total: number;
    tax: number;
    created_at: string;
}
