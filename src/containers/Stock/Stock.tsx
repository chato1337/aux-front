import { BiAddToQueue } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { Product } from "../../models/Inventory.model";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../../redux/store";
import { useCart } from '../../hooks/useCart';
import SearchForm from "../../components/SearchForm/SearchForm";
import './Stock.styles.scss'
import { ProductCart } from '../../models/cart.model.d';
import Pagination from "../../components/Pagination/Pagination";
import { setActionForm } from "../../redux/settingsSlice";
import { FaMoneyBillAlt, FaRegEdit } from "react-icons/fa";
import SimpleModal from "../../components/SimpleModal/SimpleModal";
import AddInventoryForm from "../../components/AddInventoryForm/AddInventoryForm";
import { ParserNumber } from "../../utils";

const Stock = () => {
	const products = useSelector((state: RootState) => state.cart.products)
	const { data, isSuccess, handleAddCart, quantity, handleChange, handleRemoveCart, handleModal, modalIsOpen, closeModal, handleCancelOrder } = useCart()
	const enableAdd = quantity > 0
	const total = products.reduce((prev, item: ProductCart) => item.subtotal + prev, 0)
	const enableCancel = products.length > 0
	const dispatch = useDispatch()
	const productSelected = useSelector((state: RootState) => state.inventory.productSelected)

	const handleEdit = (product: Product) => {
		dispatch(setActionForm("edit"))
		handleModal(product)
	}

	return (
		<div className="module-container">
			<div className="module-header">
				<h2>Stock-component</h2>
			</div>
			<div className="module-body">
				<div className="cart-search">
					<div>
						<h3>Product list:</h3>
						<SearchForm placeholder="product name" />
					</div>
					<table>
						<thead>
							<tr>
								<th>name</th>
								<th>price</th>
								<th>aviable</th>
								<th>quantity</th>
								<th>actions</th>
							</tr>
						</thead>
						<tbody>
							{ isSuccess && (
								data.results.map((item: Product) => (
									<tr key={item.id}>
										<td>{ item.name }</td>
										<td>{ ParserNumber.colDecimals(item.price) } $</td>
										<td>{ item.stock }</td>
										<td className="quantity-cell">
											<input
												type="number"
												value={quantity}
												onChange={ (e) => handleChange(e) }
												max={item.stock}
												min={1}
											/>
										</td>
										<td className="action-cell">
											<button disabled={!enableAdd} onClick={() => handleAddCart(item)}>
												<BiAddToQueue />
											</button>
											<button onClick={() => handleEdit(item)}>
												<FaRegEdit />
											</button>
										</td>
									</tr>
								))
							) }
						</tbody>
					</table>
					<Pagination />
				</div>
				<div className="table-order">
					<div>
						<h3>New order:</h3>
						<button
							className="btn btn-danger"
							onClick={handleCancelOrder}
							disabled={!enableCancel}
						>
							<RiDeleteBinLine />
							Cancel Order
						</button>
					</div>
					<table>
						<thead>
							<tr>
								<th>name</th>
								<th>price</th>
								<th>quantity</th>
								<th>subtotal</th>
								<th>actions</th>
							</tr>
						</thead>
						<tbody>
							{ products.length === 0 && (
								<tr>
									<td colSpan={5}>Not products yet 🧐</td>
								</tr>
							) }
							{ products.map((product: ProductCart) => (
								<tr key={product.id}>
									<td>{ product.name }</td>
									<td>{ ParserNumber.colDecimals(product.unit_price) } $</td>
									<td>{ product.quantity }</td>
									<td>{ ParserNumber.colDecimals(product.subtotal) } $</td>
									<td className="action-cell">
										<button onClick={() => handleRemoveCart(product) }>
											<RiDeleteBinLine />
										</button>
									</td>
								</tr>
							)) }
							<tr>
								<td className="total-text" colSpan={4}>
									Total
								</td>
								<td className="total-sum">
									{ ParserNumber.colDecimals(total) } $
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="payment-section">
					<button className="btn btn-success">
						<FaMoneyBillAlt />
						Pay Now
					</button>
				</div>
			</div>
			<SimpleModal modalIsOpen={modalIsOpen} closeModal={closeModal}>
				<AddInventoryForm
					productData={ productSelected ? productSelected : undefined }
				/>
			</SimpleModal>
		</div>
	);
};

export default Stock;
