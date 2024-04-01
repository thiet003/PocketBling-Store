import { useEffect, useState } from "react";
import "../Style/Home.css";
import "../Style/ProductItem.css";
import '../Responsive/Home.css'
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
const ProductItem = ({ item }) => {
  const addToCart = (e) => {
    e.stopPropagation();
    window.location.href = '/cart';
  }
  const navigate = useNavigate();
  let url = "http://localhost:8088/api/v1/products/images/" + item.thumbnail;
  return (
    <div onClick={() => {navigate(`/product-detail/${item.id}`)}} className="product-item">
      <img class="product-image" src={url} alt="Product" />
      <div class="product-body">
        <h3 class="product-name">{item.name}</h3>
        <p class="product_price">{item.price.toLocaleString('de-DE')}đ</p>
        {/* <button  class="btn btn-primary product-atc">Thêm vào giỏ hàng</button> */}
      </div>
    </div>
  );
};
function Home() {
  const [categoryList, setCategoryList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [pages, setPages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [visiblePages, setVisiblePages] = useState([]);
  const [keywords, setKeyword] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const q = query.get('q');
  console.log(q);
  const searchProduct = () => {
      fetchProductData();
  }
  const handleInputChange = (event) => {
    setKeyword(event.target.value);
  };
  
  // Xử lý khi giá trị của select thay đổi
  const handleSelectChange = (event) => {
    setSelectedCategoryId(event.target.value);
  };
  const onPageChange = (numberOfPage) => {
    console.log(numberOfPage);
    setCurrentPage(numberOfPage);
  };
  function generateVisiblePageArray(crPage, ttPages) {
    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(crPage - halfVisiblePages, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, ttPages);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }
    return new Array(endPage - startPage + 1)
      .fill(0)
      .map((_, index) => startPage + index);
  }
  const Path = "http://localhost:8088/api/v1";
  const fetchCategoryData = () => {
    fetch(Path + "/categories")
      .then((Response) => {
        if (!Response.ok) {
          throw new Error("Error");
        }
        return Response.json();
      })
      .then((data) => {
        setCategoryList(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchProductData = (keyword, category_id, page, limit) => {
    const params = new URLSearchParams({
      keyword: q != null ? q : '',
      category_id: selectedCategoryId,
      page: currentPage,
      limit: itemsPerPage,
    });

    // Append the query string to the path
    const urlWithParams = `${Path}/products?${params.toString()}`;

    fetch(urlWithParams)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Product:", data);
        setProductList(data.products);
        setTotalPages(data.totalPages);
        console.log(totalPages);
        setVisiblePages(generateVisiblePageArray(currentPage, data.totalPages));
        console.log(visiblePages);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if(q != null)
    {
        setKeyword(q);
    }
    fetchCategoryData();
    fetchProductData();
  }, [currentPage, selectedCategoryId, q]);
  return (
    <div className="main-home">
      {/* Search Content */}
      <div className="category-list">
          <p 
            onClick={() => {
              setSelectedCategoryId(0);
            }}
            className="category-item">Tất cả</p>
          {categoryList.map((category, index) => (
            <p 
              onClick={() => {
                setSelectedCategoryId(category.id);
              }}
              key={index} className="category-item">
              {category.name}
            </p>
          ))}
      </div>
      {/* Danh sach san pham */}
      <div class="product">
        <div class="row">
          {productList.map((product, index) => (
            <div class="col-lg-3 col-md-6 pro-contain">
              <ProductItem key={index} item={product} />
            </div>
          ))}
        </div>
      </div>
      {/* Danh sach cac trang */}
      <div class="d-flex justify-content-center mt-5">
        <nav aria-label="Page navigation">
          <ul class="pagination">
            <li class="page-item">
              <button onClick={() => onPageChange(0)} class="page-link">
                First
              </button>
            </li>
            <li class="page-item">
              <button
                onClick={() => {
                  if (currentPage > 0) {
                    onPageChange(currentPage - 1);
                  }
                }}
                class="page-link"
              >
                Prev
              </button>
            </li>
            {visiblePages.map((visi, index) => (
              <li key={index} class={`page-item ${currentPage === visi -1 ? 'active' : ''}`}>
                <button
                  onClick={() => onPageChange(visi - 1)}
                  class="page-link"
                >
                  {visi}
                </button>
              </li>
            ))}
            <li class="page-item">
              <button
                onClick={() => {
                  if (currentPage < totalPages - 1) {
                    onPageChange(currentPage - 1);
                  }
                }}
                class="page-link"
              >
                Next
              </button>
            </li>
            <li class="page-item">
              <button
                onClick={() => onPageChange(totalPages - 1)}
                class="page-link"
              >
                Last
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Home;
