import axios from "axios"
import { AuxConstants, SupplierConstant } from "../constants"
import { Option } from "../hooks/useSelect"
import { Supplier } from "../models/Supplier.model"
import { ApiUtil } from "../utils"

export class SupplierService{
    static getSupplier = async (query: any) => {
        const { searchQuery, limit, offset, order } = ApiUtil.getUrlParams(query)

        if(searchQuery){
            const url = `${AuxConstants.baseUrl}${SupplierConstant.apiUrl}?limit=${limit}&offset=${offset}&ordering=${order}&search=${searchQuery}`
            const res = await axios.get(url)

            return res.data
        }else {
            const res = await axios.get(`${AuxConstants.baseUrl}${SupplierConstant.apiUrl}?limit=${limit}&offset=${offset}&ordering=${order}`)
            return res.data
        }
    }

    //TODO: fix this shit
    static addSupplier = (data: any) => {
        return axios.post(AuxConstants.baseUrl+SupplierConstant.addUrl, data)
    }

    static genSupplierOpt = (supList: Supplier[]) => {
        return supList.map((sup: Supplier):Option => ({ value: sup.id, label: sup.name }))
    }

    static editSupplier = (data: any) => {
        return axios.put(AuxConstants.baseUrl+SupplierConstant.editUrl, data)
    }
}