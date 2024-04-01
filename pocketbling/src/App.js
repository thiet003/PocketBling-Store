import {Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import Header from './Components/Header';
import Footer from './Components/Footers';
import Home from './Container/Home';
import Login from './Container/Login';
import Register from './Container/Register';
import ProductDetail from './Container/ProductDetail';
import store from './Redux/Store/store';
import Cart from './Container/Cart';
import Order from './Container/Order';
import Confirm from './Container/Confirm';
import Profile from './Container/Profile';
import OrderDetail from './Container/OrderDetail';
import HistoryOrder from './Container/HistoryOrder';
function App() {
  return (
    <Provider store={store}>
      <div className="App">
      <ToastContainer/>
      <Header/>
      <div className="App flex justify-center content-center">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/infor" element={<Profile />} />
        <Route path="/history" element={<HistoryOrder />} />
        <Route path="/product-detail/:id" element={<ProductDetail />} />
        <Route path="/order-detail/:id" element={<OrderDetail />} />
      </Routes>
      </div>
      <Footer/>
    </div>
    </Provider>
    
  );
}

export default App;
