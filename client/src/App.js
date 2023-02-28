import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Cart } from "./components/Cart.js";
// import Header from "./components/Header";
import { Home } from "./components/Home.js";
import Login from "./components/Login.js";
import SignUp from "./components/Signup.js";
// import { Cart } from "./components/Home";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}

      <Routes>
        {/* n path means that this is the current path . This the App one  */}
        {/*  the thing in the home is simpy a function call ... nothing more or less
        // like imported and called  */}
        <Route path="/" element={<Login />}></Route>
        {/* <Route path="/login"  element={</>} */}
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
