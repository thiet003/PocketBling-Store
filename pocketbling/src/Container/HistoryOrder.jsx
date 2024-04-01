import Navbar from "../Components/Navbar";
import '../Style/HistoryOrder.css'
import '../Responsive/HistoryOrder.css'
import { jwtDecode  } from 'jwt-decode';
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
function HistoryOrder() {
  const [orders, setOrders] = useState([]);
  const [fullName, setFullName] = useState(JSON.parse(sessionStorage.getItem("user")).full_name);
  if (sessionStorage.getItem("user") === null) {
    window.location.href = "/login";
  }
  function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  }
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
    <div className="main-history">
      <div className="profile-content">
        <h3 className="title-profile">Quản lý lịch sử đơn hàng</h3>
        <p className="hello-text">
          <i>Xin chào, </i> <span> {fullName}</span>
        </p>
        <div className="row-infor">
          <div className="pay-nav">
            <Navbar />
          </div>
          <div className="list-order">
            <div className="title">
                <h3>Lịch sử đơn hàng</h3>
            </div>
            <div className="table-responsive">
            <table className="orders-table table">
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
                          <td>{order.total_money.toLocaleString('de-DE')}đ</td>
                          <td>{order.status}</td>
                        </tr>
                      );
                    })
                  }
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryOrder;
