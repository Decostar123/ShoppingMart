import React, { useState, useEffect } from "react";
import { ListGroup, Button, Row, Col } from "react-bootstrap";

import Rating from "./Rating.js";
import Form from "react-bootstrap/Form";
import { Image } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

import { add, remove, change, empty } from "../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";

export const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  // const { state, dispatch, productState, productDispatch } = CartState();
  // const { products, cart } = state;
  // let cart1 = cart;
  // console.log("cart", cart);
  const [total, setTotal] = useState(0);

  console.log(cart);
  useEffect(() => {
    const temp = cart.reduce((acc, ele) => {
      return acc + ele.price * ele.qty;
    }, 0);
    console.log(" but the cary is", cart);
    console.log(temp);
    setTotal(temp.toFixed(2));
  }, [cart]);
  return (
    <>
      <Header />
      <div className="home">
        <div className="productContainer">
          <ListGroup>
            {cart.map((ele) => {
              return (
                <ListGroup.Item key={ele.id}>
                  {/* in medium screen it is going to have 2 units of space  */}
                  <Row>
                    <Col md={2}>
                      {/* <img
                    src={ele.image}
                    alt={ele.title}s
                    className="cartItemImg"
                  /> */}
                      <Image
                        src={ele.image}
                        alt={ele.title}
                        fluid
                        style={{ width: "120px", height: "120px" }}
                      />
                    </Col>

                    <Col md={2}>
                      <span>{ele.title}</span>
                    </Col>
                    <Col md={2}>
                      <span>₹{ele.price}</span>
                    </Col>
                    <Col md={2}>
                      <Rating rating={ele.rating.rate} />
                    </Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={ele.qty}
                        onChange={(e) => {
                          console.log(e.target.value);
                          return dispatch(
                            change({ id: ele.id, qty: Number(e.target.value) })
                          );
                        }}
                      >
                        {[...Array(5)].map((x, y) => (
                          <option>{y + 1}</option>
                        ))}
                        {/* {[1, 2, 3, 4, 5, 6, 7, 8]} */}
                      </Form.Control>
                      {/* {console.log(ele.qty + "@@@")} */}
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => dispatch(remove(ele.id))}
                      >
                        <AiFillDelete fontSize="20px"></AiFillDelete>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </div>
        <div className="filters">
          <span className="title">
            Subtotal({cart.length}) item{cart.length === 1 ? "" : "s"}
          </span>
          <span style={{ fontWeight: 700, fontSize: 20 }}>Total: ₹{total}</span>
          {/* <Link to="/home"> */}
          <Button
            type="button"
            disabled={cart.length === 0}
            onClick={() => {
              dispatch(empty());
              navigate("/home", { state: { direct: false } });
            }}
          >
            Proceed To Checkout
          </Button>
          {/* </Link> */}
        </div>
      </div>
    </>
  );
};
