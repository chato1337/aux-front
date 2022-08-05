import "./PannelNavbar.styles.scss"
import { IoNotificationsCircle } from 'react-icons/io5'
import LangSelector from "../LangSelector/LangSelector";
import { useSelector } from 'react-redux';
import { RootState } from "../../redux/store";
import Tooltip from "../Tooltip/Tooltip";
import { useAuth } from '../../hooks/useAuth';


const PannelNavbar = () => {
	const user = useSelector((state: RootState) => state.account.user)
	const { handleLogout } = useAuth()

	return (
		<header className="pannel-nav-container">
			<menu>
				<ul>
                    <IoNotificationsCircle size={24}/>
                </ul>
				<ul>
					<Tooltip tooltipName={user ? user.name : 'user-error'}>
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
