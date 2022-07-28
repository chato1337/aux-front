import axios from "axios"
import { AuxConstants, InventoryConstant } from "../constants"
import { ApiUtil } from "../utils"

export class InventoryService{
    static getInventories = async (query: any) => {
        const { searchQuery, limit, offset, order } = ApiUtil.getUrlParams(query)

        if (searchQuery) {
            const url = `${AuxConstants.baseUrl}${InventoryConstant.apiUrl}?limit=${limit}&offset=${offset}&ordering=${order}&search=${searchQuery}`
            const res = await axios.get(url)
            return res.data
        } else {
            const res = await axios.get(`${AuxConstants.baseUrl}${InventoryConstant.apiUrl}?limit=${limit}&offset=${offset}&ordering=${order}`)
            return res.data
        }
    }

    //TODO: fix this shit
    static addInventory = (data: any) => {
        return axios.post(AuxConstants.baseUrl+InventoryConstant.addUrl, data)
    }

    static editInventory = (data: any) => {
        return axios.put(AuxConstants.baseUrl+InventoryConstant.editUrl, data)
    }
}