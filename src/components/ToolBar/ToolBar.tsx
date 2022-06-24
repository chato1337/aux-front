import { Link } from 'react-router-dom'
import './ToolBar.styles.scss'

const ToolBar = () => {
  return (
    <div className='toolbar-container'>
        <menu>
            <ul>
                <Link to="/dashboard/inventory">Inventory</Link>
                <Link to="/dashboard/stock">Stock</Link>
            </ul>
        </menu>
    </div>
  )
}

export default ToolBar