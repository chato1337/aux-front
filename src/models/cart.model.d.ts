export interface ProductCart {
    name: string,
    id: number,
    quantity: number,
    unit_price: number
    subtotal: number,
}

export interface Cart {
	total: number;
	seller: number;
	customer: number;
	payment_type: string;
	cash: number;
	products: ProductCart[];
}
