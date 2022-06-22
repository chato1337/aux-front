import SideBar from '../../components/SideBar.tsx/SideBar'
import Inventory from '../Inventory/Inventory'
import './Pannel.styles.scss'

const Pannel = () => {
  return (
    <div className="pannel-container">
        <div className="left-pannel">
          <SideBar />
        </div>
        <div className="right-pannel">
          <Inventory />
        </div>
    </div>
  )
}

export default Pannel