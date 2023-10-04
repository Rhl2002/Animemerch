import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";
import Button from "react-bootstrap/Button";
import { FiShoppingBag } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";

const ProductDetails = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (pid) => {
    try {
      if(auth?.user ===null || auth?.user ==="null"){
        toast.success("Please Login");
        return;
      }
      const {data, Cart }  = await axios.post(`/api/v1/cart/create-cart/${auth?.user._id}/${pid}`);  
      // console.log("Data  is " ,data , "Cart is" , data.Cart);
      if(data.success === true){
        // console.log("cart before added ",data.Cart);
        // setCart((prev) => [data.cart]);
        // so basically what was happening is that we were getting object as a response from backend but on frontend we consider cart as a array ,so thats why we were getting error of undefined properties 
        // the fix used is i created a array pushed the object and then updated the cart state and now everything works perfectly .
        let my=[]
        my.push(data.Cart);
        // setCart(data.Cart); ///main line'
        setCart(my); ///main line'
        // console.log("cart after added ",cart,"my is ",my);
        toast.success("Item Added to cart");
      }
      else{
        toast.error("Invalid");
      }
      // window.location.reload();
      
      // setCart([...cart, p]);
      // localStorage.setItem(
      //   "cart",
      //   JSON.stringify([...cart, p])
      // );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="my-5">
        <hr className="my-5" />
      </div>
      <div className="row container product-details w-75 d-flex justify-content-center mx-auto">
        <div className="col-md-6">
          <img
            src={`https://backend-glia.onrender.com/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
          />
        </div>
        <div className="col-md-6 product-details-info ">
          <h1> {product.name}</h1>
          {/* <hr /> */}
          <h4 className="price-color">
            {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "INR",
            })}
          </h4>
          <h6>{product.description}</h6>
          <h6>{product?.category?.name}</h6>
          {/* <Button variant="danger" className="fw-bold"><FiShoppingBag className="me-2"/>ADD TO BAG</Button> */}
          <button
            className="btn btn-danger fw-bold"
            onClick={() => addToCart(product?._id)}
          >
            <FiShoppingBag className="me-2" />
            ADD TO CART
          </button>
        </div>
      </div>
      <hr />
      <div className=" my-5 row container similar-products d-flex mx-auto justify-content-center ">
        <h4 className=" text-center">You Might Also Like</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" key={p._id}>
              <img
                src={`https://backend-glia.onrender.com/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p.name.substring(0, 20)}</h5>
                  <h5 className="card-title card-price">
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </h5>
                </div>
                <p className="card-text ">
                  {p.description.substring(0, 30)}...
                </p>
                <div className="card-name-price">
                  <button
                    className="btn btn-info ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                    className="btn btn-dark ms-1"
                    onClick={() => addToCart(p._id)}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
