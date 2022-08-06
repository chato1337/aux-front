export interface Customer {
    id:         number;
    user:       User;
    full_name:  string;
    leverage:   string;
    created_at: string;
}

export interface Login {
    email: string,
    password: string
}

export interface UserResponse {
    user: User,
    token: string
}

export interface User {
    id:         number;
    role:       Role;
    name:       string;
    email:      string;
    phone:      string;
    password:   string;
    is_active:  boolean;
    created_at: string;
    status: string;
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
    created_at: string;
}

export interface Owner extends User {
    first_name: string;
    last_name: string;
    address: string;
}