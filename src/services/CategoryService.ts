
import axios from 'axios';
import { AuxConstants, CategoryConstant } from '../constants/index';
import { Category } from '../models/Inventory.model';
import { Option } from "../hooks/useSelect"

export class CategoryService {
    static getCategories = async () => {
        const res = await axios.get(AuxConstants.baseUrl+CategoryConstant.apiUrl)
        return res.data
    }

    static addInventory = (data: any) => {
        return axios.post(AuxConstants.baseUrl+CategoryConstant.addUrl, data)
    }

    static genCategoryOpt = (supList: Category[]) => {
        return supList.map((sup: Category):Option => ({ value: sup.id, label: sup.name }))
    }

}