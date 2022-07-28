export interface Customer {
    id:         number;
    user:       User;
    full_name:  string;
    leverage:   string;
    created_at: Date;
}

export interface User {
    id:         number;
    role:       Role;
    name:       string;
    email:      string;
    phone:      string;
    password:   string;
    is_active:  boolean;
    created_at: Date;
}

export interface Role {
    id:          number;
    name:        string;
    description: string;
}

export interface Seller {
    id:         number;
    user:       User;
    first_name: string;
    last_name:  string;
    address:    string;
    created_at: Date;
}
