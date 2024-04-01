import '../Style/Confirm.css'
function Confirm() {
    const backToHome = () =>{
        window.location.href = '/';
    }
    return (  
        <div className="confirm-container">
            <h3>Cảm ơn bạn đã đặt hàng</h3>
            <button onClick={() => backToHome()}>Quay về trang chủ</button>
        </div>
    );
}

export default Confirm;