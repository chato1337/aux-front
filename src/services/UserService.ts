import axios from "axios"
import { AccountConstant, AuxConstants } from '../constants/index';
import { Staff } from "../models/User.model";

export class UserService {
    static addUser = async (data: any) => {
        return axios.post(AuxConstants.baseUrl+AccountConstant.addUrl, data)
    }

	static getStaff = async (data: Staff) => {
		const res = await axios.get(AuxConstants.baseUrl+AccountConstant.staffUrl)
		return res.data
	}
}
