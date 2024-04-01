import { useState } from 'react';
import '../Style/Register.css'
import '../Responsive/Register.css'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function Register() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [showFail, setShowFail] = useState(0);
  const registerPath = "http://localhost:8088/api/v1/users/register";
  const checkInput = () => {
    if(phoneNumber.length < 5) return 1;
    if(password.length < 1) return 2;
    if(retypePassword.length < 1) return 3;
    if(fullName.length < 1) return 4;
    if(dateOfBirth.length < 1) return 5;
    if(address.length < 1) return 6;
    return 0;
 }
  const registerSubmit = async (event) => {
    console.log(dateOfBirth);
    event.preventDefault(); 
    if(checkInput() > 0) {
      setShowFail(checkInput());
      return;
    }
    console.log("dghd");
    setShowFail(0);
    try {
      let userRegisterDTO = {
        fullname: fullName,
        phone_number: phoneNumber,
        password: password,
        retype_password: retypePassword,
        date_of_birth: dateOfBirth,
        address: address,
        role_id: 1
      };
      console.log(userRegisterDTO);
      fetch(registerPath, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userRegisterDTO),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response);
          }
          return response.json();
        })
        .then((data) => {
          toast.success('Đăng kí thành công!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          console.log(data);
          navigate('/login');
        })
        .catch((error) => {
          toast.error('Có lỗi khi đăng kí', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
            console.log(error);
        });
    } catch (error) {}
  };

  return (
    <div class="signup-content">
      <form onSubmit={registerSubmit}>
        <div class="signup">
          <div className="signup-header">
              <a href="/login">Đăng nhập</a>
              <a href="/register">Đăng kí</a>
          </div>
          <div class="main-signup">
            <input 
              class="register-input input-name"
              type="text"
              id="phone"
              name="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder='Số điện thoại đăng nhập (*)'
            />
              {showFail == 1 && <p className='fail-p'>Số điện thoại phải trên 5 kí tự!</p>}
            <input
              class="register-input input-password"
              type="password"
              name="password"
              id="password"
              placeholder="Mật khẩu (Ít nhất 3 kí tự)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
              {showFail == 2 && <p className='fail-p'>Mật khẩu không được bỏ trống!</p>}
            <input
              class="register-input input-password"
              type="password"
              name="retypePassword"
              id="retypePassword"
              placeholder="Nhập lại mật khẩu (Ít nhất 3 kí tự)"
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
            />
              {showFail == 3 && <p className='fail-p'>Mật khẩu không được bỏ trống!</p>}
            <input
              name="fullName"
              class="register-input input-name"
              type="text"
              id="name"
              value={fullName}
              placeholder='Họ tên (*)'
              onChange={(e) => setFullName(e.target.value)}
            />
              {showFail == 4 && <p className='fail-p'>Tên không được bỏ trống!</p>}
            <input
              class="register-input input-name"
              type="date"
              id="birth"
              name="dateOfBirth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
              {showFail == 5 && <p className='fail-p'>Ngày sinh không được bỏ trống!</p>}
            <input 
            name="address" 
            class="register-input input-name" 
            type="text" 
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            id="address" 
            placeholder='Địa chỉ chi tiết (*)'
            />
              {showFail == 6 && <p className='fail-p'>Địa chỉ không được bỏ trống!</p>}
            <button type="submit" class="signup-button">Đăng ký</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
