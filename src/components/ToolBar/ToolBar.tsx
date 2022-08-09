import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SupplierImg from '../../assets/toolbar/postman.png'
import ProductImg from '../../assets/toolbar/products.png'
import ShopImg from '../../assets/toolbar/shop.png'
import './ToolBar.styles.scss'

const ToolBar = () => {
  return (
    <div className='toolbar-container'>
        <menu>
            <li>
              <Link to="/dashboard/inventory">
                <motion.img
                  src={ProductImg}
                  alt="products"
                  whileHover={{
                    scale: 1.2,
                    transition: { duration: 0.5 }
                  }}
                />
                <small>Products</small>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/stock">
                <motion.img
                  src={ShopImg}
                  alt="shop"
                  whileHover={{
                    scale: 1.2,
                    transition: { duration: 1 }
                  }}
                />
                <small>Sales</small>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/stock">
                <motion.img
                  src={SupplierImg}
                  alt="suppliers"
                  whileHover={{
                    scale: 1.2,
                    transition: { duration: 1 }
                  }}
                />
                <small>Suppliers</small>
              </Link>
            </li>
        </menu>
    </div>
  )
}

export default ToolBar