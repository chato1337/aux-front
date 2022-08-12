import { Product } from './Inventory.model.d';
import { Customer, Staff } from './User.model'

export interface Invoice {
    id:           number;
    orders:       Order[];
    customer:     Customer;
    seller:       Staff;
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
    invoice:       number;
}

export interface StockDTO extends Omit<Stock, 'id'>{}
