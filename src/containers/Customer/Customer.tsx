import { useTranslation } from 'react-i18next';
import { BiAddToQueue } from 'react-icons/bi';
import AddCustomerForm from '../../components/AddCustomerForm/AddCustomerForm';
import SimpleModal from '../../components/SimpleModal/SimpleModal';
import { useCustomer } from '../../hooks/useCustomer';
import { Customer as CustomerModel } from '../../models/User.model.d';
import { useDispatch } from 'react-redux';
import { FORM_OPTION, setActionForm } from '../../redux/settingsSlice';
import { DateTime } from 'luxon';
import Pagination from '../../components/Pagination/Pagination';
import SearchForm from '../../components/SearchForm/SearchForm';

const Customer = () => {
	const { data, isSuccess, modalIsOpen, closeModal, handleModal } = useCustomer()
	const [ t ] = useTranslation()
	const dispatch = useDispatch()
	const handleCreate = () => {
		dispatch(setActionForm(FORM_OPTION.create))
		handleModal(null)
	}

	const handleEdit = (customer: CustomerModel) => {
		dispatch(setActionForm(FORM_OPTION.edit))
		handleModal(customer)
	}

	return (
		<div className="module-container">
			<div className="module-header">
				<h2>Customers</h2>
				<button onClick={() => handleCreate()} >
                    <BiAddToQueue />
                    { t('category.add') }
                </button>
				<SearchForm placeholder='customer name' />
			</div>
			<div className="module-table">
				<table>
					<thead>
						<tr>
							<th>
								fullname
							</th>
							<th>
								leverage
							</th>
							<th>
								crated at
							</th>
							<th>
								actions
							</th>
						</tr>
					</thead>
					<tbody>
						{ isSuccess && data.results.map((item: CustomerModel) => (
							<tr key={item.id}>
								<td>{item.full_name}</td>
								<td>{item.leverage}</td>
								<td>{ DateTime.fromISO(item.created_at).toLocaleString(DateTime.DATETIME_MED) }</td>
								<td className='action-cell'>
									<button onClick={() => handleEdit(item)}>Edit</button>
								</td>
							</tr>
						)) }
					</tbody>
				</table>
			</div>
			<Pagination />
			<SimpleModal modalIsOpen={modalIsOpen} closeModal={closeModal}>
				<AddCustomerForm />
			</SimpleModal>
		</div>
	);
};

export default Customer;
