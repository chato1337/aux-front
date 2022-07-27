import { useCart } from '../../hooks/useCart';
import { ParserNumber } from '../../utils';
import { GiPayMoney } from 'react-icons/gi'
import './Payment.styles.scss'
import { useSelect } from '../../hooks/useSelect';
import Select from "react-select";
import { Option } from '../../hooks/useSelect'
import { useTranslation } from 'react-i18next';

const Payment = () => {
    const { total, cash, handleChangePay, handleSubmitPay } = useCart()
    const [ t ] = useTranslation()
    const change = cash - total
    const canPay = change < 0
    const payOptions: Option[] = [
        { value: "cash", label: t('sales.cash') },
        { value: "credit", label: t('sales.credit') }
    ]
    const { selectedOption, handleChange } = useSelect(payOptions[0])

	return (
        <div className="payment-container">
            <h2>{ t('sales.finish') }:</h2>
            <div className="form-group">
                <label htmlFor="">{ t('sales.method') }:</label>
                <Select
                    defaultValue={ selectedOption }
                    onChange={handleChange}
                    options={ payOptions }
                />
            </div>
            <div className="form-group">
                <label htmlFor="">{ t('sales.cash') }</label>
                <input type="number" value={cash === 0 ? '' : cash} onChange={ (e) => handleChangePay(e) } />
            </div>
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
            <button disabled={canPay} onClick={handleSubmitPay} className='btn btn-success'>
                <GiPayMoney />
                { t('sales.pay') }
            </button>
        </div>
    );
};

export default Payment;
