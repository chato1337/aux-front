import axios from "axios"
import { AccountConstant, AuxConstants } from '../constants/index';

export class UserService {
    static addUser = async (data: any) => {
        return axios.post(AuxConstants.baseUrl+AccountConstant.addUrl, data)
    }
}