import { useState } from "react";
import "../Style/Login.css";
import '../Responsive/Login.css'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';

function Login() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showFail, setShowFail] = useState(0);
  const loginPath = "http://localhost:8088/api/v1/users/login";
  const userPath = "http://localhost:8088/api/v1/users/details";
  const fetchUserData = async () => {
    try {
      const response = await fetch(userPath, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem('access_token')}`
        },
      });
      if (!response.ok) {
        throw new Error(response.statusText); // Sửa đổi ở đây để lấy thông điệp lỗi phù hợp
      }
      const data = await response.json();
      console.log(data);
      sessionStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
      console.log("Lỗi khi tải user");
    }
  };
  const loadToHome = async () => {
    window.location.href = '/';
  }
  const completeLogin = async () => {
    await fetchUserData();
    loadToHome();
  }
  const checkInput = () => {
     if(phoneNumber.length !== 10){
        return 1;
     }
     if(password.length < 3) 
     {
        return 2;
     }
     return 0;
  }
  const handleSubmit = async (event) => {
    event.preventDefault(); // Ngăn việc trang web reload khi submit form
    if(checkInput() > 0) {
      setShowFail(checkInput());
      return;
    }
    setShowFail(0);
    try {
      let userLoginDTO = {
        phone_number: phoneNumber,
        password: password,
      };
      fetch(loginPath, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userLoginDTO),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Login");
          toast.success('Đăng nhập thành công!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          sessionStorage.setItem('access_token',data.token);
          
          completeLogin();
          // await window.location.href = '/';
          // navigate('/')
        })
        .catch((error) => {
          setShowFail(3);
          toast.error('Thông tin đăng nhập không chính xác!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    } catch (error) {}
  };

  return (
    <div>
      <div class="login-content">
        <form onSubmit={handleSubmit}>
          <div class="login">
            <div className="login-header">
              <a href="/login">Đăng nhập</a>
              <a href="/register">Đăng kí</a>
            </div>
            <div class="main-login">
              <input 
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              name="phone" class="input-name" type="text" id="phone" placeholder="Nhập số điện thoại"/>
              {showFail == 1 && <p className='fail-p'>Số điện thoại phải có 10 kí tự!</p>}
              <input
                class="input-password"
                type="password"
                id="password"
                name="password"
                placeholder="Ít nhất 3 kí tự"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {showFail == 2 && <p className='fail-p'>Mật khẩu phải có ít nhất 3 kí tự!</p>}
              {showFail == 3 && <p className='fail-p'>Thông tin đăng nhập không đúng!</p>}
              <div>
              {message && <p>{message}</p>}
              </div>
              <button type="submit" class="login-button">
                Đăng nhập
              </button>
              <div class="remember">
                <a class="remember-link" href="/login">
                  Quên mật khẩu?
                </a>
              </div>
              <p class="not-resisger">
                Hoặc đăng nhập với
              </p>
              <button className="orther-btn login-facebook-btn"><b>f</b> Đăng nhập bằng facebook</button>
              <button className="orther-btn login-google-btn"><b>G</b> Đăng nhập bằng google</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
