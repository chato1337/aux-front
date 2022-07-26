import { useTranslation } from "react-i18next";
import { useSearch } from "../../hooks/useSearch";
import "./SearchForm.styles.scss";

type SearchFormProps = {
	placeholder: string;
};

const SearchForm = ({ placeholder }: SearchFormProps) => {
	const [t] = useTranslation();
	const { handleSearch, handleInput, value } = useSearch();

	return (
		<div className="search-container">
			<input
				onChange={handleInput}
				value={value}
				type="text"
				placeholder={placeholder}
			/>
			<button onClick={handleSearch}>{t("search")}</button>
		</div>
	);
};

export default SearchForm;
