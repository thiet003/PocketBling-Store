// ShoppingCart.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, updateQuantity } from '../Redux/Slice/cartSlice';
import '../Style/Cart.css'
import '../Responsive/Cart.css'
import { useNavigate } from 'react-router-dom';

function Cart() {
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart.items);
    cart.forEach((item, index) => {
        let url = 'http://localhost:8088/api/v1/products/images/' + item.product.thumbnail;
        const updatedProduct = { ...item.product, thumbnail: url };
        return { ...item, product: updatedProduct };
    })
    const totalPrice = useSelector(state => state.cart.totalPrice);
    const dispatch = useDispatch();
    useEffect(() => {
        sessionStorage.setItem('cart', JSON.stringify({ items: cart }));
    }, [cart]);

    // const handleAddToCart = (product, quantity) => {
    //   dispatch(addToCart({ product, quantity }));
    // };

    const handleRemoveFromCart = productId => {
        dispatch(removeFromCart(productId));
    };

    const handleUpdateQuantity = (productId, quantity) => {
        dispatch(updateQuantity({ productId, quantity }));
    };
    return (
        <div className='main-cart'>
            <section class="h-100 cart-container" >
                <div class="container h-100 py-5 contain-cart">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col-10 box-cart">

                            <div class="d-flex justify-content-between align-items-center mb-4">
                                <h3 class="fw-normal mb-0 text-black">Giỏ hàng mua sắm</h3>
                                <div>
                                    <p class="mb-0 sort"><span class="text-muted">Sắp xếp theo:</span> <a href="#!" class="text-body">giá <i
                                        class="fas fa-angle-down mt-1"></i></a></p>
                                </div>
                            </div>
                            {cart.map(item => (
                                <div class="card rounded-3 mb-4 cart-item">
                                    <div class="card-body p-4">
                                        <div class="row d-flex justify-content-between align-items-center">
                                            <div class="col-md-2 col-lg-2 col-xl-2">
                                                <img
                                                    src={`http://localhost:8088/api/v1/products/images/${item.product.thumbnail}`}
                                                    class="img-fluid rounded-3" alt="Cotton T-shirt" />
                                            </div>
                                            <div class="col-md-3 col-lg-3 col-xl-3">
                                                <p class="lead fw-normal mb-2">{item.product.name}</p>
                                                <p className='cart-price'><span class="text-muted">Giá: </span>{item.product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</p>
                                            </div>
                                            <div class="count-quan col-md-3 col-lg-3 col-xl-2 d-flex">
                                                <button class="btn btn-link px-2 degre"
                                                    onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}>
                                                    <i class="fas fa-minus"></i>
                                                </button>

                                                <input disabled id="form1" min="0" name="quantity" value={item.quantity} type="number"
                                                    class="form-control form-control-sm cart-quantity" />

                                                <button class="btn btn-link px-2 incre"
                                                    onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}>
                                                    <i class="fas fa-plus"></i>
                                                </button>
                                            </div>
                                            <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                <h5 class="mb-0">{((item.quantity * item.product.price)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</h5>
                                            </div>
                                            <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                                                <a onClick={() => handleRemoveFromCart(item.product.id)} href="#!" class="remove-cart"><i class="fas fa-trash fa-lg"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div class="card mb-5 cart-item">
                                <div class="card-body p-4 carrt">

                                    <div class="float-end">
                                        <p class="mb-0 me-5 d-flex align-items-center">
                                            <span class="lead large text-muted me-2 fw-bold">Tổng:</span> <span
                                                class="lead fw-bold large  cart-total-price">{totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</span>
                                        </p>
                                    </div>

                                </div>
                            </div>

                            <div class="d-flex justify-content-end box-button">
                                <button onClick={() => {navigate('/')}} type="button" class="continue-shopping btn btn-light btn-lg me-2">Tiếp tục mua sắm</button>
                                <button onClick={() => {navigate('/order')}} type="button" class="to-checkout btn btn-primary btn-lg">Thanh toán</button>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Cart;