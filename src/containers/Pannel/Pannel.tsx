import SideBar from '../../components/SideBar.tsx/SideBar'
import './Pannel.styles.scss'

const Pannel = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="pannel-container">
        <div className="left-pannel">
          <SideBar />
        </div>
        <div className="right-pannel">
          {children}
        </div>
    </div>
  )
}

export default Pannel