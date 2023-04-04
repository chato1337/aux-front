import { useForm } from 'react-hook-form';
import {
	Organization,
	OrganizationResponse,
} from '../models/Organization.model.d';
import { useMutation } from 'react-query';
import { organizationService } from '../services/OrgService';
import { AxiosResponse } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setOrganization, setLogged } from '../redux/accountSlice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import { AccountService } from '../services/AccountService';
import { useState } from 'react';
import { CdnService } from '../services/cdnService';

export const useOrganization = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Organization>();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const logged = useSelector((state: RootState) => state.account.logged);
	const [file, setFile] = useState<File | null>(null);
	const [form, setForm] = useState<any>(null);

	const handleChangeFile = (event: any) => {
		const file = event.target.files[0] ?? null;
		if (file) {
			setFile(file);
		}
	};

	const onSubmit = async (data: any) => {
		if (file) {
			setForm(data);
			mutateLogo(file);
		}
	};

	const { mutate } = useMutation(organizationService.AddOrganization, {
		onSuccess(data, variables, context) {
			const res: AxiosResponse<OrganizationResponse> = data;
			dispatch(setOrganization(res.data.organization));
			dispatch(setLogged(res.data.staff));
			AccountService.removeUser();
			AccountService.store(res.data.staff);
			navigate('/dashboard', { replace: true });
		},
	});

	const { mutate: mutateLogo } = useMutation(CdnService.addFile, {
		onSettled(data, error, variables, context) {
			if (typeof data !== 'undefined') {
				const logoId = data.$id;
				const orgData = { ...form, owner: logged?.user.id, logo: logoId }
				mutate(orgData)
			}
		},
	});

	return {
		register,
		handleSubmit,
		errors,
		onSubmit,
		file,
		handleChangeFile,
	};
};
