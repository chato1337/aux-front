import { motion } from "framer-motion";
import { FaKey, FaUserAlt } from "react-icons/fa";
import { Transitions } from "../../animations";
import { useAuth } from "../../hooks/useAuth";
import "./Login.styles.scss";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { USER_STATUS } from "../../models/User.model.d";

const Login = () => {
	const { register, onSubmit, handleSubmit, errors } = useAuth();
	const staff = useSelector((state: RootState) => state.account.logged);
	const navigate = useNavigate();

	//redirects in case the staff is logged or send to create a organization
	useEffect(() => {
		if (staff && staff.user.status === USER_STATUS.to_activate) {
			navigate("/organization", { replace: true });
		} else if (staff && staff.user.status !== USER_STATUS.to_activate) {
			navigate("/dashboard", { replace: true });
		}
	}, [staff, navigate]);

	return (
		<motion.div
			className="login-container"
			initial={Transitions.basic.initial}
			animate={Transitions.basic.animate}
			transition={Transitions.basic.transition}
		>
			<div className="login-form">
				<h2>Sign in to Aux</h2>
				{errors.email && (
					<motion.span
						initial={Transitions.basic.initial}
						animate={Transitions.basic.animate}
						transition={Transitions.basic.transition}
					>
						user or password wrong
					</motion.span>
				)}
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="form-group">
						<label htmlFor="email">
							<FaUserAlt />
						</label>
						<input
							id="email"
							type="email"
							{...register("email", { required: true })}
							placeholder="email"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">
							<FaKey />
						</label>
						<input
							id="password"
							type="text"
							{...register("password", { required: true })}
							placeholder="password"
						/>
					</div>
					<button type="submit">Login</button>
				</form>
			</div>
		</motion.div>
	);
};

export default Login;
