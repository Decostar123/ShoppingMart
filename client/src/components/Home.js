import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SingleProduct from "./SingleProduct.js";
import "./styles.css";
import Filters from "./Filters.js";
import Header from "./Header";
import { BsLinkedin, BsGithub, BsTwitter } from "react-icons/bs";
import { useLocation } from "react-router-dom";

import { fetchProducts, STATUSES } from "../store/contentSlice";

import { useDispatch, useSelector } from "react-redux";

// import {
//   addContent,
//   fetchProducts,
//   setStatus,
//   STATUSES,
// } from "../store/contentSlice";
// import { STATUSES } from "../store/contentSlice";
// import { fetch}

export const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (!STATUSES.DATA_AVAILABLE) {
      dispatch(fetchProducts());
    }

    // console.log(" it is useEffet ");
  }, []);
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products);
  // const cart = useSelector((state) => state.cart);
  // const { data , cdata , status } = product  ;

  // const [products, setProducts] = useState([]);
  // useEffect(() => {
  //   // setLoad(true) ;
  //   fetch("https://fakestoreapi.com/products")
  //     .then((res) => res.json())
  //     .then((res) => {
  //       // console.log(res);
  //       // return

  //       // setProducts(res);
  //       dispatch(addContent(res));
  //     });
  // }, []);

  // const product = useSelector((state) => state.products);

  // let { data } = product;
  const { data, cdata, status } = product;
  console.log(" the status is ", status);
  console.log(" the product is ", product);
  console.log(" the data is ", data);

  if (status === STATUSES.LOADING) {
    return <h1>Making Ready Your EMART.....</h1>;
  }

  return (
    <div className="outerContainer">
      <Header />
      <div className="home">
        {/* FILTER IS THE SIDE ONE FILTER COMPONENT  */}
        <Filters />
        <div className="productContainer">
          {data.map((prod) => {
            return (
              <SingleProduct
                prod={prod}
                key={prod.id}
                direct={location.state.direct}
              />
            );
          })}
        </div>
      </div>
      <div
        className="footer"
        style={{
          textAlign: "center",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        <h5 style={{ marginBottom: "20px" }}>Made with ❤️ by Decostar </h5>
        <div style={{ marginBottom: "20px" }}>
          <ul
            style={{
              display: "flex",
              listStyle: "none",
              justifyContent: "center",
            }}
          >
            <Link to="https://www.linkedin.com/in/decostarsharma/">
              <li>
                <BsLinkedin
                  size={25}
                  style={{ marginRight: "10px", marginLeft: "10px" }}
                ></BsLinkedin>
              </li>
            </Link>
            <Link to="https://github.com/Decostar123">
              <BsGithub
                size={25}
                style={{ marginRight: "10px", marginLeft: "10px" }}
              ></BsGithub>
            </Link>
            <Link to="https://twitter.com/DecostarSharma">
              <BsTwitter
                size={25}
                style={{ marginRight: "10px", marginLeft: "10px" }}
              ></BsTwitter>
            </Link>
            c
          </ul>
        </div>
        <h5>© 2023 ShoppingKart</h5>
      </div>
    </div>
  );
};
