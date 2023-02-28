// import { CarouselItem, Dropdown } from "react-bootstrap";
import React from "react";
import {
  Badge,
  Nav,
  Dropdown,
  Navbar,
  Container,
  FormControl,
  alignRight,
  alignLeft,
  Button,
} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

import { BsFillCartFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { filterContent, setStatus } from "../store/contentSlice";
import { remove, filter } from "../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
// import pic from "./cartImage.png";
import "./LoginHeaderStyles.css";
// import { Image } from "react-native";

// Navbar Brand is like a container or division
// inside that I am attaching links
export default function LoginHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  console.log(" the cart is", cart);

  return (
    // "#343a40"
    // <div className="topNavbar">
    //   <div style={{ height: 80, backgroundColor: "red" }}></div>;
    // </div>
    <div
      className="topContainer"
      style={{
        height: 80,
        backgroundColor: "#343a40",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div
        className="AA"
        style={{
          color: "white",
          display: "flex",
          margin: "auto",
          marginLeft: "45px",
        }}
      >
        <div style={{ margin: "auto", marginRight: "35px" }}>
          <img
            height="40px"
            width="40px"
            src="https://www.dolistore.com/3610-large_default/Consumption.jpg"
            style={{
              cursor: "pointer",

              borderRadius: "50%",
              marginTop: "5px",
            }}
          />
          <h4
            style={{
              color: "white",
              width: "80px",
              cursor: "pointer",
              textAlign: "left",
              margin: "auto",
              // marginLeft: "0",
            }}
          >
            EMart
          </h4>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <h4
            style={{ color: "white", cursor: "pointer" }}
            onClick={() => navigate("/home", { state: { direct: true } })}
          >
            {/* <Link to="/home">Home</Link> */}
            Home
          </h4>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Navbar.Text className="search">
          {/* input tag just like html  */}
          <FormControl
            style={{ width: 500 }}
            placeholder="Search a product"
            className="m-auto"
            onChange={(e) =>
              // productDispatch({
              //   type: "FILTER_BY_SEARCH",
              //   payload: e.target.value,
              // })
              {
                console.log(e.target.value);
                dispatch(
                  filterContent({
                    task: "FILTER_BY_SEARCH",
                    searchKey: e.target.value,
                  })
                );

                dispatch(filter(e.target.value));
                return;
              }
            }
          />
        </Navbar.Text>
      </div>

      <div
        className="BB"
        style={{
          color: "white",
          display: "flex",
          margin: "auto",
          marginRight: "45px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "auto",
            marginRight: "35px",
          }}
        >
          <h4
            onClick={() => navigate("/")}
            style={{ color: "white", width: "80px", cursor: "pointer" }}
          >
            Logout
          </h4>
        </div>
        <div style={{ display: "flex" }}>
          <Dropdown drop="down-centered">
            {/* this is the text inside drodown mneu  */}
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {/* Dropdown Button */}

              <BsFillCartFill color="white" fontSize="25px" />
              <Badge bg="none">{cart.length}</Badge>
            </Dropdown.Toggle>

            <Dropdown.Menu
              style={{
                width: "fit-content",

                margin: "auto ",
                right: "0",
              }}
            >
              {cart.length > 0 ? (
                <>
                  {cart.map((ele) => {
                    return (
                      <span className="cartItem" key={ele.id}>
                        <img
                          src={ele.image}
                          className="cartItemImg"
                          alt={ele.title}
                        />
                        <div className="cartItemDetail">
                          <span>{ele.title}</span>
                          <span>₹{ele.price}</span>
                        </div>
                        <AiFillDelete
                          fontSize="18px"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            dispatch(remove(ele.id));

                            return;
                          }}
                        ></AiFillDelete>
                      </span>
                    );
                  })}
                  <Link to="/cart">
                    <Button
                      style={{
                        width: "95%",
                        // margin: "0 10px",
                        // marginRight: "10px",
                        // margin: "0 auto ",
                        marginLeft: "5px",
                      }}
                    >
                      Go To Cart
                    </Button>
                  </Link>
                </>
              ) : (
                <span
                  style={{
                    border: "1px outset",
                    padding: "6px",
                  }}
                >
                  Cart is empty!!
                </span>
              )}
            </Dropdown.Menu>

            {/* these are the options inside drop down menu  on clickig */}
            {/* i think when the cart is not empty i will render the page of carts  */}
          </Dropdown>
        </div>
      </div>
      <Dropdown.Menu></Dropdown.Menu>
    </div>
  );
}
