import AddSupplierForm from '../../components/AddSupplierForm/AddSupplierForm';
import SimpleModal from '../../components/SimpleModal/SimpleModal'
import { useSupplier } from '../../hooks/useSupplier';
import { Supplier as SupplierModel } from '../../models/Supplier.model';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { FORM_OPTION, setActionForm } from '../../redux/settingsSlice';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FaRegEdit } from 'react-icons/fa';
import SearchForm from '../../components/SearchForm/SearchForm';
import { BiAddToQueue } from 'react-icons/bi';
import Pagination from '../../components/Pagination/Pagination';
import Ordering from '../../components/Ordering/Ordering';

const Supplier = () => {
    const { modalIsOpen, closeModal, handleModal, data, isSuccess, supplierSelected } = useSupplier()
	const { t } = useTranslation();
	const dispatch = useDispatch()

	const handleEdit = (supplier: SupplierModel) => {
        dispatch(setActionForm(FORM_OPTION.edit))
        handleModal(supplier)
    }

    const handleCreate = () => {
        dispatch(setActionForm(FORM_OPTION.create))
        handleModal(null)
    }


    return (
		<div className="module-container">
			<div className="module-header">
				<h2>{ t('supplier.title') }</h2>
				<button onClick={() => handleCreate()}>
					<BiAddToQueue />
					{ t('supplier.add') }
				</button>
				<SearchForm placeholder={ t('supplier.name') } />
			</div>
			<div className="module-table">
				<table>
					<thead>
						<tr>
							<th>
								<Ordering orderField='id'>
									{ t('id') }
								</Ordering>
							</th>
							<th>
								<Ordering orderField='name'>
									{ t('supplier.name') }
								</Ordering>
							</th>
							<th>
								<Ordering orderField='identifier'>
									{ t('supplier.id') }
								</Ordering>
							</th>
							<th>
								<Ordering orderField='phone'>
									{ t('supplier.phone') }
								</Ordering>
							</th>
							<th>
								<Ordering orderField='email'>
									{ t('supplier.email') }
								</Ordering>
							</th>
							<th>{ t('actions') }</th>
						</tr>
					</thead>
					<tbody>
                        {
                            isSuccess && data.results.map((item: SupplierModel) => {
                                return(
                                    <tr key={ item.id }>
										<td>{ item.id }</td>
                                        <td>{ item.name }</td>
                                        <td>{ item.identifier }</td>
                                        <td>{ item.phone }</td>
                                        <td>{ item.email }</td>
										<td className='action-cell'>
											<button className='btn btn-outline' onClick={() => handleEdit(item)}>
												<FaRegEdit />
												{ t('table.edit') }
											</button>
											<button className='btn btn-danger'>
												<RiDeleteBinLine />
												{ t('table.delete') }
											</button>
										</td>
                                    </tr>
                                )
                            })
                        }
					</tbody>
				</table>
			</div>
			<Pagination />
			<SimpleModal modalIsOpen={modalIsOpen} closeModal={closeModal}>
				<AddSupplierForm supplierData={ supplierSelected ? supplierSelected : undefined } />
			</SimpleModal>
		</div>
	);
}

export default Supplier
