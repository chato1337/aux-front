import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { useQuery, useQueryClient } from 'react-query';
import { organizationService } from '../services/OrgService';
import { useEffect, useState } from 'react';
import { setCount, setModal } from '../redux/settingsSlice';
import { useModal } from './useModal';
import { Staff } from '../models/User.model';

export const useUserManagement = () => {
	const organization = useSelector((state: RootState) => state.account.organization)
	const searchQuery = useSelector((state: RootState) => state.settings.searchQuery)
	const limit = useSelector((state: RootState) => state.settings.limit)
	const offset = useSelector((state: RootState) => state.settings.offset)
	const order = useSelector((state: RootState) => state.settings.order)
	const count = useSelector((state: RootState) => state.settings.count)
	const dispatch = useDispatch()
	const queryClient = useQueryClient()
	const { modalIsOpen, closeModal } = useModal()
	const [ user, setUser ] = useState<Staff | null>(null)

	const { data, isSuccess, isLoading } = useQuery(
		["user-management", searchQuery, limit, offset, order, organization?.owner.id],
		organizationService.getOrgUser,
		{ keepPreviousData: true },
	)

	const handleModal = (user: Staff | null) => {
		dispatch(setModal(true))
		setUser(user)
	}

	    //preload next category
	useEffect(() => {
		if (isSuccess) {
			dispatch(setCount(data.count));
			//prevent unnecessary request if the next page not exist
			if (limit + offset <= count && !searchQuery) {
				const nextOffset = offset + limit;
				queryClient.prefetchQuery(
					["user-management", null, limit, nextOffset, order],
					organizationService.getOrgUser,
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
		isLoading,
		isSuccess,
		modalIsOpen,
		closeModal,
		handleModal,
		user
	}
}
