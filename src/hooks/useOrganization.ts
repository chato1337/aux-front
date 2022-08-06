import { useForm } from 'react-hook-form';
import { Organization, OrganizationResponse } from '../models/Organization.model.d';
import { useMutation } from 'react-query';
import { organizationService } from '../services/OrgService';
import { AxiosResponse } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setOrganization, setUser } from '../redux/accountSlice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import { AccountService } from '../services/AccountService';

export const useOrganization = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Organization>()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state: RootState) => state.account.user)

    const onSubmit = (data: any) => {
        const orgData = { ...data, owner: user?.id }
        mutate(orgData)
    }

    const { mutate } = useMutation(organizationService.AddOrganization, {
        onSuccess(data, variables, context) {
            const res: AxiosResponse<OrganizationResponse> = data
            dispatch(setOrganization(res.data.organization))
            dispatch(setUser(res.data.user))
            AccountService.removeUser()
            AccountService.store(res.data.user)
            navigate('/dashboard', {replace: true})
        },
    })

    return {
        register,
        handleSubmit,
        errors,
        onSubmit
    }
}