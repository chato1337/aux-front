import "./PannelNavbar.styles.scss"
import { IoNotificationsCircle } from 'react-icons/io5'
import LangSelector from "../LangSelector/LangSelector";


const PannelNavbar = () => {
	return (
		<header className="pannel-nav-container">
			<menu>
				<ul>
                    <IoNotificationsCircle size={24}/>
                </ul>
				<ul>Username</ul>
				<ul>
					<LangSelector />
				</ul>
			</menu>
		</header>
	);
};

export default PannelNavbar;
