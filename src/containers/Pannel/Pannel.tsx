import PannelNavbar from '../../components/PannelNavbar/PannelNavbar'
import SideBar from '../../components/SideBar/SideBar'
import ToolBar from '../../components/ToolBar/ToolBar'
import './Pannel.styles.scss'

const Pannel = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="pannel-container">
      <PannelNavbar />
      <div className="pannel-body">
        <div className="left-pannel">
          <SideBar />
        </div>
        <div className="right-pannel">
          {children}
        </div>
      </div>
      <ToolBar />
    </div>
  )
}

export default Pannel