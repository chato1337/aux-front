import { useAccount } from "../../hooks/useAccount";
import { useSelector } from 'react-redux';
import { RootState } from "../../redux/store";
import { useTranslation } from 'react-i18next';
import { Controller } from "react-hook-form";
import Select, { SingleValue } from 'react-select';
import { Option } from "../../hooks/useSelect";
import { Staff } from "../../models/User.model";

type AddUserFormProps = {
	user: Staff | null
}

const AddUserForm = ({ user }: AddUserFormProps) => {
	const { onSubmit, handleSubmit, register, control, id_types } = useAccount();
	const userStaff = useSelector((state: RootState) => state.account.staff)
    const staff = user ? user : userStaff
	const [ t ] = useTranslation()

	return (
		<div>
			{ staff && <h2>{ t("user.edit") }:</h2> }
			<form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group two-rows">
                    <label>{ t("customer.full_name") }:</label>
                    <input
                        id="first_name"
                        type="text"
                        placeholder={ t("user.first_name") }
						defaultValue={ staff?.first_name }
                        {...register('first_name', {required: true})}
                    />
                    <input
                        type="text"
                        placeholder={ t("user.last_name") }
						defaultValue={ staff?.last_name }
                        {...register('last_name', {required: true})}
                    />
                </div>
				<div className="form-group">
					<label>identification type</label>
					<Controller
						name="id_type"
						control={control}
						rules={{ required: true }}
						defaultValue={ staff?.user.id_type }
						render={({ field: { value, onChange, onBlur } }) => (
							<Select
								onChange={(el: SingleValue<Option>) => onChange(el?.value)}
								defaultValue={ id_types.filter((item: Option) => item.value === value) }
								options={ id_types }
							/>
						)}
					/>
				</div>
                <div className="form-group">
                    <label htmlFor="ident">{ t("user.id") }</label>
                    <input
                        id="ident"
                        type="number"
						defaultValue={ staff?.user.identifier }
                        {...register('identifier', {required: true})}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">{ t("user.address") }</label>
                    <input
                        id="address"
                        type="address"
						defaultValue={ staff?.address }
                        {...register('address', {required: true})}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">{ t("supplier.email") }</label>
                    <input
                        id="email"
                        type="email"
                        defaultValue={ staff?.user.email }
                        {...register('email', {required: true})}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">{ t('supplier.phone') }</label>
                    <input
                        id="phone"
                        type="phone"
                        defaultValue={ staff?.user.phone }
                        {...register('phone', {required: true})}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">{ t('user.password') }</label>
                    <input
                        id="password"
                        type="password"
                        defaultValue={ staff?.user.password }
                        {...register('password', {required: true})}
                    />
                </div>
                <button type="submit">{ staff ? t("user.edit") : t("user.create") }</button>
			</form>
		</div>
	);
};

export default AddUserForm;
