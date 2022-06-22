import axios from "axios"
import { AuxConstants, InventoryConstant } from "../constants"

export class InventoryService{
    static getInventories = async () => {
        const res = await axios.get(AuxConstants.baseUrl+InventoryConstant.apiUrl)
        return res.data
    }

    //TODO: fix this shit
    static addInventory = (data: any) => {
        return axios.post(AuxConstants.baseUrl+InventoryConstant.addUrl, data)
    } 
}