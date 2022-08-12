import "./InvoiceDetail.styles.scss"
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useTranslation } from 'react-i18next';
import { Order } from "../../models/Stock.model";
import { ParserNumber } from "../../utils";
import { DateTime } from "luxon";

const InvoiceDetail = () => {
	const invoice = useSelector((state: RootState) => state.cart.invoice);
	const [ t ] = useTranslation()

	return (
		<div className="invoice-detail-container">
			<h2>{ t("invoice.title") } #: { invoice?.id }</h2>
			<div className="invoice-detail-content">
				<span>{ t("invoice.seller") }:</span>
				<span>{ invoice?.seller.first_name } { invoice?.seller.last_name }</span>
				<span>{ t("invoice.customer") }:</span>
				<span>{ invoice?.customer.full_name }</span>
				<span>{ t("created_at") }:</span>
				<span>{ DateTime.fromISO(invoice?.created_at ?? "").toLocaleString(DateTime.DATETIME_MED) }</span>
				<span>{ t("total") }:</span>
				<span>{ ParserNumber.colDecimals(invoice?.total ?? 0) } $</span>
			</div>
			<table>
				<thead>
					<tr>
						<th>{ t("id") }</th>
						<th>{ t("product.name") }</th>
						<th>{ t("product.unit") }</th>
						<th>{ t("sales.unit_price") }</th>
						<th>{ t("sales.quantity") }</th>
						<th>{ t("total") }</th>
					</tr>
				</thead>
				<tbody>
					{ invoice?.orders.map((item: Order) => (
						<tr key={item.id}>
							<td>{ item.id }</td>
							<td>{ item.product.name }</td>
							<td className="text-center">
								{ item.product.unit }
							</td>
							<td className="text-center">
								{ ParserNumber.colDecimals(item.product.price) } $
							</td>
							<td className="text-center">
								{ item.quantity }
							</td>
							<td className="text-center">
								{ ParserNumber.colDecimals(item.total) } $
							</td>
						</tr>
					)) }
				</tbody>
			</table>
		</div>
	);
};

export default InvoiceDetail;
