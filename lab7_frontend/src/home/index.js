import { Logo, Cart } from "../assets";
import "../home/Home.scss";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {   message  } from "antd";


const Home = () => {
    const [products, setProducts] = useState([]);
    const [productChosen, setProductChosen] = useState([]);
    const [customer, setCustomer] = useState();
    const [totalPages, setTotalPages] = useState([]);
    const [pageChosen, setPageChosen] = useState(0);

    let navigate = useNavigate();
    let location = useLocation();
    
    const handleClickAddToCart = (product) => {
        let proExist = productChosen.find(pro => pro.productId === product.productId)
        console.log("pro:"+product.productId)
        if(!proExist){
            setProductChosen([...productChosen, {...product, quantity : 1}])
        }
        else{
            proExist.quantity += 1
            setProductChosen([...productChosen])
        }
        message.success("Đã thêm vào giỏ hàng");
        console.log("list: "+ productChosen);
    }

    const handleClickCart = () => {
        console.log("click");
        navigate("/cart", {state:{productChosen: productChosen, customer: customer}})
    }

    useEffect(() => {
        let getApiProducts = async() => {
            let dataTotalPage = await axios.get("http://localhost:8080/product/get-total-pages");
            setTotalPages(Array.from({length: dataTotalPage.data},(_,index) => index + 1));
            let datas = await axios.get(`http://localhost:8080/product/info-product/${pageChosen}`);
            setProducts(datas.data);
            setCustomer(location.state);
        }
        getApiProducts()
    }, [JSON.stringify(products), pageChosen])
    return (
        <div>
            <div className="homePage">
                <div className="header">
                    <div className="header-left"><Logo />    CỬA HÀNG ĐIỆN TỬ</div>
                    <div className="header-right" onClick={handleClickCart}>
                        <Cart/>
                        <span>{productChosen.length}</span>
                    </div>
                </div>
                <div className="content">
                    { 
                        products.map(product => 
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
                                    <button className="addToCart" onClick={()=>handleClickAddToCart(product)}>Add To Cart</button>                         
                                </div>
                            </div>
                            )
                    }
                    
                </div>
                <div className="footer">
                    <div className="page-number">
                        {totalPages.map(page => (
                            <button key={page} className="btn-page"
                                onClick={() => setPageChosen(page-1)}
                                style={{backgroundColor: pageChosen === page-1 ? "#f78708":"white",
                                        color: pageChosen === page-1 ? "while":"black"}}>{page}</button>
                        ))}
                    </div>
                    <span>Le Thi Kim Ngan - 20041421</span>
                </div>
            </div>
                       
        </div>
    );
}

export default Home;