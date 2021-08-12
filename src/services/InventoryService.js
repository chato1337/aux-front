import axios from "axios"
import { AuxConstants, InventoryConstant } from "../constants"

export class InventoryService{
    static getInventories = async () => {
        const res = await axios.get(AuxConstants.baseUrl+InventoryConstant.apiUrl)
        return res.data
    }

    static addInventory = data => {
        return axios.post(AuxConstants.baseUrl+InventoryConstant.addUrl, data)
    } 
}