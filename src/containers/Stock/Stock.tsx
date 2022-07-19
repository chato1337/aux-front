import { BiAddToQueue } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import SimpleModal from "../../components/SimpleModal/SimpleModal";
import { useInventory } from "../../hooks/useInventory";
import { Product } from "../../models/Inventory.model";
import AddStockForm from '../../components/AddStockForm/AddStockForm';
import { useStock } from '../../hooks/useStock';

const Stock = () => {
	const { data, isSuccess } = useInventory();
    const { modalIsOpen, handleModal, closeModal, productSelected } = useStock()

	return (
		<div className="stock-container">
			<div className="stock-header">
				<h2>Stock-component</h2>
			</div>
			<div className="stock-products">
				<h3>your products in stock</h3>
				...not aviable yet :|
			</div>
			<div className="non-stock-products">
				<h3>products aviables for stock</h3>
				{isSuccess && (
					<table>
						<thead>
							<tr>
								<th>Name</th>
								<th>Category</th>
								<th>Stock</th>
								<th>Unit</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{ isSuccess && data.map((product: Product) => {
								return (
									<tr key={product.id}>
										<td>{product.name}</td>
										<td>{product.category.name}</td>
										<td>{product.stock}</td>
										<td>{product.unit}</td>
										<td className="action-cell">
											<button onClick={() => handleModal(product)}>
												<BiAddToQueue />
											</button>
											<button>
												<RiDeleteBinLine />
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				)}
			</div>
            <SimpleModal
                modalIsOpen={modalIsOpen}
                closeModal={closeModal}
            >
                <AddStockForm
                    productData={productSelected}
                />
            </SimpleModal>
		</div>
	);
};

export default Stock;
