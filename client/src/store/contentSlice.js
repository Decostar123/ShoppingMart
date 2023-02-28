const { createSlice } = require("@reduxjs/toolkit");

export const STATUSES = {
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
  DATA_AVAILABLE: false,
};

export const FILTERS_TYPE = {
  SORT_L_T_H: false,
  SORT_H_T_L: false,
  FILTER_BY_STOCK: false,
  FILTER_BY_DELIVERY: false,
  FILTER_BY_RATING: 0,
  FILTER_BY_SEARCH: "",
};

const contentSlice = createSlice({
  name: "content",
  initialState: {
    data: [],
    status: STATUSES.LOADING,
    cdata: [],
  },
  reducers: {
    addContent(state, action) {
      state.cdata = action.payload;
      state.cdata = state.cdata.map((ele, ind) => {
        if (ind === 13) {
          ele.title = ele.title.substring(0, 50);
        }
        return ele;
      });
      state.data = state.cdata;
      console.log(" came indie settinf react ");
    },
    filterContent(state, action) {
      switch (action.payload.task) {
        case "SORT_L_T_H":
          FILTERS_TYPE.SORT_L_T_H = true;
          FILTERS_TYPE.SORT_H_T_L = false;
          console.log(" inside ascending fasion ", FILTERS_TYPE.SORT_L_T_H);

          // state.data.sort((a, b) => a.price - b.price);
          break;
        case "SORT_H_T_L":
          FILTERS_TYPE.SORT_L_T_H = false;
          FILTERS_TYPE.SORT_H_T_L = true;
          // state.data.sort((a, b) => b.price - a.price);
          // return;
          break;
        case "FILTER_BY_STOCK":
          FILTERS_TYPE.FILTER_BY_STOCK = !FILTERS_TYPE.FILTER_BY_STOCK;
          // state.data.filter((ele) => (ele.rating.count > 100 ? true : false));
          // state.data = state.cdata;
          // return;
          break;
        case "FILTER_BY_DELIVERY":
          FILTERS_TYPE.FILTER_BY_DELIVERY = !FILTERS_TYPE.FILTER_BY_DELIVERY;
          // state.data = state.data.filter((ele) => ele.rating.count > 250);
          // return;
          break;
        case "FILTER_BY_RATING":
          // FILTERS_TYPE.FILTER_BY_RATING = !FILTERS_TYPE.FILTER_BY_RATING ;
          FILTERS_TYPE.FILTER_BY_RATING = action.payload.ratings;

          // console.log(" sorting with help of stars ");
          // state.data = state.data.filter(
          //   (ele) => Math.ceil(ele.rating.rate) >= action.payload.ratings
          // );
          // return state;
          break;
        case "FILTER_BY_SEARCH":
          FILTERS_TYPE.FILTER_BY_SEARCH = action.payload.searchKey;
          // console.log(" in fliter by search ", action);
          // const temp = state.data.filter((ele) =>
          //   ele.title
          //     .toLowerCase()
          //     .includes(action.payload.searchKey.toLowerCase())
          // );
          // state.data = temp;
          // return state;
          break;
        case "CLEAR_FILTERS":
          state.data = state.cdata;
          FILTERS_TYPE.SORT_L_T_H = false;
          FILTERS_TYPE.SORT_H_T_L = false;
          FILTERS_TYPE.FILTER_BY_STOCK = false;
          FILTERS_TYPE.FILTER_BY_DELIVERY = false;
          FILTERS_TYPE.FILTER_BY_RATING = 0;

          return state;
        // break;
        default:
          return state;
      }
      let temp = state.cdata;
      if (FILTERS_TYPE.SORT_L_T_H) {
        temp.sort((a, b) => a.price - b.price);
      }
      if (FILTERS_TYPE.SORT_H_T_L) {
        temp.sort((a, b) => b.price - a.price);
      }
      if (FILTERS_TYPE.FILTER_BY_DELIVERY) {
        temp = temp.filter((ele) => ele.rating.count > 250);
      }
      if (FILTERS_TYPE.FILTER_BY_STOCK) {
        temp = temp.filter((ele) => (ele.rating.count > 100 ? true : false));
      }
      temp = temp.filter((ele) =>
        ele.title
          .toLowerCase()
          .includes(FILTERS_TYPE.FILTER_BY_SEARCH.toLowerCase())
      );
      temp = temp.filter(
        (ele) => Math.ceil(ele.rating.rate) >= FILTERS_TYPE.FILTER_BY_RATING
      );
      state.data = temp;

      return state;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});
export default contentSlice.reducer;
export const { addContent, filterContent, setStatus } = contentSlice.actions;
export function fetchProducts() {
  return async function fetchProdutsThunk(dispatch, getState) {
    try {
      dispatch(setStatus(STATUSES.LOADING));
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      dispatch(addContent(data));
      console.log(" dispatch got clickked ");
      dispatch(setStatus(STATUSES.IDLE));
      STATUSES.DATA_AVAILABLE = true;
    } catch (err) {
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}
