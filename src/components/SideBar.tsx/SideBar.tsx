import { Link, useLocation } from 'react-router-dom';
import './SideBar.styles.scss'
import { BsBoxSeam } from 'react-icons/bs'
import { FiSettings } from 'react-icons/fi'
import { RiInboxUnarchiveLine } from 'react-icons/ri'

const SideBar = () => {
	const location = useLocation()

    return (
		<div className="sidebar-container">
			<menu>
				<li className={ location.pathname === '/dashboard/inventory' ? 'menu-active' : '' }>
					<Link to='inventory'>
						<BsBoxSeam />
						Inventory
					</Link>
				</li>
				<li className={ location.pathname === '/dashboard/stock' ? 'menu-active' : '' }>
					<Link to='stock'>
						<RiInboxUnarchiveLine />
						Stock
					</Link>
				</li>
				<li className={ location.pathname === '/dashboard/settings' ? 'menu-active' : '' }>
					<Link to='inventory'>
						<FiSettings />
						Settings
					</Link>
				</li>
				<li className={ location.pathname === '/dashboard/sales' ? 'menu-active' : '' }>
					<Link to='sales'>Sales</Link>
				</li>
				<li className={ location.pathname === '/dashboard/report' ? 'menu-active' : '' }>
					<Link to='report'>Report</Link>
				</li>
				<li className={ location.pathname === '/dashboard/about' ? 'menu-active' : '' }>
					<Link to='about'>About</Link>
				</li>
			</menu>
		</div>
	);
}

export default SideBar