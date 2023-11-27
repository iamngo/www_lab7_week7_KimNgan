import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const [phone, setPhone] = useState("");
    const [pass, setPass] = useState("");

    let navigate = useNavigate();

    let handleLogin = async() => {
        let datas = await axios.post("http://localhost:8080/accounts/login",
        {phoneNumber: phone,
        password: pass})

        if(datas.data.role === "user"){
            let dataGetCustomer = await axios.get(`http://localhost:8080/accounts/get-by-phone/${phone}`);
            navigate("/home", {state : {...dataGetCustomer.data, phoneNumber : phone, accountId : datas.data.accountId}})
        }else if(datas.data.role === "admin"){
            navigate("/dashboard")
        }
        else{
            alert("Số điện thoại hoặc mật khẩu không đúng!");
        }
    }

    return ( <div className="container-login">
    <span className="text-login">ĐĂNG NHẬP</span>
    <div className="form-login-content">
        <label className="login-label">Số điện thoại : </label>
        <input type="text" value={phone} id="login" className="login-input" 
        onChange={(e) => setPhone(e.target.value)}
        />
    </div>
    <div className="form-login-content">
        <label className="login-label">Mật khẩu : </label>
        <input type="password" value={pass} id="login" className="login-input" 
        onChange={(e) => setPass(e.target.value)}
        />
    </div>
    <button className="btn-login" onClick={handleLogin}>Đăng Nhập</button>
   
</div> );
}

export default Login;