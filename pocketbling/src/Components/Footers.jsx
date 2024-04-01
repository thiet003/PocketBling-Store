import React from 'react';
import "../Style/Footer.css";
import '../Responsive/Footer.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fab);
function Footer() {
  return (
    <div className='footer'>
      <div className="social-media">
        <a href="https://www.instagram.com/_thiet03_/?hl=vi">
          <FontAwesomeIcon className='media-icon' icon={['fab', 'instagram']} />
        </a>
        <a href="https://www.facebook.com/profile.php?id=100030802511448">
          <FontAwesomeIcon className='media-icon' icon={['fab', 'facebook-f']} />
        </a>
        <a href="">
          <FontAwesomeIcon className='media-icon' icon={['fab', 'youtube']} />
        </a>
        <a href="">
          <FontAwesomeIcon className='media-icon' icon={['fab', 'twitter']} />
        </a>
        
      </div>
      <div className="contact row">
        <div className="hepler col-md-6 col-lg-4 contact-item">
          <h4>TRỢ GIÚP</h4>
          <div className='rul'></div>
          <p>GIỚI THIỆU</p>
          <p>CHÍNH SÁCH ĐỔI TRẢ HÀNG</p>
          <p>QUI ĐỊNH THANH TOÁN VÀ VẬN CHUYỂN</p>
          <p>CHÍNH SÁCH BẢO MẬT THÔNG TIN KHÁCH HÀNG</p>
        </div>
        <div className="infor-contact col-md-6 col-lg-4 contact-item">
          <h4>THÔNG TIN LIÊN HỆ</h4>
          <div className='rul'></div>
          <h6>HOTLINE:</h6>
          <p>1900 886 893</p>
          <h6>EMAIL:</h6>
          <p>OCSEN.HR@GMAIL.COM</p>
          <h6>FACEBOOK FANPAGE:</h6>
          <p>HTTPS://WWW.FACEBOOK.COM</p>
          <p>Số ĐKKD: 01D8032318 - Ngày Cấp: 04/04/2017</p>
        </div>
        <div className="address-contact col-md-6 col-lg-4 contact-item">
          <h4>CỬA HÀNG ỐC SÊN</h4>
          <div className='rul'></div>
          <h6>WEBSITE:</h6>
          <p>WWW.OCSENSHOP.COM</p>
          <h6>ĐỊA CHỈ:</h6>
          <p>250 KIM NGƯU, Q. HAI BÀ TRƯNG, HÀ NỘI</p>
          <p>58 CHÙA LÁNG, Q. ĐỐNG ĐA, HÀ NỘI</p>
          <p>500 LÊ VĂN SỸ, P. 14, QUẬN 3, TP.HCM</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
