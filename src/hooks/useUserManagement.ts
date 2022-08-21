import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useQuery } from 'react-query';
import { organizationService } from '../services/OrgService';

export const useUserManagement = () => {
	const organization = useSelector((state: RootState) => state.account.organization)
	const searchQuery = useSelector((state: RootState) => state.settings.searchQuery)
	const limit = useSelector((state: RootState) => state.settings.limit)
	const offset = useSelector((state: RootState) => state.settings.offset)
	const order = useSelector((state: RootState) => state.settings.order)

	const { data, isSuccess, isLoading } = useQuery(
		["user-management", searchQuery, limit, offset, order, organization?.owner.id],
		organizationService.getOrgUser,
		{ keepPreviousData: true }
	)

	return {
		data,
		isLoading,
		isSuccess
	}
}
