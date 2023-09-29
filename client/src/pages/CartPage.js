import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import {toast} from "react-hot-toast";
import "../styles/CartStyles.css";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [my, setMy] = useState([]);
  var products = [];

  const getAllProducts = async () => {
    try {
      // console.log("app product function")
      // cart  must be array but here it is a object
      // console.log("cart is from cartpage " , cart);
      for (let i = 0; i < cart[0]?.products?.length; i++) {
        let id = cart[0]?.products[i]?.productid;
        let pro = [];
        const product = await axios.get(`/api/v1/product/product-id/${id}`);
        // console.log("product ",product.data);
        const isExisting = products.findIndex((item) => item.productid === id);
        if (isExisting < 0) {
          // if (cart[0].products[isExisting].quantity == 1) {
          //   const pro = await cart[0].products.remove({ productid: pid });
          //   // console.log(pro);
          //   cart[0].total -= p.price;
          // } else {
          //   cart[0].products[isExisting].quantity -= 1;
          //   cart[0].total -= p.price;
          // }
          pro.push(product.data.product);
          products.push(pro);
          // setMy((prev) => [...prev, pro]);
        } else {
          // closenotif(id);
          // setMy((prev) => [...prev]);
        }
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
    totalPrice();
    // window.location.reload();
    //setMy(...products);
  }, [cart]);


  //total price
  const totalPrice = () => {
    try {
      let total = cart[0]?.total;
      // let total = cart.total;
      // cart?.map((item) => {
      //   total = total + item.price;
      // });
      return total?.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //detele item
  const removeCartItem = async (pid) => {
    try {
      const { data, cart } = await axios.post(
        `/api/v1/cart/update-cart/${auth.user._id}/${pid}`
      );
      // console.log("Data  is " ,data , "Cart is" , data.cart);

      if (data.success === true) {
        setMy((prev) => [...prev]);

        setCart(data.cart); ///main line
        // closenotif(pid);
        // getAllProducts();
      } else {
        toast.error("Invalid");
      }
      // navigate("/cart")
      //window.location.reload();
      // let myCart = [...cart];
      // let index = myCart.findIndex((item) => item._id === pid);
      // myCart.splice(index, 1);
      // setCart(myCart);
      // localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };
  const removeWholeCartItem = async (pid) => {
    try {
      const { data, cart } = await axios.post(
        `/api/v1/cart/delete-cart/${auth.user._id}/${pid}`
      );
      // console.log("Data  is " ,data , "Cart is" , data.cart);
      // setCart(data.cart);
      // window.location.reload();
      if (data.success === true) {
        setMy((prev) => [...prev]);

        setCart(data.cart); ///main line
        // closenotif(pid);
        // getAllProducts();
      } else {
        toast.error("Invalid");
      }
    } catch (error) {
      console.log(error);
    }
  };
  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart, 
      });
      setLoading(false);
      // localStorage.removeItem("cart");
      await axios.post(`/api/v1/cart/clear-cart/${auth.user._id}`);
      // setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Layout>
      {/* wrapping everything with auth so if user is not login he will not be shown cart page */}
      {auth?.user ? (
        <div className=" cart-page">
          <div className="row">
            <div className="col-md-12">
              <h2 className="text-center p-2 mb-1">
                {!auth?.user
                  ? "Hello Guest"
                  : `Hello  ${auth?.token && auth?.user?.name}`}
                <p className="text-center fs-4">
                  {cart?.length
                    ? `You Have ${
                        cart[0]?.products?.length
                      } items in your cart ${
                        auth?.token ? "" : "please login to checkout !"
                      }`
                    : " Your Cart Is Empty"}
                </p>
              </h2>
              <hr />
            </div>
          </div>
          <div className="container ">
            <div className="row ">
              <div className="col-md-7 p-0 m-0">
                {my?.map((p, idx) => (
                  <div className="row flex-row border p-2 m-2" key={p[0].name}>
                    <div className="col-md-4">
                      <img
                        src={`/api/v1/product/product-photo/${p[0]._id}`}
                        className="card-img-top"
                        alt={p[0].name}
                        // we can change this to fix the size issue of product in cartpage
                        // width="100%"
                        // height={"100%"}
                      />
                    </div>
                    <div className="col-md-4">
                      {/* <h4>{p.name}</h4>
                      <h5>Price : Rs {p.price}</h5> */}
                      <p>{p[0].name}</p>
                      {/* <p>{p[0].description.substring(0, 30)}</p> */}
                      <p>Price : {p[0].price}</p>
                      <p>Quantity : {cart[0]?.products[idx]?.quantity}</p>

                      <button
                    className="btn btn-primary "
                    onClick={() => removeCartItem(p[0]._id)}
                  >
                    Remove
                  </button>
                  <button
                    className="btn btn-danger cart-remove-btn "
                    onClick={() => removeWholeCartItem(p[0]._id)}
                  >
                    Remove All
                  </button>
                    </div>
                    <div className="col-md-4 cart-remove-btn">
                      
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-md-5 border mt-2 py-3 cart-summary ">
                <h2>Cart Summary</h2>
                <p>Total | Checkout | Payment</p>
                <hr />
                <h4>Total : {totalPrice()} </h4>
                {auth?.user?.address ? (
                  <>
                    <div className="mb-3">
                      <h4>Current Address</h4>
                      <h5>{auth?.user?.address}</h5>
                      <button
                        className="btn btn-outline-dark border-none"
                        onClick={() => navigate("/dashboard/user/profile")}
                      >
                        Update Address
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="mb-3">
                    {auth?.token ? (
                      <button
                        className="btn btn-outline-warning"
                        onClick={() => navigate("/dashboard/user/profile")}
                      >
                        Update Address
                      </button>
                    ) : (
                      <button
                        className="btn btn-outline-warning"
                        onClick={() =>
                          navigate("/login", {
                            state: "/cart",
                          })
                        }
                      >
                        Plase Login to checkout
                      </button>
                    )}
                  </div>
                )}
                <div className="mt-2">
                  {!clientToken  ? (
                    ""
                  ) : (
                    <>
                      <DropIn
                        options={{
                          authorization: clientToken,
                          paypal: {
                            flow: "vault",
                          },
                        }}
                        onInstance={(instance) => setInstance(instance)}
                      />

                      <button
                        className="btn btn-success py-2 px-5"
                        onClick={handlePayment}
                        disabled={loading || !instance || !auth?.user?.address}
                      >
                        {loading ? "Processing ...." : "Make Payment"}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mb-3 p-0 mt-5 ">
          <h2 className="text-center p-2 mb-1">Hello Guest</h2>
          <button
            className="btn btn-outline-warning "
            onClick={() =>
              navigate("/login", {
                state: "/cart",
              })
            }
          >
            Plase Login to checkout
          </button>
        </div>
      )}
    </Layout>
  );
};

export default CartPage;
