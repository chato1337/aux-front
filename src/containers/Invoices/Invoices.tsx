import Pagination from "../../components/Pagination/Pagination";
import SearchForm from "../../components/SearchForm/SearchForm";
import { useInvoice } from "../../hooks/useInvoice";
import { Bill } from '../../models/Stock.model.d';
import { ParserNumber } from "../../utils";

const Invoices = () => {
	const { data, isSuccess } = useInvoice();

	return (
        <div className="module-container">
            <div className="module-header">
                <h2>Invoices</h2>
                <SearchForm placeholder="invoice number" />
            </div>
            <div className="module-table">
                <table>
                    <thead>
                        <tr>
                            <th>#:</th>
                            <th>Total:</th>
                            <th>Seller:</th>
                            {/* <th>date:</th> */}
                            <th>Actions:</th>
                        </tr>
                    </thead>
                    <tbody>
                        { isSuccess && (
                            data.results.map((item: Bill) => (
                                <tr key={item.id}>
                                    <td>{ item.id }</td>
                                    <td>{ ParserNumber.colDecimals(item.total) } $</td>
                                    <td>{ item.seller.first_name } {item.seller.last_name}</td>
                                    {/* <td>{ item.created_at.toDateString() }</td> */}
                                    <td>
                                        <button>Detail</button>
                                    </td>
                                </tr>
                            ))
                        ) }
                    </tbody>
                </table>
            </div>
            <Pagination />
        </div>
    );
};

export default Invoices;
