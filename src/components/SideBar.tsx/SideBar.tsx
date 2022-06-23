import { Link } from 'react-router-dom';
import './SideBar.styles.scss'

const SideBar = () => {
    return (
		<div className="sidebar-container">
			<menu>
				<li className='menu-active'>
					<Link to='inventory'>Inventory</Link>
				</li>
				<li>
					<Link to='sales'>Sales</Link>
				</li>
				<li>Report</li>
				<li>About</li>
			</menu>
		</div>
	);
}

export default SideBar