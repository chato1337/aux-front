import LangSelector from '../../components/LangSelector/LangSelector'
import SimpleModal from '../../components/SimpleModal/SimpleModal'
import { useAccount } from '../../hooks/useAccount';
import AddUserForm from '../../components/AddUserForm/AddUserForm';
import './Settings.styles.scss'
import AddOrganizationForm from '../../components/AddOrganizationForm/AddOrganizationForm';
import { useDispatch } from 'react-redux';
import { setActionForm } from '../../redux/settingsSlice';

const Settings = () => {
  const { modalIsOpen, closeModal, handleModal, form } = useAccount()
  const dispatch = useDispatch()
  const handleSettingsModal = () => {
    dispatch(setActionForm('edit'))
    handleModal('organization')
  }

  return (
    <div className='module-container settings-container'>
      <div className="module-header">
        <h2>Settings</h2>
      </div>
      <div className="settings-body">
        <div className="title">
          <label>Lenguage:</label>
        </div>
        <div className="content">
          <LangSelector />
        </div>
        <div className="title">
          <label>User:</label>
        </div>
        <div className="content">
          myUser <button onClick={() => handleModal('user')}>edit</button>
        </div>
        <div className="title">
          <label>Organization:</label>
        </div>
        <div className="content">
          myOrg <button onClick={() => handleSettingsModal()}>edit</button>
        </div>
      </div>
      <SimpleModal modalIsOpen={modalIsOpen} closeModal={closeModal}>
        { form === 'user' ? <AddUserForm/> : <AddOrganizationForm /> }
      </SimpleModal>
    </div>
  )
}

export default Settings