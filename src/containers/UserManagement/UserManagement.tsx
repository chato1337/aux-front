import { DateTime } from "luxon";
import { useTranslation } from "react-i18next";
import { useUserManagement } from '../../hooks/useUserManagement';
import { Staff } from "../../models/User.model";

const UserManagement = () => {
	const [t] = useTranslation();
	const { data, isLoading, isSuccess } = useUserManagement()

	return (
		<div className="module-container">
			<div className="module-header">
				<h2>{t("user.manage")}</h2>
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
									<td>{ DateTime.fromISO(item.created_at).toLocaleString(DateTime.DATETIME_MED) }</td>
									<td className="action-cell">
										<button>edit</button>
									</td>
								</tr>
							))
						) }
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default UserManagement;
