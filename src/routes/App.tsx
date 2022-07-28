import '../styles/global.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import NotFound from '../pages/NotFound/NotFound';
import Dashboard from '../pages/Dashboard/Dashboard';
import InventoryComponent from '../containers/Inventory/Inventory';
import Stock from '../containers/Stock/Stock';
import ToolBar from '../components/ToolBar/ToolBar';
import Supplier from '../containers/Supplier/Supplier';
import Settings from '../containers/Settings/Settings';
import Category from '../containers/Category/Category';
import { ToastWrapper } from '../components/ToastWrapper/ToastWrapper';
import { ReactQueryDevtools } from 'react-query/devtools'
import Invoices from '../containers/Invoices/Invoices';

const App = () => {
    return (
        <div className='app-container'>
            <BrowserRouter>
                <ToastWrapper />
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/" element={<Home />} />
                    <Route path="dashboard" element={<Dashboard />} >
                        <Route path="inventory" element={<InventoryComponent />} />
                        <Route path="category" element={<Category />} />
                        <Route path="stock" element={<Stock />} />
                        <Route path="supplier" element={<Supplier />} />
                        <Route path="invoice" element={<Invoices />} />
                        <Route path="settings" element={<Settings />} />
                    </Route>
                    <Route path="about" element={<About />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <ToolBar />
                <ReactQueryDevtools initialIsOpen={false} />
            </BrowserRouter>
        </div>
    )
}

export default App