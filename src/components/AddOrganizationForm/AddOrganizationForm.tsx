import { useOrganization } from "../../hooks/useOrganization";
import { useSelector } from 'react-redux';
import { RootState } from "../../redux/store";

const AddOrganizationForm = () => {
	const { register, handleSubmit, onSubmit, handleChangeFile } = useOrganization();
	const organization = useSelector((state: RootState) => state.account.organization)

	return (
		<div>
			{ organization && <h1>Edit {organization.name} Organization</h1> }
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="form-group">
					<label htmlFor="name">Name</label>
					<input
						id="name"
						type="text"
						defaultValue={organization?.name}
						{...register("name", { required: true })}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input
						id="email"
						type="text"
						defaultValue={organization?.email}
						{...register("email", { required: true })}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="identifier">Identifier</label>
					<input
						id="identifier"
						type="text"
						defaultValue={organization?.identifier}
						{...register("identifier", { required: true })}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="phone">Phone</label>
					<input
						id="phone"
						type="text"
						defaultValue={organization?.phone}
						{...register("phone", { required: true })}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="address">Address</label>
					<input
						id="address"
						type="text"
						defaultValue={organization?.address}
						{...register("address", { required: true })}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="logo">logo</label>
					<input id="logo" type="file" onChange={handleChangeFile} />
				</div>
				<button type="submit">{ organization ? 'Edit' : 'Create Org' }</button>
			</form>
		</div>
	);
};

export default AddOrganizationForm;
