import { Staff, User } from "./User.model";

export interface Organization {
    id: number;
    name: string;
    identifier: string;
    phone: number;
    address: string;
    email: string
}

export interface OrganizationResponse {
    staff: Staff;
    organization: Organization
}
