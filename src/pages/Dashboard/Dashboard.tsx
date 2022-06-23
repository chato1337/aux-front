import { Outlet } from 'react-router-dom';
import Pannel from '../../containers/Pannel/Pannel';

const Dashboard = () => {
	return (
		<div className="dashboard-container">
			<Pannel>
				<Outlet />
			</Pannel>
		</div>
	);
};

export default Dashboard