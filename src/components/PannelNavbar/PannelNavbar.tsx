import "./PannelNavbar.styles.scss"
import { IoNotificationsCircle } from 'react-icons/io5'
import LangSelector from "../LangSelector/LangSelector";
import { useSelector } from 'react-redux';
import { RootState } from "../../redux/store";
import Tooltip from "../Tooltip/Tooltip";
import { useAuth } from '../../hooks/useAuth';


const PannelNavbar = () => {
	const staff = useSelector((state: RootState) => state.account.staff)
	const { handleLogout } = useAuth()

	return (
		<header className="pannel-nav-container">
			<menu>
				<ul>
                    <IoNotificationsCircle size={24}/>
                </ul>
				<ul>
					<Tooltip tooltipName={staff ? `${staff.first_name} ${staff.last_name}` : 'user-error'}>
						<menu>
							<ul>My profile</ul>
							<ul onClick={handleLogout}>Logut</ul>
						</menu>
					</Tooltip>
				</ul>
				<ul>
					<LangSelector />
				</ul>
			</menu>
		</header>
	);
};

export default PannelNavbar;
