import LangSelector from "../../components/LangSelector/LangSelector";
import SimpleModal from "../../components/SimpleModal/SimpleModal";
import { useAccount } from "../../hooks/useAccount";
import AddUserForm from "../../components/AddUserForm/AddUserForm";
import "./Settings.styles.scss";
import AddOrganizationForm from "../../components/AddOrganizationForm/AddOrganizationForm";
import { useDispatch, useSelector } from "react-redux";
import { FORM_OPTION, setActionForm } from "../../redux/settingsSlice";
import { RootState } from "../../redux/store";
import { useTranslation } from 'react-i18next';

const Settings = () => {
	const { modalIsOpen, closeModal, handleModal, form } = useAccount();
	const dispatch = useDispatch();
	const [ t ] = useTranslation()
	const handleSettingsModal = () => {
		dispatch(setActionForm(FORM_OPTION.edit));
		handleModal("organization");
	};

	const organization = useSelector((state: RootState) => state.account.organization)
	const staff = useSelector((state: RootState) => state.account.staff)

	return (
		<div className="module-container settings-container">
			<div className="module-header">
				<h2>{ t('settings.title') }</h2>
			</div>
			<div className="settings-body">
				<div className="title">
					<label>{ t("settings.lang") }:</label>
				</div>
				<div className="content">
					<LangSelector />
				</div>
				<div className="title">
					<label>{ t("user.title") }:</label>
				</div>
				<div className="content">
					<span>{ `${staff?.first_name} ${staff?.last_name}` }</span>
					<button onClick={() => handleModal("user")}>
						{ t("edit") }
					</button>
				</div>
				<div className="title">
					<label>{ t("organization.title") }:</label>
				</div>
				<div className="content">
					<span>{ organization?.name }</span>
					<button onClick={() => handleSettingsModal()}>
						{ t("edit") }
					</button>
				</div>
			</div>
			<SimpleModal modalIsOpen={modalIsOpen} closeModal={closeModal}>
				{form === "user" ? <AddUserForm /> : <AddOrganizationForm />}
			</SimpleModal>
		</div>
	);
};

export default Settings;
