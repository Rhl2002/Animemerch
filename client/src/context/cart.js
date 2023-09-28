import { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./auth";

// update this page for the cart functionality u want
const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useState([]);

  // bring all the cart items from database here 
  const getAllProducts = async () => {
    try {
      // cart  must be array but here it is a object
      const {data, Cart }  = await axios.get(`/api/v1/cart/get-cart/${auth?.user._id}`);  
      // console.log("Data  is " ,data , "Cart is" , data.Cart);
      setCart(data.Cart);
    } catch (error) {     
      console.log(error);
    }
  };

  useEffect( () => {
    // if it does not work uncomment this
    /*let existingCartItem = localStorage.getItem("cart");
    if (existingCartItem) setCart(JSON.parse(existingCartItem));*/
    // const { Cart } = axios.get(`/api/v1/cart/get-cart/${auth.user._id}`);  
    //   setCart(JSON.parse(Cart));
    getAllProducts();
    
  }, [auth]);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };