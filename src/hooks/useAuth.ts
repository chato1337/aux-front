import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Login } from '../models/User.model';
import { AccountService } from '../services/AccountService';
import { AxiosResponse } from 'axios';
import { UserResponse } from '../models/User.model.d';
import { useDispatch } from 'react-redux';
import { setToken, setStaff, setOrganization } from '../redux/accountSlice';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm<Login>()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { mutate } = useMutation(AccountService.loginAuth, {
        onSuccess(data) {
            const res: AxiosResponse<UserResponse> = data
            // store data into redux state and local storage
            dispatch(setStaff(res.data.staff))
            AccountService.store(res.data.staff)
            dispatch(setToken(res.data.token))
            AccountService.storeToken(res.data.token)
			//check if have organization
			if(res.data.staff.user.organization.length > 0) {
				//store in redux the first org stored
				dispatch(setOrganization(res.data.staff.user.organization[0]))
				AccountService.storeOrganization(res.data.staff.user.organization[0])
			} else {
				//redirect to create org in case dont have
				navigate('/organization')
			}
			// redirect to app
            navigate('/dashboard', {replace: true})
        },
        onError(error, variables, context) {
            //send error to login form
            setError("email", {type: "focus"})
        },
    })

    const onSubmit = (data: Login) => {
        mutate(data)
    }

    const handleLogout = () => {
        //remove data from localstorage and redux state
        dispatch(setStaff(null))
        dispatch(setToken(null))
		dispatch(setOrganization(null))
        AccountService.removeUser()
        AccountService.removeToken()
		AccountService.removeOrganization()
    }

    return {
        register,
        handleSubmit,
        errors,
        onSubmit,
        handleLogout
    }

}
