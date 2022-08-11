import { useCart } from "../../hooks/useCart";
import { ParserNumber } from "../../utils";
import { GiPayMoney } from "react-icons/gi";
import { AiOutlinePrinter } from "react-icons/ai";
import Select, { SingleValue } from "react-select";
import { useTranslation } from "react-i18next";
import "./Payment.styles.scss";
import { useCustomer } from '../../hooks/useCustomer';
import { CustomerService } from '../../services/CustomerService';
import { Controller } from "react-hook-form";
import { Option } from "../../hooks/useSelect";
import { useDispatch } from 'react-redux';
import { Customer } from '../../models/User.model.d';
import { setCustomer } from "../../redux/cartSlice";
import { RootState } from "../../redux/store";
import { useSelector } from 'react-redux';

const Payment = () => {
	const {
		total,
		showForm,
		handleCancelOrder,
		payOptions,
		handleSubmit,
		register,
		onSubmit,
		control,
		watch
	} = useCart();
	const { fullData, isSuccessFull } = useCustomer()
	const customers = isSuccessFull ? CustomerService.genCustomerOpt(fullData) : []
	const [t] = useTranslation();
	const cash = watch('cash') ?? 0
	const change = cash - total;
	const canPay = change < 0;
	const dispatch = useDispatch()
	const customer = useSelector((state: RootState) => state.cart.customer)

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="payment-container">
			<h2>{t("sales.finish")}:</h2>
			<div className="form-group">
				<label htmlFor="">{t("sales.method")}:</label>
				<Controller
					name="payment_type"
					control={control}
					defaultValue={ payOptions[0].value as string}
					rules={{ required: true }}
					render={( {field: { value, onChange, onBlur }} ) => (
						<Select
							onChange={(el: SingleValue<Option>) => onChange(el?.value)}
							defaultValue={ payOptions.filter((item: Option) => item.value === value) }
							options={payOptions}
						/>
					)}
				/>
			</div>
			<div className="form-group">
				<label htmlFor="">Customer:</label>
				<Controller
					name="customer"
					control={control}
					defaultValue={ customer?.id }
					rules={{ required: true }}
					render={( {field: { value, onChange, onBlur }} ) => (
						<Select
							onChange={(el: SingleValue<Option>) => {
								//store customer in redux cart state
								const currentCustomer = fullData?.results.find((item: Customer) => item.id === el?.value)
								dispatch(setCustomer(currentCustomer))
								onChange(el?.value)

							}}
							defaultValue={ customers.filter((item: Option) => item.value === value) }
							options={customers}
						/>
					)}
				/>
			</div>
			{showForm && (
				<div className="form-group">
					<label htmlFor="">{t("sales.cash")}</label>
					<input
						type="number"
						// value={cash === 0 ? "" : cash}
						// onChange={(e) => handleChangePay(e)}
						{ ...register('cash', {required: true}) }
					/>
				</div>
			)}
			<div className="form-group">
				<label htmlFor="total">{t("sales.total")}:</label>
				<input
					id="total"
					type="number"
					className="pay-input"
					value={ParserNumber.colDecimals(total)}
					readOnly
					disabled
					{ ...register('total', {required: true}) }
				/>
			</div>
			<span className={canPay ? "error" : ""}>
				{t("sales.change")}: {ParserNumber.colDecimals(change)} $
			</span>
			{showForm && (
				<button
					disabled={canPay}
					type='submit'
					className="btn btn-success"
				>
					<GiPayMoney />
					{t("sales.pay")}
				</button>
			)}
			{!showForm && (
				<div className="invoice-review">
					<button>
						<AiOutlinePrinter />
						Print Invoice
					</button>
					<button onClick={handleCancelOrder}>Close</button>
				</div>
			)}
		</form>
	);
};

export default Payment;
