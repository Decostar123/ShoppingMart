// import { CarouselItem, Dropdown } from "react-bootstrap";

//  LOGINHEADER SHOWS UP ON LOGIN PAGE
// LOGIN SHOWS INSIDE SIGN UP PAGE
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
// import pic from "./cartImage.png";
import "./LoginHeaderStyles.css";
// import { Image } from "react-native";

// Navbar Brand is like a container or division
// inside that I am attaching links
export default function LoginHeader() {
  const navigate = useNavigate();

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
        width: "100vw",
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
            Login
          </h4>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {/* Dropdown Button */}

            <BsFillCartFill color="white" fontSize="25px" />
            {/* <Badge bg="none">{cart.length}</Badge> */}
          </Dropdown.Toggle>
        </div>
      </div>
    </div>
  );
}
