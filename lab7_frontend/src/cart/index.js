import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Cart.scss";
import { Logo } from "../assets";
import FormPayment from "../Components/formPayment";


const Cart = () => {
    let location = useLocation();
    let navigate = useNavigate();
    const [productChosen, setProductChosen] = useState([]);
    const [total, setTotal] = useState(0);
    const [customer, setCustomer] = useState();
    const [visible, setVisible] = useState(false);


    useEffect(() => {
        setProductChosen(location.state.productChosen);
        setCustomer(location.state.customer);
        console.log("state: "+location.state.customer);
      }, [JSON.stringify(location.state)]);
    
      useEffect(() => {
        let newTotal = productChosen.reduce(
          (sum, product) => sum + product.price * product.quantity,
          0
        );
        setTotal(newTotal);
      }, [productChosen]);
    
      let handleChangeQuantity = (id, value) => {
        productChosen.find((pro) => pro.productId === id).quantity = value;
        setProductChosen([...productChosen]);
    
        setTotal(
          productChosen.reduce(
            (sum, product) =>
              product.productId !== id
                ? sum + product.price * product.quantity
                : sum + product.price * value,
            0
          )
        );
      };
    //   let handleClickPlus = (id) => {
    //     let e = document.getElementById('quantity');
    //     console.log(e.value);
    //     let quantity = Number(e.value);
    //     quantity += 1;
    //     e.value = quantity;
    //   }

    return ( 
    <div className="homePage">
                <div className="header">
                    <div className="header-left"><Logo />    CỬA HÀNG ĐIỆN TỬ</div>
                    <div className="header-right" >GIỎ HÀNG</div>
                </div>
    <div className="content">
      <FormPayment 
      visible={visible}
      productChosen={productChosen}
      total={total}
      customer={customer}/>
        {
            productChosen.map(product => 
                <div className="product" key={product.productId}>
                    <div className="product-img">
                        <img src={`/${product.path}`} alt={product.name} className="img" />
                    </div>
                    <div className="product-desc">
                        <div className="product-name">{product.name}</div>
                        <div className="product-price">{new Intl.NumberFormat("vi-VN", {
                                                                            style: "currency",
                                                                            currency: "VND",
                                                                            }).format(product.price)}
                        </div>
                       
                            {/* <button onClick={handleClickPlus(product.productId)}>+</button> */}
                            <input value={product.quantity}
                                    onChange={(e) => handleChangeQuantity(product.productId, e.target.value)}
                                    className="quantity"
                                    id="quantity"/>
                            {/* <button >-</button> */}
                        
                    </div>
                </div>
                )
        }
        <div className="payment">
            <span className="total">{`Tổng : ${new Intl.NumberFormat("vi-VN", {
                                                                    style: "currency",
                                                                    currency: "VND",
                                                                    }).format(total)}`}</span>
            <button className="btn-payment" onClick={() => setVisible(true)}>Mua hàng</button>
      </div>
    </div>
    </div>
     );
}

export default Cart;