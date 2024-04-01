import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Style/Header.css'
import '../Responsive/Header.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
function Header() {
  const [searchValue, setSearchValue] = useState('');
  const [userName, setUserName] = useState('Đăng nhập');
  const [signup, setSignup] = useState('Đăng kí');
  const [cartLength, setCartLength] = useState(0);
  const navigate = useNavigate();
  const searchProduct = () => {
      console.log(searchValue);
      window.location.href = `/?q=${searchValue}`;
  }
  const processLogin = () => {
    if(sessionStorage.getItem('access_token') === null)
      navigate('/login');
    else {
      navigate('/infor');
    }
  }
  const processLogout = () => {
    if(sessionStorage.getItem('access_token') === null)
      window.location.href = '/register';
    else {
      sessionStorage.removeItem('access_token');
      sessionStorage.removeItem('user');
      window.location.href = '/login';
    }
  }
  useEffect(() => {
    if(sessionStorage.getItem('access_token') != null)
    {
      setUserName(JSON.parse(sessionStorage.getItem('user')).full_name);
      setSignup('Thoát');
    }
    if(sessionStorage.getItem('cart') != null)
    {
      const cart = JSON.parse(sessionStorage.getItem('cart'));
      setCartLength(cart.items.length);
    }
  }, []);
  return (
    <div id='header'>
      <div onClick = {() => {window.location.href = `/`;}} className="logo-shop">
        <img src="https://pos.nvncdn.com/cba2a3-7534/store/20240219_WBAfwd3B.png" alt="" />
      </div>
      <div class="search-box">
        <input 
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type="text" 
          placeholder='Tìm kiếm sản phẩm'/>
        <button onClick={() => {searchProduct()}}>
          <i class="fa fa-search" aria-hidden="true"></i>
        </button>
      </div>
      <div className='infor-box'>
        <p onClick = {() => processLogin()} className='header-login'>{userName} |</p>
        <p onClick = {() => processLogout()} className='header-signup' href="">{signup}</p>
        <div onClick = {() => {window.location.href = `/cart`;}} className='header-cart'>
          <img src="https://web.nvnstatic.net/tp/T0299/img/cart_icon.png" alt="" />
          <span>{cartLength}</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
