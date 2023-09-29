import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import cartModel from "../models/cartModel.js";
import fs from "fs";
import slugify from "slugify";
import mongoose from "mongoose";

export const createCartController = async (req, res) => {
  try {
    const { id, pid } = req.params;
    // { userid: id }
    let cart = await cartModel.find({ userid: id });
    // console.log("first time cart is ",cart);
    // let newCart = JSON.stringify(cart);
    // let pro =JSON.parse(newCart);
    // cart =pro;

    /**************VERY IMPORTANT BUG TACKLED  TO CONVERT MOGODB DATA TO OBJECT FIRST STRINGIFY IT AND THEN PARSE IT  */
    // let newCart = JSON.stringify(cart);
    // let pro =JSON.parse(newCart);
    // //console.log(pro[0]);
    // pro[0].products[0].quantity =10;
    // cart =pro;

    /************************* ABOVE CODE IS AN EXAMPLE OF IT */

    //res.status(200).send({cart,newCart,pro});

    // let index = cart.products.findIndex((item) => item._id === pid);
    //let cartObject = cart.find({productid: pid});
    //let cartObject = JSON.parse(cart);
    //res.status(200).json({cart});
    var quantity = 0,
      total = 0;
    // quantity=cart.products.quantity;
    let p = await productModel.findById(req.params.pid);
    p = JSON.parse(JSON.stringify(p));
    // let updatedCart = await cartModel.find({ userid: id });
    // console.log(updatedCart[0]);

    // if it gives undefined length error then use [0] after cart ,,need to find proper solution for this
    if (cart.length != 0) {
      if (cart[0].products.length == 0) {
        cart[0].products.push({ productid: pid, quantity: 1 });
        cart[0].total = p.price;
      } else {
        const isExisting = cart[0]?.products.findIndex(
          (item) => item.productid == pid
        );
        // console.log(isExisting);
        if (isExisting < 0) {
          cart[0]?.products.push({ productid: pid, quantity: 1 });
          p = await productModel.findById(req.params.pid);
          cart[0].total = cart[0]?.total + p.price;
        } else {
          cart[0].products[isExisting].quantity =
            cart[0]?.products[isExisting].quantity + 1;
          cart[0].total = cart[0]?.total + p.price;
        }
      }
      // console.log("updated");
      let Cart = await cart[0].save();

      res.status(200).send({
        success: true,
        message: "Product updated Successfully In Cart",
        Cart,
      });
    } 
    else {
      const products = {
        productid: pid,
        quantity: 1,
      };

      let p = await productModel.findById(req.params.pid);
      let total = p.price;
      let newCart = new cartModel({
        userid: id,
        products,
        total,
      });

      let Cart = await newCart.save();
      res.status(200).send({
        success: true,
        message: "Cart Created Successfully ",
        Cart,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error while adding products in cart ",
    });
  }
};

export const getCartController = async (req, res) => {
  try {
    const { id, pid } = req.params;
    // { userid: id }
    let Cart = await cartModel.find({ userid: id });
    res.status(200).send({
      success: true,
      message: "User Cart Fetched Successfully",
      Cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error while getting products in cart ",
    });
  }
};

export const updateCartController = async (req, res) => {
  try {
    const { id, pid } = req.params;
    let cart = await cartModel.find({ userid: id });
    let p = await productModel.findById(req.params.pid);

    const isExisting = cart[0].products.findIndex(
      (item) => item.productid == pid
    );
    if (isExisting >= 0) {
      if (cart[0].products[isExisting].quantity == 1) {
        const pro = await cart[0].products.remove({ productid: pid });
        // console.log(pro);
        cart[0].total -= p.price;
      } else {
        cart[0].products[isExisting].quantity -= 1;
        cart[0].total -= p.price;
      }
      
      if(cart[0].total<0){
        cart[0].total=0;
      }
      await cart[0].save();
      cart = await cartModel.find({ userid: id });
      res.status(200).send({
        success: true,
        message: "Product Deleted Successfully",
        cart,
      });
    } else {
      if(cart[0].total<0){
        cart[0].total=0;
      }
      await cart[0].save();
      res.status(200).send({
        success: false,
        message: "Product Not Present In Cart ",
        cart,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error while deleting products in cart ",
    });
  }
};

export const deleteCartController = async (req, res) => {
  try {
    const { id, pid } = req.params;
    let cart = await cartModel.find({ userid: id });
    let p = await productModel.findById(req.params.pid);

    const isExisting = cart[0].products.findIndex(
      (item) => item.productid == req.params.pid
    );
    if (isExisting >= 0) {
      if (cart[0].products[isExisting].quantity !== 0) {
        const pro = await cart[0].products.remove({ productid: pid });
        // console.log(pro);
        let t = cart[0].products[isExisting].quantity * p.price;
        // console.log("price ", t);
        cart[0].total -= t;
      } else {
        console.log("How Can You access this");
      }

      await cart[0].save();
      cart = await cartModel.find({ userid: id });
      res.status(200).send({
        success: true,
        message: "Product Deleted Successfully",
        cart,
      });
    } else {
      await cart[0].save();
      res.status(200).send({
        success: false,
        message: "Product Not Present In Cart ",
        cart,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error while deleting whole products in cart ",
    });
  }
};


export const clearCartController = async (req, res) => {
  try {
    const { id } = req.params;
    let cart = await cartModel.find({ userid: id });

    cart[0].products.splice(0,cart[0].products.length)

      await cart[0].save();
      cart = await cartModel.find({ userid: id });
      res.status(200).send({
        success: true,
        message: "Product Deleted Successfully",
        cart,
      });
    } 
   catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error while deleting whole products in cart ",
    });
  }
};
