import AddSupplierForm from '../../components/AddSupplierForm/AddSupplierForm';
import SimpleModal from '../../components/SimpleModal/SimpleModal'
import { useSupplier } from '../../hooks/useSupplier';
import { Supplier as SupplierModel } from '../../models/Supplier.model';

const Supplier = () => {
    const { modalIsOpen, closeModal, handleModal, data, isSuccess } = useSupplier()

    return (
		<div className="supplier-container">
			<div className="supplier-header">
				<h1>Suppliers</h1>
				<button onClick={handleModal}>add supplier</button>
			</div>
			<div className="supplier-table">
				<table>
					<thead>
						<tr>
							<th>name</th>
							<th>identifier</th>
							<th>phone</th>
							<th>email</th>
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
                                    </tr>
                                )
                            })
                        }
					</tbody>
				</table>
			</div>
			<SimpleModal modalIsOpen={modalIsOpen} closeModal={closeModal}>
				<AddSupplierForm />
			</SimpleModal>
		</div>
	);
}

export default Supplier