import { useAccount } from "../../hooks/useAccount";
import { useSelector } from 'react-redux';
import { RootState } from "../../redux/store";

const AddUserForm = () => {
	const { onSubmit, handleSubmit, register } = useAccount();
    const staff = useSelector((state: RootState) => state.account.staff)

	return (
		<div>
			{ staff && <h1>Edit User:</h1> }
			<form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group two-rows">
                    <label>Name:</label>
                    <input
                        id="first_name"
                        type="text"
                        placeholder="first name"
						defaultValue={ staff?.first_name }
                        {...register('first_name', {required: true})}
                    />
                    <input
                        type="text"
                        placeholder="last name"
						defaultValue={ staff?.last_name }
                        {...register('last_name', {required: true})}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                        id="address"
                        type="address"
						defaultValue={ staff?.address }
                        {...register('address', {required: true})}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        defaultValue={ staff?.user.email }
                        {...register('email', {required: true})}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                        id="phone"
                        type="phone"
                        defaultValue={ staff?.user.phone }
                        {...register('phone', {required: true})}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        defaultValue={ staff?.user.password }
                        {...register('password', {required: true})}
                    />
                </div>
                <button type="submit">{ staff ? 'Edit' : 'Create' }</button>
			</form>
		</div>
	);
};

export default AddUserForm;
