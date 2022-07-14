export interface Stock {
    id: number;
    inventory_id: number;
    sale_value: number;
    tax: number;
    initial_value: number;
}

export interface StockDTO extends Omit<Stock, 'id'>{}
