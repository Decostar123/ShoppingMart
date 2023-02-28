import { Form, Button, label } from "react-bootstrap";
import Rating from "./Rating.js";
import { useState } from "react";
import React from "react";

import {
  addContent,
  filterContent,
  setStatus,
  FILTERS_TYPE,
} from "../store/contentSlice";
import { add, remove, change, empty, filter } from "../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Filters() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);

  // const dispatch = useDispatch();

  const [rate, setRate] = useState(0);
  // const { productState, productDispatch } = CartState();
  // let a = false,
  //   b = false;
  // //  note the sort paramter is not present intially but added when the ascending/descending was called
  // const { byStock, byFastDelivery, byRating, sort, searchQuery } = productState;
  // console.log(byStock, byFastDelivery, byRating, sort, searchQuery);
  return (
    <div className="filters">
      <span className="title">FilterProducts</span>
      <span>
        <Form.Check
          inline
          label="Ascending"
          name="group1"
          type="radio"
          id={`inline-1`}
          // onClick={() => {
          //   b = false;
          //   a = true;
          //   dispatch();
          // }}
          onChange={() => dispatch(filterContent({ task: "SORT_L_T_H" }))}
          checked={FILTERS_TYPE.SORT_L_T_H}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Descending"
          name="group1"
          type="radio"
          id={`inline-2`}
          onChange={() => dispatch(filterContent({ task: "SORT_H_T_L" }))}
          // checked={sort === "highToLow" ? true : false}
          checked={FILTERS_TYPE.SORT_H_T_L}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Exclude Out of Stock"
          name="group1"
          type="checkbox"
          id={`inline-3`}
          onChange={() => dispatch(filterContent({ task: "FILTER_BY_STOCK" }))}
          checked={FILTERS_TYPE.FILTER_BY_STOCK}
          // checked={byStock}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Fast Deleivery only"
          name="group1"
          type="checkbox"
          id={`inline-3`}
          onChange={() =>
            dispatch(filterContent({ task: "FILTER_BY_DELIVERY" }))
          }
          checked={FILTERS_TYPE.FILTER_BY_DELIVERY}
          // checked={byFastDelivery}
        />
      </span>
      <span>
        <label style={{ paddingRight: 10 }}>Rating: </label>
        <Rating
          rating={rate}
          Click={(i) => {
            setRate(i + 1);
            dispatch(
              filterContent({ task: "FILTER_BY_RATING", ratings: i + 1 })
            );
          }}
          style={{ cursor: "pointer" }}
          // checked={byStock}
        />
      </span>
      <Button
        variant="light"
        onClick={() => {
          setRate(0);
          dispatch(filterContent({ task: "CLEAR_FILTERS" }));
        }}
      >
        Clear Filters
      </Button>
    </div>
  );
}
