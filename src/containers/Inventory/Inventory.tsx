import AddInventoryForm from "../../components/AddInventoryForm/AddInventoryForm";
import SimpleModal from "../../components/SimpleModal/SimpleModal";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiAddToQueue } from "react-icons/bi";
import "./Inventory.styles.scss";
import { useInventory } from "../../hooks/useInventory";
import { Product } from "../../models/Inventory.model.d";
import { useTranslation } from "react-i18next";
import SearchForm from "../../components/SearchForm/SearchForm";
import { useDispatch } from "react-redux";
import { FORM_OPTION, setActionForm } from "../../redux/settingsSlice";
import Pagination from "../../components/Pagination/Pagination";
import Ordering from "../../components/Ordering/Ordering";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const InventoryComponent = () => {
	const {
		data,
		isSuccess,
		modalIsOpen,
		productSelected,
		closeModal,
		handleModal,
		isLoading
	} = useInventory();
	const [t] = useTranslation();
	const dispatch = useDispatch();

	const handleEdit = (product: Product) => {
		dispatch(setActionForm(FORM_OPTION.edit));
		handleModal(product);
	};

	const handleCreate = () => {
		dispatch(setActionForm(FORM_OPTION.create));
		handleModal(null);
	};

	return (
		<div className="module-container">
			<div className="module-header">
				<h2>{t("product.title")}</h2>
				<button onClick={() => handleCreate()}>
					<BiAddToQueue />
					{t("product.add")}
				</button>
				<SearchForm placeholder={t("product.name")} />
			</div>
			<div className="module-table">
				<table>
					<thead>
						<tr>
							<th>
								<Ordering orderField="id">{t("id")}</Ordering>
							</th>
							<th>
								<Ordering orderField="name">
									{t("product.name")}
								</Ordering>
							</th>
							<th>
								<Ordering orderField="category">
									{t("category.title")}
								</Ordering>
							</th>
							<th>{t("product.stock")}</th>
							<th>{t("product.unit")}</th>
							<th>{t("actions")}</th>
						</tr>
					</thead>
					<tbody>
						{isSuccess &&
							data.results.map((product: Product) => {
								return (
									<tr key={product.id}>
										<td className="text-center">
											{product.id}
										</td>
										<td>{product.name}</td>
										<td>{product.category?.name}</td>
										<td className="text-center">
											{product.stock}
										</td>
										<td>{product.unit}</td>
										<td className="action-cell">
											<button
												className="btn btn-outline"
												onClick={() =>
													handleEdit(product)
												}
											>
												<FaRegEdit />
											</button>
											<button className="btn btn-danger">
												<RiDeleteBinLine />
											</button>
										</td>
									</tr>
								);
							})}
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
			<SimpleModal modalIsOpen={modalIsOpen} closeModal={closeModal}>
				<AddInventoryForm
					productData={productSelected ? productSelected : undefined}
				/>
			</SimpleModal>
		</div>
	);
};

export default InventoryComponent;
