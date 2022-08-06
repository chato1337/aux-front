import { useAccount } from "../../hooks/useAccount";
import { useSelector } from 'react-redux';
import { RootState } from "../../redux/store";

const AddUserForm = () => {
	const { onSubmit, handleSubmit, register } = useAccount();
    const user = useSelector((state: RootState) => state.account.user)

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group two-rows">
                    <label>Name:</label>
                    <input
                        id="first_name"
                        type="text"
                        placeholder="first name"
                        {...register('first_name', {required: true})}
                    />
                    <input
                        type="text"
                        placeholder="last name"
                        {...register('last_name', {required: true})}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                        id="address"
                        type="address"
                        {...register('address', {required: true})}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        defaultValue={ user?.email }
                        {...register('email', {required: true})}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                        id="phone"
                        type="phone"
                        defaultValue={ user?.phone }
                        {...register('phone', {required: true})}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        defaultValue={ user?.password }
                        {...register('password', {required: true})}
                    />
                </div>
                <button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default AddUserForm;
