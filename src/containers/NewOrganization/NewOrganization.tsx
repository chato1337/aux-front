import "./NewOrganization.styles.scss";
import AddOrganizationForm from "../../components/AddOrganizationForm/AddOrganizationForm";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const NewOrganization = () => {
	const staff = useSelector((state: RootState) => state.account.logged);
	const navigate = useNavigate();

	useEffect(() => {
		//if staff has stored organization
		if (staff && staff.user.status !== "to-activate") {
			navigate("/dashboard", { replace: true });
		}
	}, [staff, navigate]);

	return (
		<div className="new-org-container">
			<h2>Hello {staff?.first_name} {staff?.last_name}</h2>
			<span>Please create a new organization</span>
			<div className="new-org-form">
				<AddOrganizationForm />
			</div>
		</div>
	);
};

export default NewOrganization;
