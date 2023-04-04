import { Staff, User } from "./User.model";
import { Owner } from './User.model.d';

export interface Organization {
    id: number;
    name: string;
    identifier: string;
    phone: number;
    address: string;
    email: string
	//TODO: Enhance with model
	owner: { id: number }
	logo: string
}

export interface OrganizationResponse {
    staff: Staff;
    organization: Organization
}
