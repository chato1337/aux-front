import LangSelector from '../../components/LangSelector/LangSelector'
import './Settings.styles.scss'

const Settings = () => {
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
          myUser <button>edit</button>
        </div>
        <div className="title">
          <label>Organization:</label>
        </div>
        <div className="content">
          myOrg <button>edit</button>
        </div>
      </div>
    </div>
  )
}

export default Settings