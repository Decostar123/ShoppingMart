import React from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Rating from "./Rating";
import "./styles.css";

import { add, remove } from "../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";

function SingleProduct({ prod, direct }) {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  // const { state, dispatch, productState, productDispatch } = CartState();
  // const { products, cart } = state;
  // console.log(111, cart);
  // const { byStock } = productState;

  return (
    <div className="products">
      <Card>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card.Img
            style={{
              height: "150px",
              width: "150px",
            }}
            variant="top"
            src={prod.image}
            alt={prod.name}
          />
        </div>

        <Card.Body style={{ height: "210px" }}>
          <Card.Title>{prod.title}</Card.Title>
          {/* <Card.Text>{prod.description}</Card.Text> */}
          <Card.Subtitle style={{ paddingBottom: 10 }}>
            <span>₹{prod.price}</span>
            {prod.rating.count > 250 ? (
              <div>Fast Delivery</div>
            ) : (
              <div>5 days Deleivery </div>
            )}
            <Rating rating={Math.ceil(prod.rating.rate)} />
          </Card.Subtitle>
        </Card.Body>
      </Card>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {cart.some((p) => p.id === prod.id) ? (
          <Button
            style={{ width: "85%" }}
            variant="danger"
            onClick={() => dispatch(remove(prod.id))}
          >
            Remove from Cart
          </Button>
        ) : (
          <Button
            style={{ width: "85%" }}
            onClick={() => {
              if (direct) {
                return navigate("/");
              }
              return dispatch(add(prod));
            }}
            disabled={prod.rating.count <= 100}
          >
            Add To Cart
          </Button>
        )}
      </div>
    </div>
  );
}
export default SingleProduct;
