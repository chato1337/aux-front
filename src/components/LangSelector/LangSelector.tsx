import i18n from '../../i18n'
import { withTranslation } from 'react-i18next';
// import { useTranslation } from 'react-i18next';
import './LangSelector.styles.scss'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { changeLang } from '../../redux/settingsSlice';


const LangSelector = () => {
    // const [t] = useTranslation()
    const currentLang = useSelector((state: RootState) => state.settings.language)
    const dispatch = useDispatch()

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        dispatch(changeLang(lng))
    }

    return (
        <div className='lang-selector-container'>
            <button
                onClick={() => changeLanguage('es')}
                title="spanish"
                className={ currentLang === 'es' ? 'active' : '' }
                disabled={ currentLang === 'es' ? true : false }
            >
                🇪🇸
            </button>
            <button
                onClick={() => changeLanguage('en')}
                title="english"
                className={ currentLang === 'en' ? 'active' : '' }
                disabled={ currentLang === 'en' ? true : false }
            >
                🇺🇸
            </button>
        </div>
    )
}

export default withTranslation()(LangSelector);