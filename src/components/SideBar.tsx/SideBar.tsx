import { Link, useLocation } from 'react-router-dom';
import './SideBar.styles.scss'
import { BsBoxSeam, BsUpcScan } from 'react-icons/bs'
import { FiSettings } from 'react-icons/fi'
import { RiInboxUnarchiveLine } from 'react-icons/ri'
import { useTranslation } from 'react-i18next';

const SideBar = () => {
	const location = useLocation()
	const { t } = useTranslation();

    return (
		<div className="sidebar-container">
			<menu>
				<li className={ location.pathname === '/dashboard/supplier' ? 'menu-active' : '' }>
					<Link to='supplier'>
						<BsBoxSeam />
						{ t('supplier.title') }
					</Link>
				</li>
				<li className={ location.pathname === '/dashboard/inventory' ? 'menu-active' : '' }>
					<Link to='inventory'>
						<BsUpcScan />
						{ t('inventory') }
					</Link>
				</li>
				<li className={ location.pathname === '/dashboard/stock' ? 'menu-active' : '' }>
					<Link to='stock'>
						<RiInboxUnarchiveLine />
						{ t('sales') }
					</Link>
				</li>
				<li className={ location.pathname === '/dashboard/settings' ? 'menu-active' : '' }>
					<Link to='settings'>
						<FiSettings />
						{ t('settings') }
					</Link>
				</li>
			</menu>
		</div>
	);
}

export default SideBar