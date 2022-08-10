import '../styles/global.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import NotFound from '../pages/NotFound/NotFound';
import Dashboard from '../pages/Dashboard/Dashboard';
import InventoryComponent from '../containers/Inventory/Inventory';
import Stock from '../containers/Stock/Stock';
import Supplier from '../containers/Supplier/Supplier';
import Settings from '../containers/Settings/Settings';
import Category from '../containers/Category/Category';
import { ToastWrapper } from '../components/ToastWrapper/ToastWrapper';
import { ReactQueryDevtools } from 'react-query/devtools'
import Invoices from '../containers/Invoices/Invoices';
import Login from '../containers/Login/Login';
import ProtectedRoute from '../containers/ProtectedRoute/ProtectedRoute';
import { useDispatch } from 'react-redux';
// import { RootState } from '../redux/store';
import { useEffect } from 'react';
import { AccountService } from '../services/AccountService'
import { setToken, setStaff } from '../redux/accountSlice';
import DashboardStart from '../components/DashboardStart/DashboardStart';
import Register from '../containers/Register/Register';
import NewOrganization from '../containers/NewOrganization/NewOrganization';

const App = () => {
    // const user = useSelector((state: RootState) => state.account.user)
    const dispatch = useDispatch()

    //restore session from local storage
    useEffect(() => {
        if (AccountService.getUser()) {
            dispatch(setStaff(AccountService.getUser()))
        }
    }, [dispatch])

    useEffect(() => {
        if (AccountService.getToken()) {
            dispatch(setToken(AccountService.getToken()))
        }
    }, [dispatch])

    return (
        <div className='app-container'>
            <BrowserRouter>
                <ToastWrapper />
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/" element={<Home />} />
                    <Route
                        path="dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={ <DashboardStart /> } />
                        <Route path="inventory" element={<InventoryComponent />} />
                        <Route path="category" element={<Category />} />
                        <Route path="stock" element={<Stock />} />
                        <Route path="supplier" element={<Supplier />} />
                        <Route path="invoice" element={<Invoices />} />
                        <Route path="settings" element={<Settings />} />
                    </Route>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="organization" element={<NewOrganization />} />
                    <Route path="about" element={<About />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <ReactQueryDevtools initialIsOpen={false} />
            </BrowserRouter>
        </div>
    )
}

export default App
