import { RiDeleteBinLine } from "react-icons/ri";
import { Product } from "../../models/Inventory.model";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { useCart } from "../../hooks/useCart";
import SearchForm from "../../components/SearchForm/SearchForm";
import "./Stock.styles.scss";
import { ProductCart } from "../../models/cart.model.d";
import Pagination from "../../components/Pagination/Pagination";
import { FORM_OPTION, setActionForm } from "../../redux/settingsSlice";
import { FaMoneyBillAlt } from "react-icons/fa";
import SimpleModal from "../../components/SimpleModal/SimpleModal";
import AddInventoryForm from "../../components/AddInventoryForm/AddInventoryForm";
import { ParserNumber } from "../../utils";
import Payment from "../../components/Payment/Payment";
import { useTranslation } from 'react-i18next';
import ProductRow from "../../components/ProductRow/ProductRow";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const Stock = () => {
	const products = useSelector((state: RootState) => state.cart.products);
	const {
		data,
		isSuccess,
		handleRemoveCart,
		handleModal,
		modalIsOpen,
		closeModal,
		handleCancelOrder,
		handlePay,
		total,
		isLoading
	} = useCart();
	const enableCancel = products.length > 0;
	const dispatch = useDispatch();
	const productSelected = useSelector(
		(state: RootState) => state.inventory.productSelected
	);
	const actionForm = useSelector(
		(state: RootState) => state.settings.actionForm
	);

	const [ t ] = useTranslation()

	const handleEdit = (product: Product) => {
		dispatch(setActionForm(FORM_OPTION.edit));
		handleModal(product);
	};

	return (
		<div className="module-container">
			<div className="module-header">
				<h2>{ t('sales.name') }</h2>
			</div>
			<div className="module-body">
				<div className="cart-search">
					<div>
						<h3>{ t('product.product_list') }:</h3>
						<SearchForm placeholder={ t('product.name') } numberResults={5} />
					</div>
					<div className="stock-table">
						<table>
							<thead>
								<tr>
									<th>{ t('name') }</th>
									<th>{ t('product.price') }</th>
									<th>{ t('sales.aviable') }</th>
									<th>{ t('sales.quantity') }</th>
									<th>{ t('actions') }</th>
								</tr>
							</thead>
							<tbody>
								{isSuccess &&
									data.results.map((item: Product) => (
										<ProductRow key={item.id} product={item} handleEdit={handleEdit} />
									))}
								{ isLoading && (
									<tr>
										<td colSpan={5}>
											<LoadingSpinner />
										</td>
									</tr>
								) }
							</tbody>
						</table>
					</div>
					<Pagination />
				</div>
				<div className="table-order">
					<div>
						<h3>{ t('sales.new_order') }:</h3>
						<button
							className="btn btn-danger"
							onClick={handleCancelOrder}
							disabled={!enableCancel}
						>
							<RiDeleteBinLine />
							{ t('sales.cancel') }
						</button>
					</div>
					<table>
						<thead>
							<tr>
								<th>{ t('name') }</th>
								<th>{ t('product.price') }</th>
								<th>{ t('sales.quantity') }</th>
								<th>{ t('sales.subtotal') }</th>
								<th>{ t('actions') }</th>
							</tr>
						</thead>
						<tbody>
							{products.length === 0 && (
								<tr>
									<td className="no-results" colSpan={5}>{ t('sales.no_products') } 🧐</td>
								</tr>
							)}
							{products.map((product: ProductCart) => (
								<tr key={product.id}>
									<td>{product.name}</td>
									<td className="text-center">{ParserNumber.colDecimals(product.unit_price)} $</td>
									<td className="text-center">{product.quantity}</td>
									<td className="text-center">{ParserNumber.colDecimals(product.subtotal)} $</td>
									<td className="action-cell">
										<button onClick={() => handleRemoveCart(product)}>
											<RiDeleteBinLine />
										</button>
									</td>
								</tr>
							))}
							<tr>
								<td className="total-text" colSpan={4}>
									{ t('total') }
								</td>
								<td className="total-sum text-center">
									{ParserNumber.colDecimals(total)} $
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="payment-section">
					<button className="btn btn-success" onClick={handlePay}>
						<FaMoneyBillAlt />
						{ t('sales.review') }
					</button>
				</div>
			</div>
			<SimpleModal modalIsOpen={modalIsOpen} closeModal={closeModal}>
				{actionForm === FORM_OPTION.pay ? (
					<Payment />
				) : (
					<AddInventoryForm
						productData={productSelected ? productSelected : undefined}
					/>
				)}
			</SimpleModal>
		</div>
	);
};

export default Stock;
