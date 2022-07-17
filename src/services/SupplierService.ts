import axios from "axios"
import { AuxConstants, SupplierConstant } from "../constants"
import { Option } from "../hooks/useSelect"
import { Supplier } from "../models/Supplier.model"

export class SupplierService{
    static getSupplier = async () => {
        const res = await axios.get(AuxConstants.baseUrl+SupplierConstant.apiUrl)
        return res.data
    }

    //TODO: fix this shit
    static addSupplier = (data: any) => {
        return axios.post(AuxConstants.baseUrl+SupplierConstant.addUrl, data)
    }

    static genSupplierOpt = (supList: Supplier[]) => {
        return supList.map((sup: Supplier):Option => ({ value: sup.id, label: sup.name }))
    }
}