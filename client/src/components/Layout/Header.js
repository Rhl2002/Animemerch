import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const categories = useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  const countFunc = () => {
    if (cart?.length === 0) {
      return 0;
    } else {
      if (cart !== undefined && cart[0] !== undefined) {
        let c = cart[0]?.products?.length;
        // console.log("cart is ", cart, "count is ", c);
        return c;
      } else {
        return 0;
      }
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg  border-bottom border-bottom-dark fixed-top bg-black">
        <div className="container-fluid bg-black">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" style={{ filter: "invert(100%)" }} />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand text-white fs-2 mx-5">
              Anime <span style={{color: "#F8EA54"}}>Merch</span>
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-5 ">
              <div className="d-flex justify-content-center mx-auto">
              </div>
              <li className="nav-item">
                <NavLink to="/" className="nav-link text-white">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle text-white"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {!auth?.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link text-white">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link text-white">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown text">
                    <NavLink
                      className="nav-link dropdown-toggle text-white"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none" }}
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"
                            }`}
                          className="dropdown-item text-black"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item black"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
             
              <li className="nav-item ">
                <NavLink to="/about" className="nav-link text-white">
                    About Us
                </NavLink>
              </li>
              <li className="nav-item ">
                <NavLink to="/contact" className="nav-link text-white">
                    Contact Us
                </NavLink>
              </li>
              <li className="nav-item ">
                <NavLink to="/cart" className="nav-link">
                  <Badge count={countFunc()} showZero  className="text-white">
                    Cart
                  </Badge>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* <div className="my-5 bg-black ">
      <Header2 />
      </div> */}
    </>
  );
};

export default Header;
