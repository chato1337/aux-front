import axios from "axios"
import { AccountConstant, AuxConstants } from '../constants/index';
import { Staff } from "../models/User.model";
import { Organization } from '../models/Organization.model.d';


export enum STORE_KEYS {
	current_user = 'currentUser',
	token = 'token',
	current_organization ='currentOrg'
}

export class AccountService {
    static loginAuth = async (data: any) => {
        return await axios.post(AuxConstants.baseUrl+AccountConstant.apiUrl, data)
    }
    static store = (user: Staff) => localStorage.setItem(STORE_KEYS.current_user, JSON.stringify(user))

    static storeToken = (token: string) => localStorage.setItem(STORE_KEYS.token, JSON.stringify(token))

    static removeUser = () => localStorage.removeItem(STORE_KEYS.current_user)

    static removeToken = () => localStorage.removeItem(STORE_KEYS.token)

    static getUser = (): Staff | null => {
        const storedUser = localStorage.getItem(STORE_KEYS.current_user)

        return storedUser ? JSON.parse(storedUser) : null
    }

    static getToken = (): string => {
        const storedToken = localStorage.getItem(STORE_KEYS.token)

        return storedToken ? JSON.parse(storedToken) : null
    }

	static storeOrganization = (org: Organization) => localStorage.setItem(STORE_KEYS.current_organization, JSON.stringify(org))

	static removeOrganization = () => localStorage.removeItem(STORE_KEYS.current_organization)

	static getOrganization = (): Organization | null => {
		const storedOrg = localStorage.getItem(STORE_KEYS.current_organization)

		return storedOrg ? JSON.parse(storedOrg) : null
	}
}
