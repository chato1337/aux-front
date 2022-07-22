import { useTranslation } from 'react-i18next';
import { useSearch } from '../../hooks/useSearch';

const SearchForm = () => {
  const [ t ] = useTranslation()
  const { handleSearch, handleInput, value } = useSearch()

  return (
		<div>
			<input onChange={handleInput} value={value} type="text" placeholder={t("category.search")} />
			<button onClick={handleSearch}>{t("search")}</button>
		</div>
	);
}

export default SearchForm