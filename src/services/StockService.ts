import axios from "axios"
import { AuxConstants, StockConstant } from "../constants"
import { Cart } from "../models/cart.model"
import { ApiUtil } from "../utils"

export class StockService{
    static getStock = async (query: any) => {
        const { searchQuery, limit, offset, order } = ApiUtil.getUrlParams(query)

        if (searchQuery) {
            const url = `${AuxConstants.baseUrl}${StockConstant.apiUrl}?limit=${limit}&offset=${offset}&ordering=${order}&search=${searchQuery}`
            const res = await axios.get(url)
            return res.data
        } else {
            const res = await axios.get(`${AuxConstants.baseUrl}${StockConstant.apiUrl}?limit=${limit}&offset=${offset}&ordering=${order}`)
            return res.data
        }
}

    //TODO: fix this shit
    static addStock = async (data: Cart) => {
        const res = await axios.post(AuxConstants.baseUrl+StockConstant.addUrl, data)
        return res.data
    }
}
