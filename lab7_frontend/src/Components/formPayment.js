import React, { useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";

/*Components*/
import {
  Button,
  Form,
  Input,
  Row,
  Radio,
  Col,
  Select,
  message,
  Modal,
} from "antd";
import axios from "axios";
import { format } from "date-fns";

function FormPayment({visible, setVisible, productChosen, total, customer}) {
  const [form] = Form.useForm();
  let location = useLocation();
  let navigate = useNavigate();
  const { Option } = Select;
  const phoneRegex = /([+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/;

  const [visibleModal, setVisibleModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [employeeChosen, setEmployeeChosen] = useState(1);

  useEffect(() => {
    setVisibleModal(visible);
    // onInit();
  }, [visible]);

  useEffect(() => {
    let getApiEmployees = async () => {
      let datas = await axios.get("http://localhost:8080/employees");
      setEmployees(datas.data);
    };
    getApiEmployees();
  }, [JSON.stringify(location.state)])

  // const data = customer;
  // const onInit = () => {
  //   const { customer } = data;
  //   form.setFieldsValue({ 
  //     fullName: customer.name
  //   }) 
  // }

  const handleCancel = () => {
    // console.log("pro: "+productChosen);
    // console.log("total: "+total);
    // console.log("cus: "+customer.customer.name);
    form.resetFields();
    setVisibleModal(false);
    if (typeof setVisible === "function") {
      setVisible(false);
    }
  };

  

  const onFinish = async (values) => {
    try {
      const res = await axios.post("http://localhost:8080/orders",{
        orderDate: format(new Date(), "yyyy-MM-dd"),
        employee: employees.find((e) => (e.id = employeeChosen)),
        customer: customer.customer
      });
      if (!!res) {
        message.success("Mua hàng thành công!");
        navigate("/home");
      }
    } catch (e) {
      console.log("Error", e);
      message.error(e.message);
    } finally {
    }
  };


  return (
    <Modal
    title="Thông tin mua hàng"
    open={visibleModal}
    onOk={() => handleCancel()}
    onCancel={() => handleCancel()}
    width="50%"
    footer={null}
>
          <Form
            form={form}
            onFinish={onFinish}
            name="form_add_account"
            className="ant-advanced-search-form"
          >
            <Row gutter={15}>
              <Col lg={10} xs={24}>
                <Form.Item
                  label="Họ và tên"
                  name="fullName"
                  rules={[
                    { required: true, message: "Vui lòng nhập tên của bạn " },
                  ]}
                >
                  <Input maxLength={100} />
                </Form.Item>
                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  rules={[
                    { required: true, message: "Vui lòng nhập số điện thoại" },
                    { pattern: new RegExp(phoneRegex), message: "Số điện thoại không đúng định dạng!"}
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col lg={14} xs={24}>                
                <Form.Item
                  label="Địa chỉ"
                  rules={[{ required: true, message:"Vui lòng nhập địa chỉ"}]}
                  name="address"
                >
                  <Input maxLength={150}/>
                </Form.Item>
                <Form.Item
                    label="Phương thức thanh toán"
                    name="payment"
                    >
                        <Radio checked={true}>Thanh toán khi nhận hàng</Radio>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Form.Item
                label="Nhân viên bán hàng"
                name="emp"
                rules={[{required:true}]}>
                  <Select
                    onChange={(e) => setEmployeeChosen(e)}>
                    {employees.map((e) => (
                      <Option key={e.id} value={e.empId}>{e.fullName}</Option>
                    ))}
                  </Select>

              </Form.Item>
            </Row>
            <Row>
              <Col lg={10} xs={24}>
                <Form.Item label="Sản phẩm">
                    {productChosen.map(product => 
                        <div>{product.name} &ensp;x{product.quantity}<br/></div>)}
                </Form.Item>
              </Col>
              <Col lg={14} xs={24}>
                <Form.Item label="Tổng tiền">
                      {new Intl.NumberFormat("vi-VN", {
                                                                            style: "currency",
                                                                            currency: "VND",
                                                                            }).format(total)}
                  </Form.Item>
              </Col>                
            </Row>
            <div>
              <Button
                className="btn-signin"
                type="light"
                size="large"
                onClick={handleCancel}
              >
                Hủy
              </Button>
              <Button
                className="btn-signin"
                htmlType="submit"
                type="primary"
                size="large"
              >
                Xác nhận
              </Button>
            </div>
          </Form>
    </Modal>
  );
}

export default FormPayment;
