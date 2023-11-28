import { Logo } from "../assets";
import "./Admin.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import FormAdd  from "./Components/formAdd";
import FormEdit  from "./Components/formEdit";
import { message } from "antd";



const Admin = () => {
    const [emp, setEmp] = useState([]);
    const [visibleAdd, setVisibleAdd] = useState(false);
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [dataChosen, setDataChosen] = useState({});
    const [isClickBtn, setIsClickBtn] = useState(false);

    useEffect(() => {
        let getApiEmps = async() => {
            let datas = await axios.get("http://localhost:8080/employees");
            setEmp(datas.data);
        }
        getApiEmps();
        console.log(emp);
    }, [JSON.stringify(emp), isClickBtn]);

    const handleClickEdit = async (id) => {
       let datas = await axios.get(`http://localhost:8080/employees/${id}`);
        setDataChosen(datas.data);
        setVisibleEdit(true);
        console.log(datas.data);
    }
    const handleClickDelete = async (id) => {
        try{
            const res = await axios.delete(`http://localhost:8080/employees/${id}`);
                message.success("Xóa thành công!");
                setIsClickBtn(!isClickBtn);
            
        }catch(e) {
            message.error(e.message);
        }
    }

    let handleChangeIsClickBtn = (boolean) => {
        setIsClickBtn(boolean)
    }

    return (
        <div>
            <div className="homePage">
                <div className="header">
                    <div className="header-left"><Logo />    CỬA HÀNG ĐIỆN TỬ</div>
                    <div className="header-right">QUẢN LÝ NHÂN VIÊN</div>
                </div>
                <div className="content">
                    <FormAdd 
                    setVisible={setVisibleAdd}
                    visible={visibleAdd}
                    handleChangeIsClickBtn={handleChangeIsClickBtn}
                    isClickBtn={isClickBtn}
                    />
                    <FormEdit 
                    setVisible={setVisibleEdit}
                    visible={visibleEdit}
                    data={dataChosen}
                    handleChangeIsClickBtn={handleChangeIsClickBtn}
                    isClickBtn={isClickBtn}
                    />
                    { 
                    <table>
                    <tr>
                      <th>ID</th>
                      <th>Họ và tên</th>
                      <th>Số điện thoại</th>
                      <th>Email</th>
                      <th>Địa chỉ</th>
                      <th></th>
                      <button onClick={() => setVisibleAdd(true)}>+ Thêm mới</button>
                     
                    </tr>   
                    {emp.map(emp => 
                            <tr className="emp" key={emp.id}>
                                <td>{emp.empId}</td>
                                <td>{emp.fullName}</td>
                                <td>{emp.phone}</td>
                                <td>{emp.email}</td>
                                <td>{emp.address}</td>
                                <button onClick={() => handleClickDelete(emp.empId)}>Xóa</button>
                                <button onClick={() => handleClickEdit(emp.empId)}>Sửa</button>
                                
                            </tr>
                            
                            )} 
                  </table>     
                    } 
                </div>
                <div className="footer">
                    <span>Le Thi Kim Ngan - 20041421</span>
                </div>
            </div>
                       
        </div>
    );
}

export default Admin;