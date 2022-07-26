import { useCart } from '../../hooks/useCart';
import { ParserNumber } from '../../utils';
import { GiPayMoney } from 'react-icons/gi'
import './Payment.styles.scss'

const Payment = () => {
    const { total, cash, handleChangePay, handleSubmitPay } = useCart()
    const change = cash - total
    const canPay = change < 0

	return (
        <div className="payment-container">
            <h2>Finish transaction: </h2>
            <div className="form-group">
                <label htmlFor="">Pay with:</label>
                <select>
                    <option value="cash">Cash</option>
                    <option value="credit">Credit cart</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="">Cash</label>
                <input type="number" value={cash} onChange={ (e) => handleChangePay(e) } />
            </div>
            <div className="form-group">
                <label htmlFor="">Total:</label>
                <input type="number" value={ ParserNumber.colDecimals(total) } readOnly />
            </div>
            <span className={ canPay ? 'error' : '' }>Change: { ParserNumber.colDecimals(change) } $</span>
            <button disabled={canPay} onClick={handleSubmitPay} className='btn btn-success'>
                <GiPayMoney />
                Pay Now
            </button>
        </div>
    );
};

export default Payment;
