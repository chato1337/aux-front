import SideBar from '../../components/SideBar.tsx/SideBar'
import Inventory from '../Inventory/Inventory'
import './Pannel.styles.scss'

const Pannel = () => {
  return (
    <div className="pannel-container">
      <header>
        <p>navbar content</p>
      </header>
      <main>
        <div className="left-pannel">
          <SideBar />
        </div>
        <div className="right-pannel">
          <Inventory />
        </div>
      </main>
    </div>
  )
}

export default Pannel