import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
import "../styles/Homepage.css";
import Carousel from 'react-bootstrap/Carousel';
import c1 from '../../src/assets/c01.jpg';
import c2 from '../../src/assets/c021.jpg';
import c3 from '../../src/assets/c031.jpg';
import c4 from '../../src/assets/c04.jpg';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import anime1 from '../../src/assets/anime1.webp'
import oversized1 from '../../src/assets/oversized2.jpg'
import men from '../../src/assets/men.png'
import women from '../../src/assets/women.png'
import hoodies from '../../src/assets/hoodie2.jpg'
import FreeShipping from '../../src/assets/footerdesktop-strip.jpg'
import shopmw from '../../src/assets/shopmw.png'
import naruto from '../../src/assets/carosel1.webp'
import { NavLink} from "react-router-dom";
import Slider01 from "../components/Slider/Slider01";
import Slider02 from "../components/Slider/Slider02";


const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };


  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"Best offers "}>
      {/* banner image */}
      <Carousel
        autoPlay={true}
        autoPlaySpeed={1000}
      >
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={c1}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={c2}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={c3}
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={c4}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>


      {/* Categories  */}
      <Container className='my-32'>
        <h1 className='text-center text-5xl fw-bold my-5'>Trending Categories</h1>
        <Row className='w-75 d-flex align-items-center justify-content-center mx-auto gap-5 '>
          <Col className=" p-3 border"><img src={anime1} alt='anime' className="w-100" /><h1 className='text-center fs-3 fw-bold mt-2'>Anime T-Shirt</h1></Col>
          <Col className=" p-3 border"><img src={oversized1} alt='oversized' className="w-100 " /><h1 className='text-center fs-3 fw-bold mt-2'>Oversized T-Shirt</h1></Col>
          <Col className=" p-3 border"><img src={hoodies} alt='oversized' className="w-100" /><h1 className='text-center fs-3 fw-bold mt-2'>Hoodies</h1></Col>
        </Row>
      </Container>


      <div className='d-flex align-items-center justify-content-center mx-auto my-5'>
        <img src={shopmw} alt='shop'className="d-flex w-100 my-5"/>
     </div>

   
     <Slider01 />

     <div className='d-flex align-items-center justify-content-center mx-auto my-5'>
        <img src={naruto} alt='shop'className="d-flex w-100  my-5"/>
     </div>
     
     <div className='d-flex align-items-center justify-content-center mx-auto my-5'>
        <img src={FreeShipping} alt='shop'className="d-flex w-100"/>
     </div>
       
      <Slider02 />  

    </Layout>


  );
};

export default HomePage;
