import { useModal } from './useModal';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FORM_OPTION, setModal } from '../redux/settingsSlice';
import { useForm } from 'react-hook-form';
import { RootState } from '../redux/store';
import { useMutation, useQueryClient } from 'react-query';
import { UserService } from '../services/UserService';
import { Owner, Staff, UserResponse } from '../models/User.model.d';
import { AxiosResponse } from 'axios';
import { setToken, setLogged, setStaffSelected } from '../redux/accountSlice';
import { AccountService } from '../services/AccountService';
import { useNavigate } from 'react-router-dom';
import { Option } from './useSelect';
import { organizationService } from '../services/OrgService';
import { useToast } from './useToast';
import { ApiError } from '../utils/index';

const id_types: Option[] = [
	{ value: "CC", label: "CC" },
	{ value: "PS", label: "PS" }
]

export const useAccount = () => {
    const { modalIsOpen, closeModal } = useModal()
    const [form, setForm] = useState('user')
    const actionForm = useSelector((state: RootState) => state.settings.actionForm)
    const { register, handleSubmit, control, setError, formState: {errors, isDirty} } = useForm<Owner>()
    const dispatch = useDispatch()
    const navigate = useNavigate()
	const staffSelected = useSelector((state: RootState) => state.account.staffSelected)
	const logged = useSelector((state: RootState) => state.account.logged)
	const organization = useSelector((state: RootState) => state.account.organization)
	const queryClient = useQueryClient()
	const { notify, notifyError } = useToast()

    const { mutate } = useMutation(UserService.addUser, {
        onSuccess(data) {
            const res: AxiosResponse<UserResponse> = data
            dispatch(setLogged(res.data.staff))
            AccountService.store(res.data.staff)
            dispatch(setToken(res.data.token))
            AccountService.storeToken(res.data.token)
            navigate('/organization', {replace: true})
        }
    })

	const { mutate: mutateEdit } = useMutation(organizationService.editUser, {
		onSuccess({ data }: AxiosResponse<Staff>) {
			const msg = `the user ${data.first_name} was updated succesfully`
			queryClient.refetchQueries()
			closeModal()
			notify(msg)
		},
		onError(error) {
			ApiError.getErrorMsg(error, setError, notifyError)
		},
	})

	const { mutate: mutateJoin } = useMutation(organizationService.joinUser, {
		onSuccess({ data }: AxiosResponse<Staff>) {
			const msg = `the user ${data.first_name} was created succesfully`
			queryClient.refetchQueries()
			closeModal()
			notify(msg)
		},
		onError(error: any) {
			ApiError.getErrorMsg(error, setError, notifyError)
		},
	})

    const handleModal = (action: string) => {
        setForm(action)
		dispatch(setStaffSelected(logged))
        dispatch(setModal(true))
    }

    const onSubmit = (data: Owner) => {
        if (isDirty && actionForm === FORM_OPTION.create) {
            mutate(data)
        } else if(isDirty && actionForm === FORM_OPTION.edit) {
			const editStaff = { ...data, id: staffSelected?.id }
			mutateEdit(editStaff)
		} else if(isDirty && actionForm === FORM_OPTION.join) {
			const joinStaff = { ...data, organization: organization?.id }
			mutateJoin(joinStaff)
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
