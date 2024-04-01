import { useEffect } from "react";
import "../Style/Profile.css";
import '../Responsive/Profile.css'
import { jwtDecode  } from 'jwt-decode';
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
function Profile() {
  const [fullName, setFullName] = useState(JSON.parse(sessionStorage.getItem("user")).full_name);
  const [mainName, setMainName] = useState(JSON.parse(sessionStorage.getItem("user")).full_name);
  const [phoneNumber, setPhoneNumber] = useState(JSON.parse(sessionStorage.getItem("user")).phone_number);
  const [dateOfBirth, setDateOfBirth] = useState(JSON.parse(sessionStorage.getItem("user")).date_of_birth);
  const [address, setAddress] = useState(JSON.parse(sessionStorage.getItem("user")).address);
  if (sessionStorage.getItem("user") === null) {
    window.location.href = "/login";
  }
  function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  }
  const handleChangeFullName = (event) => {
    setFullName(event.target.value);
  };
  const handleChangeDateOfBirth = (event) => {
    setDateOfBirth(event.target.value);
  };
  const handleChangePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };
  const handleChangeAddess = (event) => {
    setAddress(event.target.value);
  };
  const [orders, setOrders] = useState([]);
  // 
  const getToken = () => {
    return sessionStorage.getItem('access_token');
  }
  const getUserId = () => {
      const userObject = jwtDecode(getToken());
      return userObject && 'userId' in userObject ? parseInt(userObject['userId']) : 0;
  }
  const userId = getUserId();
  console.log(userId);
  const getOrders = ( userId ) => {
    fetch(`http://localhost:8088/api/v1/orders/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => {
      return response.json();
    }).then(data => {
      console.log(data);
      setOrders(data);
      return data;
    }).catch(error => {
      console.error('Error:', error);
    });
  } 
  useEffect(() => {
    getOrders(userId);
    sessionStorage.setItem("orders", JSON.stringify(orders));
  }, []);
  
  return (
    <div className="main-profile">
      <div className="profile-content">
        <h3 className="title-profile">THÔNG TIN TÀI KHOẢN</h3>
        <p className="hello-text">
          <i>Xin chào, </i> <span> {mainName}</span>
        </p>
        <div className="row-infor">
          <div className="par-nav">
            <Navbar/>
          </div>
          {/* <div className="infor-detail">
            <div>
              <img src="https://web.nvnstatic.net/tp/T0299/img/avatar.png?v=3" alt="" />
              <h3>Thiết</h3>
            </div>
            <p>Thông tin tài khoản</p>
            <p>Đổi mật khẩu</p>
            <p>Lịch sử đơn hàng</p>
            <p>Sản phẩm yêu thích</p>
            <p>Đăng xuất</p> */}
            {/* <p>
              <span class="material-symbols-outlined">person</span>
              <b>Họ tên:   </b>{fullName}
            </p>
            <p>
              <span class="material-symbols-outlined">call</span>
              <b>Số ĐT:   </b>{phoneNumber}
            </p>
            <p>
              <span class="material-symbols-outlined">cake</span>
              <b>Ngày sinh:   </b>{dateOfBirth}
            </p>
            <p>
              <span class="material-symbols-outlined">location_on</span>
              <b>Địa chỉ:   </b>{address}
            </p>
            <button>Sửa thông tin</button> */}
          {/* </div> */}
          <div className="profile-infor-user">
            <h2>HỒ SƠ CỦA TÔI</h2>
            <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
            <div className="edit-user">
                <div className="row">
                  <label htmlFor="" className="col-md-3 control-label">Họ tên <span>(*)</span></label>
                  <div className="col-lg-6 col-md-9">
                    <input 
                    type="text" 
                    value={fullName} 
                    placeholder="Họ tên" 
                    onChange={handleChangeFullName}
                    class="form-control"/>
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="" className="col-md-3 control-label">Ngày sinh <span>(*)</span></label>
                  <div className="col-lg-6 col-md-9">
                    <input 
                    type="date" 
                    value={dateOfBirth.split("T")[0]} 
                    onChange={handleChangeDateOfBirth}
                    class="form-control"/>
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="" className="col-md-3 control-label">Số điện thoại <span>(*)</span></label>
                  <div className="col-lg-6 col-md-9">
                    <input 
                    type="text" 
                    value={phoneNumber} 
                    onChange={handleChangePhoneNumber}
                    class="form-control"/>
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="" className="col-md-3 control-label">Địa chỉ <span>(*)</span></label>
                  <div className="col-lg-6 col-md-9">
                    <input 
                    type="text" 
                    value={address} 
                    onChange={handleChangeAddess}
                    class="form-control"/>
                  </div>
                </div>
                <div className="row">
                  <label class="col-md-3 control-label"></label>
                  <div className="col-lg-6 col-md-9">
                    <button>Cập nhật</button>
                  </div>
                </div>
            </div>
          </div>
          {/* <div className="list-order">
            <h3>ĐƠN HÀNG CỦA BẠN</h3>
            <table className="orders-table">
              <thead className="thead-default">
                <tr>
                  <th>Đơn hàng</th>
                  <th>Ngày</th>
                  <th>Địa chỉ</th>
                  <th>Giá trị</th>
                  <th>Tình trạng</th>
                </tr>
              </thead>
              <tbody>
                {
                    orders.map((order, index) => {
                      return (
                        <tr key={index}>
                          <td><Link to={`/order-detail/${order.id}`}><a href="#">{order.id}</a></Link></td>
                          <td>{formatDate(order.order_date)}</td>
                          <td>{order.address}</td>
                          <td>£ {order.total_money}</td>
                          <td>{order.status}</td>
                        </tr>
                      );
                    })
                  }
              </tbody>
            </table>
          </div> */}
        </div>
      </div>
    </div>
  );
}


export default Profile;
