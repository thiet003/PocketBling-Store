import '../Style/Navbar.css'
function Navbar() {
  const name = JSON.parse(sessionStorage.getItem("user")).full_name;
    return ( 
        <div className="navbar-div">
            <div className="infor-user">
              <img src="https://web.nvnstatic.net/tp/T0299/img/avatar.png?v=3" alt="" />
              <h3>{name}</h3>
            </div>
            <p className='active'><a href="/infor">Thông tin tài khoản</a></p>
            <p><a href="">Đổi mật khẩu</a></p>
            <p className='history-or'><a href="/history">Lịch sử đơn hàng</a></p>
            <p><a href="">Sản phẩm yêu thích</a></p>
            <p><a href="">Đăng xuất</a></p>
        </div>
     );
}

export default Navbar;