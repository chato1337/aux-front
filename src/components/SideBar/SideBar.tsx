import { Link, useLocation } from 'react-router-dom';
import './SideBar.styles.scss'
import { BsBoxSeam, BsUpcScan } from 'react-icons/bs'
import { FiSettings } from 'react-icons/fi'
import { MdOutlineCategory } from 'react-icons/md'
import { RiInboxUnarchiveLine } from 'react-icons/ri'
import { useTranslation } from 'react-i18next';
import { FaFileInvoiceDollar, FaHospitalUser } from 'react-icons/fa';
import { ImUsers } from 'react-icons/im'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { ROLES } from '../../models/User.model.d';

const SideBar = () => {
	const location = useLocation()
	const { t } = useTranslation();
	const staff = useSelector((state:RootState) => state.account.logged)

    return (
		<div className="sidebar-container">
			<menu>
				<li className={ location.pathname === '/dashboard/category' ? 'menu-active' : '' }>
					<Link to='category'>
						<MdOutlineCategory />
						{ t('category.title') }
					</Link>
				</li>
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
						{ t('sales.title') }
					</Link>
				</li>
				<li className={ location.pathname === '/dashboard/invoice' ? 'menu-active' : '' }>
					<Link to='invoice'>
						<FaFileInvoiceDollar />
						{ t('invoice.title') }
					</Link>
				</li>
				<li className={ location.pathname === '/dashboard/customer' ? 'menu-active' : '' }>
					<Link to='customer'>
						<ImUsers />
						{ t('customer.plural') }
					</Link>
				</li>
				<li className={ location.pathname === '/dashboard/user-management' ? 'menu-active' : '' }>
					<Link to='user-management'>
						<FaHospitalUser />
						{ t('user.manage') }
					</Link>
				</li>
				{ staff && staff.user.role.name === ROLES.owner && (
					<li className={ location.pathname === '/dashboard/settings' ? 'menu-active' : '' }>
						<Link to='settings'>
							<FiSettings />
							{ t('settings.title') }
						</Link>
					</li>
				) }
			</menu>
		</div>
	);
}

export default SideBar
