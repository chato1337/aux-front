import axios from 'axios';
import { AuxConstants, CategoryConstant } from '../constants/index';
import { Category } from '../models/Inventory.model';
import { Option } from "../hooks/useSelect"

export class CategoryService {
    static getCategories = async (query: any) => {
        const { queryKey } = query
        const searchQuery = queryKey[1]

        if (searchQuery) {
            const url = `${AuxConstants.baseUrl}${CategoryConstant.apiUrl}?search=${searchQuery}`
            const res = await axios.get(url)
            return res.data
        } else {
            const res = await axios.get(AuxConstants.baseUrl+CategoryConstant.apiUrl)
            return res.data
        }
    }

    static addCategory = (data: any) => {
        return axios.post(AuxConstants.baseUrl+CategoryConstant.addUrl, data)
    }

    static genCategoryOpt = (supList: Category[]) => {
        return supList.map((sup: Category):Option => ({ value: sup.id, label: sup.name }))
    }

    static editCategory = (data: any) => {
        return axios.put(AuxConstants.baseUrl+CategoryConstant.editUrl, data)
    }

}