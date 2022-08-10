import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SupplierImg from '../../assets/toolbar/postman.png'
import ProductImg from '../../assets/toolbar/products.png'
import ShopImg from '../../assets/toolbar/shop.png'
import './ToolBar.styles.scss'

const ToolBar = () => {
  const delayAnimation = 0.2

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
                    transition: { duration: delayAnimation }
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
                    transition: { duration: delayAnimation }
                  }}
                />
                <small>Sales</small>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/supplier">
                <motion.img
                  src={SupplierImg}
                  alt="suppliers"
                  whileHover={{
                    scale: 1.2,
                    transition: { duration: delayAnimation }
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
