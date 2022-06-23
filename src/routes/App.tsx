import '../styles/global.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import NotFound from '../pages/NotFound/NotFound';
import Dashboard from '../pages/Dashboard/Dashboard';
import InventoryComponent from '../containers/Inventory/Inventory';

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/" element={<Home />} />
                    <Route path="dashboard" element={<Dashboard />} >
                        <Route path="inventory" element={<InventoryComponent />} />
                    </Route>
                    <Route path="about" element={<About />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App