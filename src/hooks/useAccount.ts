import { useModal } from './useModal';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FORM_OPTION, setModal } from '../redux/settingsSlice';
import { useForm } from 'react-hook-form';
import { RootState } from '../redux/store';
import { useMutation } from 'react-query';
import { UserService } from '../services/UserService';
import { Owner, UserResponse } from '../models/User.model.d';
import { AxiosResponse } from 'axios';
import { setToken, setStaff } from '../redux/accountSlice';
import { AccountService } from '../services/AccountService';
import { useNavigate } from 'react-router-dom';
import { Option } from './useSelect';

const id_types: Option[] = [
	{ value: "CC", label: "CC" },
	{ value: "PS", label: "PS" }
]

export const useAccount = () => {
    const { modalIsOpen, closeModal } = useModal()
    const [form, setForm] = useState('user')
    const actionForm = useSelector((state: RootState) => state.settings.actionForm)
    const { register, handleSubmit, control, formState: {errors, isDirty} } = useForm<Owner>()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { mutate } = useMutation(UserService.addUser, {
        onSuccess(data) {
            const res: AxiosResponse<UserResponse> = data
            dispatch(setStaff(res.data.staff))
            AccountService.store(res.data.staff)
            dispatch(setToken(res.data.token))
            AccountService.storeToken(res.data.token)
            navigate('/organization', {replace: true})
        }
    })

    const handleModal = (action: string) => {
        setForm(action)
        dispatch(setModal(true))
    }

    const onSubmit = (data: Owner) => {
        if (isDirty && actionForm === FORM_OPTION.create) {
            mutate(data)
        }
		else if(isDirty && actionForm === FORM_OPTION.join) {
			console.log("Join to org")
		} else {
            console.log(data)
        }
    }

    return {
        modalIsOpen,
        closeModal,
        handleModal,
        form,
        register,
        handleSubmit,
        errors,
        onSubmit,
		control,
		id_types
    }
}
