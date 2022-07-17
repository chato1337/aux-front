import i18n from '../../i18n'
import { withTranslation } from 'react-i18next';
import { useTranslation } from 'react-i18next';

const LangSelector = () => {
    const [t] = useTranslation()

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    }

    return (
        <div>
            <button onClick={() => changeLanguage('es')}>es</button>
            <button onClick={() => changeLanguage('en')}>en</button>
            <h1>{t('sales')}</h1>
        </div>
    )
}

export default withTranslation()(LangSelector);