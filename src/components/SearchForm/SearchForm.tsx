import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useSearch } from "../../hooks/useSearch";
import { RootState } from "../../redux/store";
import "./SearchForm.styles.scss";

type SearchFormProps = {
	placeholder: string;
	numberResults?: number
};

const SearchForm = ({ placeholder, numberResults }: SearchFormProps) => {
	const [t] = useTranslation();
	const { handleSearch, handleInput, value, handleSelect, countValue } = useSearch(numberResults);
    const count = useSelector((state: RootState) => state.settings.count)

	return (
		<div className="search-container">
			<input
				onChange={handleInput}
				value={value}
				type="text"
				placeholder={placeholder}
			/>
			<select value={countValue} onChange={ handleSelect }>
				{
					Array.from({ length: count }).map((el: any, i) => {
						return <option key={i+1} value={ i+1 }>{ i+1 }</option>
					})
				}
			</select>
			<button onClick={handleSearch}>{t("search")}</button>
		</div>
	);
};

export default SearchForm;
