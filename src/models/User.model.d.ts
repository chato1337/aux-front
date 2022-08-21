import { Organization } from './Organization.model.d';

export interface Customer {
    id:         number;
    user:       User;
    full_name:  string;
    leverage:   string;
    created_at: string;
}

export interface CustomerDTO extends Customer, Pick<User, 'email' | 'phone' | 'id_type' | 'identifier'>{}

export interface Login extends Pick<User, 'email' | 'password'> {}

export interface UserResponse {
    staff: Staff,
    token: string
}

export enum USER_STATUS {
	to_activate = 'to-activate',
	active = 'active'
}

export enum ID_TYPES {
	'CC',
	'TI',
	'NIT'
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
	id_type: string;
	identifier: number;
    status: USER_STATUS;
	organizations: Organization[]
}

export enum ROLES {
	customer = 'customer',
	owner = 'owner',
	salesman = 'salesman',
	admin = 'admin'
}

export interface Role {
    id:          number;
    name:        ROLES;
    description: string;
}

export interface Staff {
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
