import axios from "axios"
import { AccountConstant, AuxConstants } from '../constants/index';
import { User } from "../models/User.model";


export class AccountService {
    static loginAuth = async (data: any) => {
        return await axios.post(AuxConstants.baseUrl+AccountConstant.apiUrl, data)
    }
    static store = (user: User) => localStorage.setItem('currentUser', JSON.stringify(user))

    static storeToken = (token: string) => localStorage.setItem('token', JSON.stringify(token))

    static removeUser = () => localStorage.removeItem('currentUser')

    static removeToken = () => localStorage.removeItem('token')

    static getUser = (): User => {
        const storedUser = localStorage.getItem('currentUser')

        return storedUser ? JSON.parse(storedUser) : null
    }

    static getToken = (): string => {
        const storedToken = localStorage.getItem('token')

        return storedToken ? JSON.parse(storedToken) : null
    }

}