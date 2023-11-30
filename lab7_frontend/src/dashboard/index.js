import { Logo } from "../assets";
import { useNavigate } from "react-router-dom";


function Dashboard() {
    let navigate = useNavigate();

    return ( 
        <div className="homePage">
                <div className="header">
                    <div className="header-left"><Logo />    CỬA HÀNG ĐIỆN TỬ</div>
                    <div className="header-right">Admin</div>
                </div>
                <div className="content">
                    <button onClick={() => {navigate("/employee-manage")}}>Quản lý nhân viên</button>
                    <button onClick={() => {navigate("/statistic")}}>Thống kê</button>
                </div>
        </div>

     );
}

export default Dashboard;