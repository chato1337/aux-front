import { Product } from './Inventory.model.d';
import { Customer, Seller } from './User.model'

export interface Bill {
    id:           number;
    orders:       Order[];
    customer:     Customer;
    seller:       Seller;
    created_at:   string;
    payment_type: string;
    total:        number;
}

export interface Order {
    id:         number;
    product:    Product;
    quantity:   number;
    discount:   number;
    total:      number;
    tax:        number;
    created_at: string;
    bill:       number;
}

export interface StockDTO extends Omit<Stock, 'id'>{}