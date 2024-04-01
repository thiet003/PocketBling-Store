import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import "../Style/OrderDetail.css";
import '../Responsive/OrderDetail.css'

function OrderDetail() {
    const [shipDate, setShipDate] = useState("")
    function formatDate(dateString) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    }
    function shippingDate(dateString){
        console.log(order);
        console.log(dateString);
        var orderDate = new Date("2024-03-31T16:46:30");
        orderDate.setDate(orderDate.getDate() + 7);
        return orderDate.toISOString();
    }
    const [order, setOrder] = useState({});
    async function processData(data) {
        setShipDate(order.order_date);
    }
    const { id } = useParams();
    const getOrder = (id) => {
        fetch(`http://localhost:8088/api/v1/orders/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            return response.json();
        }).then(data => {
            console.log(data);
            setOrder(data);
            return data;
        }).catch(error => {
            console.error('Error:', error);
        });
    }

    useEffect(() => {
        getOrder(id);
        console.log(order);
    }, [id]);

    return ( 
        <div className="main-order-detail">
            <h1>
            <span class="material-symbols-outlined">
                local_mall
            </span>
                Chi tiết đơn hàng
            </h1>
            <div className="infor-product">
                <div className="product-detail">
                    <h4>Sản phẩm của đơn hàng #{id}</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Sản phẩm</th>
                                <th>Số lượng</th>
                                <th>Giá</th>
                                <th>Tổng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                order.order_details && order.order_details.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.product.name}</td>
                                            <td>{item.numberOfProducts}</td>
                                            <td>{item.price}đ</td>
                                            <td>{item.price * item.numberOfProducts}đ</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="price-detail">
                    <h4>Chi phí</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Mô tả</th>
                                <th>Giá</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Giá sản phẩm :</td>
                                <td>{order.total_money}đ</td>
                            </tr>
                            <tr>
                                <td>Phí vận chuyển :</td>
                                <td>0đ</td>
                            </tr>
                            <tr>
                                <td><b>Tổng cộng :</b></td>
                                <td><b>{order.total_money}đ</b></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="infor-person">
                <div className="user-infor">
                    <h4>Thông tin người nhận</h4>
                    <p>
                        <b>Họ tên:   </b><span>{order.full_name}</span>
                    </p>
                    <p>
                        <b>Số ĐT:   </b><span>{order.phone_number}</span>
                    </p>
                    <p>
                    <b>Email:   </b><span>{order.email}</span>
                    </p>
                    <p>
                        <b>Địa chỉ:   </b><span>{order.address}</span>
                    </p>
                    <p>
                        <b>Ghi chú:   </b><span>{order.note}</span>
                    </p>
                </div>
                <div className="shipping-infor">
                    <h4>Thông tin vận chuyển</h4>
                    <p>
                        <b>Ngày đặt hàng:   </b><span>{formatDate(order.order_date)}</span>
                    </p>
                    <p>
                        <b>Ngày giao hàng dự kiến:   </b><span>{formatDate(shippingDate(shipDate))}</span>
                    </p>
                    <p>
                        <b>Phương thức vận chuyển:   </b><span>{order.shipping_method}</span>
                    </p>
                    <p>
                        <b>Phương thức thanh toán:   </b><span>{order.payment_method} </span>  
                    </p>
                    <p>
                        <b>Tình trạng đơn hàng:   </b><span>{order.status}</span>
                    </p>
                </div>
            </div>
        </div>
     );
}

export default OrderDetail;