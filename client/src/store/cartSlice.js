const { createSlice } = require("@reduxjs/toolkit");

const initialState = [];
let org = [];
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state, action) {
      state.push({ ...action.payload, qty: 1 });
      org.push({ ...action.payload, qty: 1 });
    },
    remove(state, action) {
      console.log(" inside delete ");
      state = state.filter((ele) => ele.id !== action.payload);
      org = org.filter((ele) => ele.id !== action.payload);
      return state;
    },
    change(state, action) {
      state = state.map((ele) => {
        if (ele.id === action.payload.id) {
          // return { ...ele, qty: action.payload.qty };
          ele.qty = action.payload.qty;
        }
        return ele;
      });
      org = org.map((ele) => {
        if (ele.id === action.payload.id) {
          return { ...ele, qty: action.payload.qty };
        }
        return ele;
      });
    },
    empty(state, action) {
      org = [];
      return [];
    },
    filter(state, action) {
      state = org.filter((ele) =>
        ele.title.toLowerCase().includes(action.payload.toLowerCase())
      );
      return state;
    },
  },
});
export default cartSlice.reducer;
export const { add, remove, change, empty, filter } = cartSlice.actions;
