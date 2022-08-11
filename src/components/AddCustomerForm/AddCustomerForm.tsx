import { Controller } from 'react-hook-form';
import { useCustomer } from '../../hooks/useCustomer';
import Select, {SingleValue} from "react-select";
import { Option } from '../../hooks/useSelect';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const AddCustomerForm = () => {
	const { handleSubmit, onSubmit, register, idOptions, control } = useCustomer()
	const customer = useSelector((state: RootState) => state.cart.customer)

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="form-group">
					<label htmlFor="fullname">Name:</label>
					<input
						id="fullname"
						type="text"
						defaultValue={customer?.full_name}
						{ ...register('full_name', { required: true }) }
					/>
				</div>
				<div className="form-group">
					<label htmlFor="leverage">Leverage:</label>
					<input
						id="leverage"
						type="text"
						defaultValue={customer?.leverage}
						{ ...register('leverage', { required: true }) }
					/>
				</div>
				<div className="form-group">
					<label htmlFor="email">Email:</label>
					<input
						id="email"
						type="text"
						defaultValue={customer?.user.email}
						{ ...register('email', { required: true }) }
					/>
				</div>
				<div className="form-group">
					<label htmlFor="phone">Phone:</label>
					<input
						id="phone"
						type="phone"
						defaultValue={customer?.user.phone}
						{ ...register('phone', { required: true }) }
					/>
				</div>
				<div className="form-group">
					<label htmlFor="ident">Type id:</label>
					<Controller
						name='id_type'
						control={control}
						defaultValue={customer?.user.id_type}
						rules={{ required: true }}
						render={( {field: {value, onChange, onBlur}} ) => (
							<Select
								onChange={(el: SingleValue<Option>) => onChange(el?.value)}
								defaultValue={idOptions.filter((item: Option) => item.value === value)}
								options={idOptions}
							/>
						)}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="ident">Identifier:</label>
					<input
						id="ident"
						type="number"
						defaultValue={customer?.user.identifier}
						{ ...register('identifier', { required: true }) }
					/>
				</div>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default AddCustomerForm;
