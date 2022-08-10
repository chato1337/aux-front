import AddUserForm from "../../components/AddUserForm/AddUserForm";
import "./Register.styles.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { FORM_OPTION, setActionForm } from "../../redux/settingsSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

const Register = () => {
	const dispatch = useDispatch();
	const staff = useSelector((state: RootState) => state.account.staff);
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(setActionForm(FORM_OPTION.create));
	}, [dispatch]);

	useEffect(() => {
		if (staff && staff.user.status === "to-activate") {
			navigate("/organization", { replace: true });
		}
	}, [navigate, staff]);

	return (
		<div className="register-container">
			<div className="login-form">
				<h2>Create an Aux account</h2>
				<AddUserForm />
			</div>
		</div>
	);
};

export default Register;
