import { DateTime } from "luxon";
import { useTranslation } from "react-i18next";
import AddUserForm from "../../components/AddUserForm/AddUserForm";
import Pagination from "../../components/Pagination/Pagination";
import SearchForm from "../../components/SearchForm/SearchForm";
import SimpleModal from "../../components/SimpleModal/SimpleModal";
import { useUserManagement } from '../../hooks/useUserManagement';
import { Staff } from "../../models/User.model";
import { useDispatch } from 'react-redux';
import { FORM_OPTION, setActionForm } from "../../redux/settingsSlice";
import { BiAddToQueue } from "react-icons/bi";

const UserManagement = () => {
	const [t] = useTranslation();
	const dispatch = useDispatch()
	const { data, isLoading, isSuccess, modalIsOpen, closeModal, handleModal, user } = useUserManagement()
	const handleEdit = (user: Staff) => {
		dispatch(setActionForm(FORM_OPTION.edit))
		handleModal(user)
	}

	const handleCreate = () => {
		dispatch(setActionForm(FORM_OPTION.join))
		handleModal(null)
	}

	return (
		<div className="module-container">
			<div className="module-header">
				<h2>{t("user.manage")}</h2>
				<button onClick={ () => handleCreate() }>
					<BiAddToQueue />
					add user
				</button>
				<SearchForm placeholder="staff name" />
			</div>
			<div className="module-table">
				<table>
					<thead>
						<tr>
							<th>
								{ t("user.first_name") }
							</th>
							<th>
								{ t("user.last_name") }
							</th>
							<th>
								{ t("user.role") }
							</th>
							<th>
								{ t("supplier.email") }
							</th>
							<th>
								{ t("supplier.phone") }
							</th>
							<th>
								{ t("created_at") }
							</th>
							<th>
								{ t("actions") }
							</th>
						</tr>
					</thead>
					<tbody>
						{ isLoading && 'loading...' }
						{ isSuccess && (
							data.results.map((item: Staff) => (
								<tr key={item.id}>
									<td>{ item.first_name }</td>
									<td>{ item.last_name }</td>
									<td>{ item.user?.role?.name }</td>
									<td>{ item.user?.email }</td>
									<td>{ item.user?.phone }</td>
									<td>{ DateTime.fromISO(item.created_at).toLocaleString(DateTime.DATETIME_MED) }</td>
									<td className="action-cell">
										<button onClick={ () => handleEdit(item) }>edit</button>
									</td>
								</tr>
							))
						) }
					</tbody>
				</table>
			</div>
			<Pagination />
			<SimpleModal modalIsOpen={modalIsOpen} closeModal={closeModal}>
				<AddUserForm user={ user }/>
			</SimpleModal>
		</div>
	);
};

export default UserManagement;
