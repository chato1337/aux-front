import axios from "axios"
import { AuxConstants, OrganizationConstant } from '../constants/index';


export class organizationService {
    static AddOrganization = async (data: any) => {
        return axios.post(AuxConstants.baseUrl+OrganizationConstant.addUrl, data)
    }
}