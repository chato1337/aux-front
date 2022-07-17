export interface Supplier {
    id: number;
    name: string;
    identifier: string;
    phone: number;
    email: string;
    other_details: string;
}

export interface SupplierDTO extends Omit<Supplier, 'id'>{}