import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Style/ProductDetail.css";
import '../Responsive/ProductDetail.css'

function ProductDetail() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [productDetail, setProductDetail] = useState({});
  const [productImages, setProductImages] = useState([]);
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const previousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? productImages.length - 1 : prevIndex - 1
    );
  };
  const thumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === productImages.length - 1 ? 0 : prevIndex + 1
    );
  };
  // Them vao gio hang
  const addToCart = () => {
    const cart = JSON.parse(sessionStorage.getItem('cart')) != null ? JSON.parse(sessionStorage.getItem('cart')) : {items: [], totalPrice: 0};
    const cartItem = {
      product: productDetail,
      quantity: quantity
    }
    let checkItem = false;
    cart.items.forEach((item) => {
      if(item.product.id === cartItem.product.id) 
      {
        item.quantity += quantity;
        checkItem = true;
      }
    })
    if(checkItem === false)
    {
      cart.items.push(cartItem);
    }
    // cart.totalPrice = cart.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    sessionStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = '/cart';
  }
  const buyNow = () =>{
    const cart = JSON.parse(sessionStorage.getItem('cart')) != null ? JSON.parse(sessionStorage.getItem('cart')) : {items: [], totalPrice: 0};
    const cartItem = {
      product: productDetail,
      quantity: quantity
    }
    let checkItem = false;
    cart.items.forEach((item) => {
      if(item.product.id === cartItem.product.id) 
      {
        item.quantity += quantity;
        checkItem = true;
      }
    })
    if(checkItem === false)
    {
      cart.items.push(cartItem);
    }
    // cart.totalPrice = cart.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    sessionStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = '/order';
  }
  const productDetailPath = "http://localhost:8088/api/v1/products/" + id;
  const fetchProductDetailData = () => {
    fetch(productDetailPath)
      .then((Response) => {
        if (!Response.ok) {
          throw new Error("Error");
        }
        return Response.json();
      })
      .then((data) => {
        console.log(data);
        setProductDetail(data);
        let productImage = data.product_images.map((image) => {
          return (
            "http://localhost:8088/api/v1/products/images/" + image.imageUrl
          );
        });
        console.log(productImage);
        setProductImages(productImage);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchProductDetailData();
    // setPrice(productDetail.price.toLocaleString('de-DE'))
  }, []);

  // Giao dien
  return (
    <div className="product-details">
      <div class="productDetail-container row">
        <div class="col-md-6 main-image">
          <div
            id="carouseExample"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {productImages.map((image, index) => (
                <div
                  key={index}
                  className={`carousel-item ${
                    index === currentImageIndex ? "active" : ""
                  }`}
                >
                  <div className="square-image">
                    <img src={image} alt="Ảnh" className="produt-image" />
                  </div>
                </div>
              ))}
            </div>

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouseExample"
              data-bs-slide="prev"
              onClick={previousImage}
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouseExample"
              data-bs-slide="next"
              onClick={nextImage}
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>

          <div className="row main-thumbnail">
            <div className="thumbnail-container">
              {productImages.map((image, index) => (
                <div
                  key={index}
                  className={`thumbnail-item ${
                    index === currentImageIndex ? "active" : ""
                  }`}
                  onClick={() => thumbnailClick(index)}
                >
                  <img src={image} alt="Ảnh" className="thumbnail-image" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div class="col-md-6 box-product">
          <div class="product-detail">
            <h2>{productDetail.name}</h2>
            <div className="product_evaluate">
              <div className="product_star">
                <span>5.0</span>
                <img
                  src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/44c46951c46c5a5e8129.svg"
                  alt=""
                />
                <img
                  src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/44c46951c46c5a5e8129.svg"
                  alt=""
                />
                <img
                  src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/44c46951c46c5a5e8129.svg"
                  alt=""
                />
                <img
                  src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/44c46951c46c5a5e8129.svg"
                  alt=""
                />
                <img
                  src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/44c46951c46c5a5e8129.svg"
                  alt=""
                />
              </div>
              <span className="evaluate-content">1 đánh giá</span>
              <span className="buyed">1 đã bán</span>
            </div>
            <p className="product-price">Giá: {productDetail.price}đ</p>
            <p className="product-desc">
              <b>Mô tả sản phẩm:</b> {productDetail.description}
            </p>
            <div class="product-quantity">
              <span className="quantity-label">Số lượng</span>
              <div class="border-wrapper">
                <button
                  onClick={() => {
                    if (quantity > 1) setQuantity(quantity - 1);
                  }}
                >
                  -
                </button>
                <input disabled type="text" value={quantity} />
                <button
                  onClick={() => {
                    setQuantity(quantity + 1);
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <div class="product-actions">
              <button onClick={() => addToCart()} class="btn btn-primary btn-prd-atc">
                Thêm vào giỏ hàng
              </button>
              <button onClick={() => buyNow()} class="btn btn-success btn-prd-buy">Mua ngay</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductDetail;
