import { useCart } from '../../hooks/useCart';
import { ParserNumber } from '../../utils';
import { GiPayMoney } from 'react-icons/gi'
import { AiOutlinePrinter } from 'react-icons/ai'
import Select from "react-select";
import { useTranslation } from 'react-i18next';
import './Payment.styles.scss'

const Payment = () => {
    const { total, cash, handleChangePay, handleSubmitPay, showForm, handleCancelOrder, selectedOption, payOptions, handleChangeSelect } = useCart()
    const [ t ] = useTranslation()
    const change = cash - total
    const canPay = change < 0

	return (
        <div className="payment-container">
            <h2>{ t('sales.finish') }:</h2>
            <div className="form-group">
                <label htmlFor="">{ t('sales.method') }:</label>
                <Select
                    defaultValue={ selectedOption }
                    onChange={ handleChangeSelect }
                    options={ payOptions }
                />
            </div>
            { showForm && (
                <div className="form-group">
                    <label htmlFor="">{ t('sales.cash') }</label>
                    <input type="number" value={cash === 0 ? '' : cash} onChange={ (e) => handleChangePay(e) } />
                </div>
            ) }
            <div className="form-group">
                <label htmlFor="total">{ t('sales.total') }:</label>
                <input
                    id='total'
                    type="number"
                    className='pay-input'
                    value={ ParserNumber.colDecimals(total) }
                    readOnly
                    disabled
                />
            </div>
            <span className={ canPay ? 'error' : '' }>{ t('sales.change') }: { ParserNumber.colDecimals(change) } $</span>
            { showForm && (
                <button disabled={canPay} onClick={handleSubmitPay} className='btn btn-success'>
                    <GiPayMoney />
                    { t('sales.pay') }
                </button>
            ) }
            { !showForm && (
                <div className="invoice-review">
                    <button>
                        <AiOutlinePrinter />
                        Print Invoice
                    </button>
                    <button onClick={ handleCancelOrder }>Close</button>
                </div>
            ) }
        </div>
    );
};

export default Payment;
