import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Product } from '../models/Inventory.model';
import { InventoryService } from '../services/InventoryService';
import { useModal } from './useModal';
import { Option, useSelect } from './useSelect';
import { useDispatch, useSelector } from 'react-redux';
import { FORM_OPTION, setCount, setModal } from '../redux/settingsSlice';
import { useTranslation } from 'react-i18next';
import { AxiosResponse } from 'axios';
import { useToast } from './useToast';
import { RootState } from '../redux/store';
import { ApiError } from '../utils';
import { setInventory } from '../redux/InventorySlice';
import { useFileUpload } from './useFileUpload';
import { CdnService } from '../services/cdnService';

const initialSupplier: Option = {
	value: 0,
	label: 'select a supplier...',
};

export interface FormValues {
	suppliers: Option[];
}

export const useInventory = () => {
	const productSelected = useSelector(
		(state: RootState) => state.inventory.productSelected
	);
	const { modalIsOpen, closeModal } = useModal();
	const { selectedOption, handleChange } = useSelect(initialSupplier);
	const dispatch = useDispatch();
	const [t] = useTranslation();
	const queryClient = useQueryClient();
	const { notify, notifyError } = useToast();
	const actionForm = useSelector(
		(state: RootState) => state.settings.actionForm
	);
	const searchQuery = useSelector(
		(state: RootState) => state.settings.searchQuery
	);
	const limit = useSelector((state: RootState) => state.settings.limit);
	const offset = useSelector((state: RootState) => state.settings.offset);
	const count = useSelector((state: RootState) => state.settings.count);
	const order = useSelector((state: RootState) => state.settings.order);
	const { file, handleChange: handleChangeFile } = useFileUpload();
	const [form, setForm] = useState<Product | null>(null);

	const handleModal = (product: Product | null) => {
		dispatch(setModal(true));
		dispatch(setInventory(product));
	};

	const {
		register,
		handleSubmit,
		reset,
		control,
		setError,
		formState: { errors, isDirty },
	} = useForm<Product>();

	const onSubmit = (data: Product) => {
		if (!isDirty) {
			notify(t('formAlert'));
		}
		setForm(data);

		if (actionForm === FORM_OPTION.create && isDirty && file) {
			mutateFile(file);
		}

		if (productSelected && actionForm === FORM_OPTION.edit && !file) {
			const editForm = { ...data, id: productSelected.id };
			mutateEdit(editForm);
		}

		if (
			productSelected &&
			actionForm === FORM_OPTION.edit &&
			file &&
			!productSelected.image
		) {
			mutateFile(file)
		}

		if (
			productSelected &&
			actionForm === FORM_OPTION.edit &&
			file &&
			productSelected.image &&
			CdnService.clearFileName(file.name) !== productSelected.image
		) {
			mutateUpdateFile(productSelected.image)
		}
	};

	//update file
	const { mutate: mutateUpdateFile } = useMutation(CdnService.removeFile, {
		onSuccess(data, variables, context) {
			if (file) {
				mutateFile(file)
			}
		},
	})

	//upload img
	const { mutate: mutateFile } = useMutation(CdnService.addFile, {
		onSuccess(data, variables, context) {
			if (data && actionForm === FORM_OPTION.create) {
				const payload = { ...form, image: data.$id };
				mutate(payload);
			}
			if (data && actionForm === FORM_OPTION.edit && productSelected) {
				const payload = { ...form, image: data.$id, id: productSelected.id };
				mutateEdit(payload);
			}
		},
	});

	//create product
	const { mutate } = useMutation(InventoryService.addInventory, {
		onSuccess(data, variables, context) {
			const res: AxiosResponse<Product> = data;
			const msg = `${t('category.createMsg1')} ${res.data.name} ${t(
				'createMsg2'
			)}`;
			reset();
			queryClient.refetchQueries();
			closeModal();
			notify(msg);
		},
	});

	//put product
	const { mutate: mutateEdit } = useMutation(InventoryService.editInventory, {
		onSuccess(data, variables, context) {
			const res: AxiosResponse<Product> = data;
			const msg = `${t('product.createMsg1')} ${res.data.name} ${t(
				'createMsg2'
			)}`;
			queryClient.refetchQueries();
			closeModal();
			notify(msg);
		},
		onError(error: any) {
			ApiError.getErrorMsg(error, setError, notifyError);
		},
	});

	const { data, isSuccess, isLoading } = useQuery(
		['inventory', searchQuery, limit, offset, order],
		InventoryService.getInventories,
		{ keepPreviousData: true }
	);

	//preload next category
	useEffect(() => {
		if (isSuccess) {
			dispatch(setCount(data.count));
			//prevent unnecessary request if the next page not exist
			if (limit + offset <= count && !searchQuery) {
				const nextOffset = offset + limit;
				queryClient.prefetchQuery(
					['inventory', null, limit, nextOffset, order],
					InventoryService.getInventories
				);
			}
		}
	}, [
		data,
		dispatch,
		isSuccess,
		limit,
		offset,
		queryClient,
		count,
		order,
		searchQuery,
	]);

	return {
		data,
		isSuccess,
		modalIsOpen,
		productSelected,
		closeModal,
		handleModal,
		errors,
		register,
		handleSubmit,
		onSubmit,
		selectedOption,
		handleChange,
		control,
		isDirty,
		isLoading,
		handleChangeFile,
		file
	};
};
