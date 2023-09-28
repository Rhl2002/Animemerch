import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { useCart } from "../../context/cart";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [my, setMy] = useState([]);
  var products = [];

  const getAllProducts = async () => {
    try {
      // console.log("orders is",orders);
      // cart  must be array but here it is a object
      // console.log("cart is from cartpage " , cart);
      for (let i = 0; i < cart[0]?.products?.length; i++) {
        let id = orders[0]?.products[i]?.productid;
        let pro = [];
        const product = await axios.get(`/api/v1/product/product-id/${id}`);
        // console.log("product ",product.data);
          pro.push(product.data.product);
          products.push(pro);
          // setMy((prev) => [...prev, pro]);
        
        // const closenotif = () => document.getElementById({id}).remove()
        // setMy(...my, pro);
      }
      setMy(products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProducts();
    // window.location.reload();
    //setMy(...products);
  }, [orders]);
  
  // console.log("products is ",products,"my is",my)
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
      // console.log(orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid p-3 m-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders?.map((o, i) => {
              console.log()
              return (
                <div className="border shadow">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Bought</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createdAt).fromNow()}</td>
                        <td>{o?.createdAt.substring(0,10)}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {my.map((p, i) => (
                      console.log(p[0]),
                      <div className="row mb-2 p-3 card flex-row" key={p[0]._id}>
                        <div className="col-md-2">
                          <img
                            src={`/api/v1/product/product-photo/${p[0]._id}`}
                            className="card-img-top"
                            alt={p._id}
                          />
                        </div>
                        <div className="col-md-6">
                          <h4 className="fw-bold">{p[0].name}</h4>
                          {/* <p>{p.description.substring(0, 30)}</p> */}
                          <p className="fw-bold text-danger">Price : {p[0].price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="container">
                    {o?.products?.map((p, i) => (
                      // getAllProducts(p.productid),
                      <div className="row mb-2 p-3 card flex-row" key={p._id}>
                        <div className="col-md-2">
                          <img
                            src={`/api/v1/product/product-photo/${p.productid}`}
                            className="card-img-top"
                            alt={p.productid}
                          />
                        </div>
                        <div className="col-md-6">
                          <h4 className="fw-bold">{p.name}</h4>
                          {/* <p>{p.description.substring(0, 30)}</p> */}
                          <p className="fw-bold text-danger">Price : {p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
