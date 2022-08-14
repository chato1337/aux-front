import { Bars } from "react-loader-spinner";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import './LoadingSpinner.styles.scss'

const LoadingSpinner = () => {
	return (
		<div className="spinner-container">
			<Bars
				height="60"
				width="60"
				color="#5f8ee4"
				ariaLabel="bars-loading"
				wrapperStyle={{}}
				wrapperClass=""
				visible={true}
			/>
		</div>
	);
};

export default LoadingSpinner;
