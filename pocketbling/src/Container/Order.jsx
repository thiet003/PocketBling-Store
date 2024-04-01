import { useState } from 'react';
import '../Style/Order.css'
import '../Responsive/Order.css'
import { jwtDecode  } from 'jwt-decode';
import { toast } from 'react-toastify';


function Order() {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [note, setNote] = useState('');
    const [shippingMethod, setShippingMethod] = useState('Vận chuyển thường');
    const [paymentMethod, setPaymentMethod] = useState('Thanh toán khi nhận hàng');
    const [showFail, setShowFail] = useState(0);
    const cart = JSON.parse(sessionStorage.getItem('cart')) != null ? JSON.parse(sessionStorage.getItem('cart')) : { items: [], totalPrice: 0 };
    const cartList = cart.items;
    const totalPrice = cartList.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    const handlePaymentChange = (event) => {
        console.log(event.target.value);
        setPaymentMethod(event.target.value);
    }
    const handleShippingChange = (event) => {
        console.log(event.target.value);
        setShippingMethod(event.target.value);
    }
    const getToken = () => {
        return sessionStorage.getItem('access_token');
    }
    const getUserId = () => {
        const userObject = jwtDecode(getToken());
        return userObject && 'userId' in userObject ? parseInt(userObject['userId']) : 0;
    }
    const checkInput = () => {
        if(fullname.length < 1 ){
            return 1;
        }
        if(phoneNumber.length < 5){
            return 2;
        }
        if(email.length < 1 ){
            return 3;
        }
        if(address.length < 1 ){
            return 4;
        }
        return 0;
    }
    const handleOrderPlace = () => {
        if(checkInput() > 0) {
            setShowFail(checkInput());
            console.log("hehe");
            return;
        }
        setShowFail(0);
        const cartItemDTO = cartList.map(cartItem => ({
            product_id: cartItem.product.id,
            quantity: cartItem.quantity
        }));
        let user_id = getUserId();
        let orderDTO = {
            user_id: user_id,
            full_name: fullname,
            email: email,
            phone_number: phoneNumber,
            address: address,
            note: note,
            shipping_method: shippingMethod,
            payment_method: paymentMethod,
            total_money: totalPrice,
            cart_items: cartItemDTO 
        }
        const orderPath = 'http://localhost:8088/api/v1/orders'
        const createOrder = () => {
            fetch(orderPath, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem('access_token')}`
              },
              body: JSON.stringify(orderDTO)
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error(response);
                }
                return response.json();
              })
              .then((data) => {
                console.log(data);
                toast.success('Đặt hàng thành công!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                sessionStorage.removeItem('cart')
                window.location.href = '/confirm';
                
              })
              .catch((error) => {
                console.log("Lỗi khi tạo đơn hàng");
              });
          };
          createOrder();
        console.log(orderDTO);
    }
    return (
        <div className='main-order'>
            <div>
                <h1>Thanh toán đơn hàng</h1>
            </div>
            <div class="card">
                <div class="card-body">
                    <div class="row pay-box">
                        <div class="col-lg-4 col-md-6 form-pay">
                            <div class="left form-pay-l">
                                <h5 className='order-infor-title'><span>1</span> Thông tin cá nhân</h5>
                                <form className='form-user-order'>
                                    <input 
                                        type="text"
                                        id="fullname"
                                        name="fullname"
                                        value={fullname}
                                        onChange={(e) => setFullname(e.target.value)}
                                        placeholder="Họ tên *" 
                                    />
                                    {showFail == 1 && <p className='fail-p'>Họ tên không được để trống</p>}
                                    <input 
                                        type="text"
                                        id="phone-number"
                                        name="phoneNumber"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        placeholder="Điện thoại *" 
                                    />
                                    {showFail == 2 && <p className='fail-p'>Số điện thoại phải trên 5 kí tự</p>}
                                    <input 
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email *" 
                                    />
                                    {showFail == 3 && <p className='fail-p'>Email không được để trống</p>}
                                    <input 
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="Địa chỉ chi tiết" 
                                    />
                                    {showFail == 4 && <p className='fail-p'>Địa chỉ không được để trống</p>}
                                    <input 
                                        type="text"
                                        id="note"
                                        name="note"
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                        placeholder="Ghi chú" 
                                    />
                                </form>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 mid">
                            <h5 class="shipping-title order-infor-title"><span>2</span>Phương thức vận chuyển</h5>
                            <div className='shipping-input' onChange={handleShippingChange}>
                                <div className='item-shipping'>
                                    <input
                                        type="radio"
                                        value="Vận chuyển thường"
                                        name="shippingMethod"
                                        checked={shippingMethod === "Vận chuyển thường"}
                                    /> 
                                    <span>Vận chuyển thường(normal)</span>
                                </div>
                                <div className='item-shipping'>
                                    <input
                                        type="radio"
                                        value="Vận chuyển nhanh"
                                        name="shippingMethod"
                                        checked={shippingMethod === "Vận chuyển nhanh"}
                                    />  
                                    <span>Vận chuyển nhanh(Express)</span>
                                </div>
                            </div>
                            <h5 class="shipping-title last-title order-infor-title"><span>3</span>Phương thức thanh toán</h5>
                            <div className='shipping-input' onChange={handlePaymentChange}>
                                <div className='item-shipping'>
                                    <input
                                        type="radio"
                                        value="Thanh toán khi nhận hàng"
                                        name="paymentMethod"
                                        checked={paymentMethod === "Thanh toán khi nhận hàng"}
                                    /> 
                                    <span>Thanh toán khi nhận hàng (COD)</span>
                                </div>
                                <div className='item-shipping'>
                                    <input
                                        type="radio"
                                        value="Thanh toán online"
                                        name="paymentMethod"
                                        checked={paymentMethod === "Thanh toán online"}
                                    />  
                                    <span>Thanh toán online</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 pay-content">
                            <div class="right">
                                <h5 className='order-infor-title'><span>4</span> Thông tin giỏ hàng</h5>
                                <table className='order-table-product'>
                                    <thead>
                                        <tr>
                                            <th width="50%">Tên sản phẩm</th>
                                            <th width="25%">Số lượng</th>
                                            <th width="25%">Thành tiền</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                    cartList.map((item) => (
                                        <tr>
                                            <td>
                                                <a href={`/product-detail/${item.product.id}`}>{item.product.name}</a>
                                                <div>Đơn giá: <strong>{item.product.price.toLocaleString('de-DE')}đ</strong></div>
                                            </td>
                                            <td>
                                                {item.quantity}
                                            </td>
                                            <td>
                                                <strong>{(item.product.price*item.quantity).toLocaleString('de-DE')}đ</strong>
                                            </td>
                                        </tr>
                                    ))
                                }
                                    </tbody>
                                </table>
                                
        
                                <div class="row-cal">
                                    <p>Tạm tính</p>
                                    <div className='price-details'>{totalPrice.toLocaleString('de-DE')} đ</div>
                                </div>
                                <div class="row-cal">
                                    <p>Phí vận chuyển</p>
                                    <div className='price-details'>0 đ</div>
                                </div>
                                
                                <div class="row-cal">
                                    <p>Mã giảm giá</p>
                                    <div className='price-details'>0 đ</div>
                                </div>
                                <div class="row-cal">
                                    <p>Tổng cộng</p>
                                    <div className='price-details'>{totalPrice.toLocaleString('de-DE')} đ</div>
                                </div>
                                <div className='div-btn-order'>
                                    <button onClick={() => handleOrderPlace()} class="btn order-btn">Thanh toán</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                </div>
            </div>
        </div>
    );
}

export default Order;