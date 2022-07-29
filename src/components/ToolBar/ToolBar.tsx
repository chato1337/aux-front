import { Link } from 'react-router-dom'
import './ToolBar.styles.scss'

const ToolBar = () => {
  return (
    <div className='toolbar-container'>
        <menu>
            <li>
              <Link to="/dashboard/inventory">Inventory</Link>
            </li>
            <li>
              <Link to="/dashboard/stock">Stock</Link>
            </li>
        </menu>
    </div>
  )
}

export default ToolBar