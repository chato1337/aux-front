import Pagination from "../../components/Pagination/Pagination";
import SearchForm from "../../components/SearchForm/SearchForm";
import { useInvoice } from "../../hooks/useInvoice";
import { Invoice } from '../../models/Stock.model.d';
import { ParserNumber } from "../../utils";
import { DateTime } from "luxon"
import { useTranslation } from "react-i18next";
import Ordering from "../../components/Ordering/Ordering";
import SimpleModal from "../../components/SimpleModal/SimpleModal";
import InvoiceDetail from "../../components/InvoiceDetail/InvoiceDetail";

const Invoices = () => {
	const { data, isSuccess, handleModal, modalIsOpen, closeModal } = useInvoice();
    const [ t ] = useTranslation()

	return (
        <div className="module-container">
            <div className="module-header">
                <h2>{ t("invoice.title") }</h2>
                <SearchForm placeholder={ t('invoice.search') } />
            </div>
            <div className="module-table">
                <table>
                    <thead>
                        <tr>
                            <th>
								<Ordering orderField="id">
									{ t('id') }
								</Ordering>
							</th>
                            <th>
								<Ordering orderField="total">
									{ t('total') }
								</Ordering>
							</th>
                            <th>
								<Ordering orderField="seller">
									{ t("invoice.seller") }
								</Ordering>
							</th>
							<th>
								<Ordering orderField="customer">
									{ t("invoice.customer") }
								</Ordering>
							</th>
                            <th>
								<Ordering orderField="created_at">
									{ t("created_at") }
								</Ordering>
							</th>
                            <th>
								{ t('actions') }
							</th>
                        </tr>
                    </thead>
                    <tbody>
                        { isSuccess && (
                            data.results.map((item: Invoice) => (
                                <tr key={item.id}>
                                    <td className="text-center">
										{ item.id }
									</td>
                                    <td>{ ParserNumber.colDecimals(item.total) } $</td>
                                    <td>{ item.seller.first_name } {item.seller.last_name}</td>
									<td>{ item.customer.full_name }</td>
                                    <td className="text-center">
										{ DateTime.fromISO(item.created_at).toLocaleString(DateTime.DATETIME_MED) }
									</td>
                                    <td>
                                        <button onClick={ () => handleModal(item) }>
											{ t('detail') }
										</button>
                                    </td>
                                </tr>
                            ))
                        ) }
                    </tbody>
                </table>
            </div>
			<SimpleModal modalIsOpen={modalIsOpen} closeModal={closeModal}>
				<InvoiceDetail />
			</SimpleModal>
            <Pagination />
        </div>
    );
};

export default Invoices;
