import axios from "axios"
import { AuxConstants, StockConstant } from "../constants"

export class StockService{
    static getStock = async () => {
        const res = await axios.get(AuxConstants.baseUrl+StockConstant.apiUrl)
        return res.data
    }

    //TODO: fix this shit
    static addStock = (data: any) => {
        return axios.post(AuxConstants.baseUrl+StockConstant.addUrl, data)
    }
}