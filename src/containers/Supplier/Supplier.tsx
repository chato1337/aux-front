import AddSupplierForm from '../../components/AddSupplierForm/AddSupplierForm';
import SimpleModal from '../../components/SimpleModal/SimpleModal'
import { useSupplier } from '../../hooks/useSupplier';
import { Supplier as SupplierModel } from '../../models/Supplier.model';
import { useTranslation } from 'react-i18next';

const Supplier = () => {
    const { modalIsOpen, closeModal, handleModal, data, isSuccess, supplierSelected } = useSupplier()
	const { t } = useTranslation();

    return (
		<div className="supplier-container">
			<div className="supplier-header">
				<h1>{ t('supplier.title') }</h1>
				<button onClick={() => handleModal(null)}>{ t('supplier.add') }</button>
			</div>
			<div className="supplier-table">
				<table>
					<thead>
						<tr>
							<th>{ t('supplier.name') }</th>
							<th>{ t('supplier.id') }</th>
							<th>{ t('supplier.phone') }</th>
							<th>{ t('supplier.email') }</th>
							<th>{ t('actions') }</th>
						</tr>
					</thead>
					<tbody>
                        {
                            isSuccess && data.map((item: SupplierModel) => {
                                return(
                                    <tr key={item.id}>
                                        <td>{ item.name }</td>
                                        <td>{ item.identifier }</td>
                                        <td>{ item.phone }</td>
                                        <td>{ item.email }</td>
										<td className='action-cell'>
											<button onClick={() => handleModal(item)}>{ t('table.edit') }</button>
											<button>{ t('table.delete') }</button>
										</td>
                                    </tr>
                                )
                            })
                        }
					</tbody>
				</table>
			</div>
			<SimpleModal modalIsOpen={modalIsOpen} closeModal={closeModal}>
				<AddSupplierForm supplierData={ supplierSelected ? supplierSelected : undefined } />
			</SimpleModal>
		</div>
	);
}

export default Supplier