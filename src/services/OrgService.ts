import axios from "axios"
import { AuxConstants, OrganizationConstant, StaffConstant } from '../constants/index';
import { ApiUtil } from '../utils/index';

export class organizationService {
    static AddOrganization = async (data: any) => {
        return axios.post(AuxConstants.baseUrl+OrganizationConstant.addUrl, data)
    }

	static getOrgUser = async (query: any) => {
		const { searchQuery, limit, offset, order, args } = ApiUtil.getUrlParams(query)
		if (searchQuery) {
			const params = `?limit=${limit}&offset=${offset}&ordering=${order}&search=${searchQuery}&owner=${args}`
			const url = `${AuxConstants.baseUrl}${StaffConstant.apiUrl}${params}`
			const res = await axios.get(url)
			return res.data
		} else {
			const params = `?limit=${limit}&offset=${offset}&ordering=${order}&owner=${args}`
			const url = `${AuxConstants.baseUrl}${StaffConstant.apiUrl}${params}`
			const res = await axios.get(url)
			return res.data
		}
	}

	static editUser = async (data: any) => {
		return await axios.put(`${AuxConstants.baseUrl}${StaffConstant.editUrl}`, data)
	}

	static joinUser = async (data: any) => {
		return await axios.post(`${AuxConstants.baseUrl}${StaffConstant.addUrl}`, data)
	}
}
