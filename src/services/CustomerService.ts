
import axios from 'axios';
import { AuxConstants, CustomerConstant } from '../constants';
import { CustomerDTO } from '../models/User.model';
import { ApiUtil } from '../utils/index';

export class CustomerService {
	static getCustomers = async (query: any) => {
		const { searchQuery, limit, offset, order } = ApiUtil.getUrlParams(query)
		if (searchQuery) {
            const url = `${AuxConstants.baseUrl}${CustomerConstant.apiUrl}?limit=${limit}&offset=${offset}&ordering=${order}&search=${searchQuery}`
            const res = await axios.get(url)
            return res.data
        } else {
            const res = await axios.get(`${AuxConstants.baseUrl}${CustomerConstant.apiUrl}?limit=${limit}&offset=${offset}&ordering=${order}`)
            return res.data
        }
	}

	static addCustomer = async (data: CustomerDTO) => {
		return axios.post(AuxConstants.baseUrl+CustomerConstant.addUrl, data)
	}
}
