import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { CustomerService } from '../services/CustomerService';
import { useModal } from './useModal';
import { useForm } from 'react-hook-form';
import { Customer, CustomerDTO } from '../models/User.model.d';
import { Option, useSelect } from './useSelect';
import { FORM_OPTION, setCount, setModal } from '../redux/settingsSlice';
import { AxiosResponse } from 'axios';
import { useToast } from './useToast';
import { ApiError } from '../utils';
import { setCustomer } from '../redux/cartSlice';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export const useCustomer = () => {
	const searchQuery = useSelector((state: RootState) => state.settings.searchQuery)
	const count = useSelector((state: RootState) => state.settings.count)
	const limit = useSelector((state: RootState) => state.settings.limit)
	const offset = useSelector((state: RootState) => state.settings.offset)
	const order = useSelector((state: RootState) => state.settings.order)
	const dispatch = useDispatch()
	const [ t ] = useTranslation()
    const actionForm = useSelector((state: RootState) => state.settings.actionForm)
	const { modalIsOpen, closeModal } = useModal()
	const queryClient = useQueryClient()
	const { notify, notifyError } = useToast()
	const { register, handleSubmit, control, reset, setError, formState: { errors, isDirty } } = useForm<CustomerDTO>()
	const idOptions: Option[] = [
		{ value: 'CC', label: "CC" },
		{ value: 'TI', label: "TI" },
		{ value: 'NIT', label: "NIT" },
	]
	const { handleChange, selectedOption } = useSelect(idOptions[0])

	const { mutate } = useMutation(CustomerService.addCustomer, {
		onSuccess(res: AxiosResponse<Customer>, variables, context) {
			// refresh queries, reset form, close modal form & notification feedback
			const msg = `the customer: ${res.data.full_name} was created successfully`
			queryClient.refetchQueries()
			reset()
			closeModal()
			notify(msg)
		},
		onError(error) {
			//send error notification feedback
			ApiError.getErrorMsg(error, setError, notifyError)
		},
	})

	//fetch customer list
	const { data, isSuccess, isLoading } = useQuery(
		["customer", searchQuery, limit, offset, order],
		CustomerService.getCustomers,
		{ keepPreviousData: true }
	)

	//fetch full customer list
	const { data: fullData, isSuccess: isSuccessFull } = useQuery(
        ["full-category", searchQuery, data?.count, offset, order],
        CustomerService.getFullCustomers
    )

	//submit form & choice the endpoint to use
	const onSubmit = (data: CustomerDTO) => {
		if(!isDirty) {
			notifyError( t('formAlert') )
		}
		if(actionForm === FORM_OPTION.create && isDirty) {
			mutate(data)
		}else if(actionForm === FORM_OPTION.edit && isDirty) {
			console.log('to edit: ', data)
		}
	}

	const handleModal = (customer: Customer | null) => {
		dispatch(setCustomer(customer))
		dispatch(setModal(true))
	}

	//set count and preload next page
	useEffect(() => {
		if(isSuccess) {
			dispatch(setCount(data.count))
			//prevent unnecessary request if the next page not exist
			if (limit + offset <= count && !searchQuery) {
				const nextOffset = offset + limit;
				queryClient.prefetchQuery(
					["customer", null, limit, nextOffset, order],
					CustomerService.getCustomers
				)
			}
		}
	}, [
		count,
		data,
		dispatch,
		isSuccess,
		limit,
		order,
		offset,
		queryClient,
		searchQuery
	])

	return {
		data,
		isSuccess,
		modalIsOpen,
		closeModal,
		register,
		handleSubmit,
		errors,
		onSubmit,
		idOptions,
		handleChange,
		selectedOption,
		control,
		handleModal,
		fullData,
		isSuccessFull,
		isLoading
	}
}
