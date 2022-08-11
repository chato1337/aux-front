
import axios from 'axios';
import { AuxConstants, CustomerConstant } from '../constants';
import { CustomerDTO } from '../models/User.model';
import { ApiUtil } from '../utils/index';
import { Customer } from '../models/User.model.d';
import { Option } from '../hooks/useSelect';

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

	static getFullCustomers = async (query: any) => {
		const { limit } = ApiUtil.getUrlParams(query)
		const res = await axios.get(AuxConstants.baseUrl+CustomerConstant.apiUrl+'?limit='+limit)
		return res.data
	}

	static addCustomer = async (data: CustomerDTO) => {
		return axios.post(AuxConstants.baseUrl+CustomerConstant.addUrl, data)
	}

	static genCustomerOpt = (customers: { results: Customer[] }) => {
		return customers.results.map((cust: Customer): Option => ({ value: cust.id, label: cust.full_name }))
	}
}
