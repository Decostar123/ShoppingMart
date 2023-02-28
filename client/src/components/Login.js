import React, { useState } from "react";
import { BsWindowSidebar } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./signup.css";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import Header from "./LoginHeader";
const Login = () => {
  const [passwd, showPasswd] = useState(false);
  const [detail, setDetail] = useState({ mail: "", password: "" });
  const navigate = useNavigate();
  async function submit(event) {
    event.preventDefault();
    const { mail, password } = detail;

    // const res = await fetch("/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //   },
    //   body: JSON.stringify({ mail, password }),
    // });

    const result = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ mail, password }),
    });

    const data = await result.json();
    console.log("received data ");

    // console.log("1111111---" + data.status);
    console.log("222222---", data);
    if (data.key === 0 || !data) {
      // window.alert("no account ");
      toast("User does not exist");
    } else {
      navigate("/home", { state: { direct: false } });
    }
  }
  return (
    <div>
      <Header />
      <div className="signupContainer">
        <ToastContainer />;
        <div className="signup-box">
          <h1>Login</h1>
          {/* <h4>It's free and only takes minute </h4> */}
          <form onSubmit={(event) => submit(event)}>
            <label>Email</label>
            <input
              type="email"
              placeholder=""
              name="email"
              onChange={(e) => setDetail({ ...detail, mail: e.target.value })}
              required
            />
            <label>Password</label>
            {/* <span> */}
            <div
              style={{
                border: "1px solid grey",
                borderRadius: "6px",
              }}
            >
              <input
                style={{ width: "90%", border: "none" }}
                type={passwd ? "text" : "password"}
                placeholder=""
                name="password"
                onChange={(e) =>
                  setDetail({ ...detail, password: e.target.value })
                }
                required
              />
              <span
                style={{
                  cursor: "pointer",
                  display: "inline-block",
                  height: "100%",
                  width: "10%",
                }}
              >
                {passwd ? (
                  <BsFillEyeFill
                    onClick={() => showPasswd((ele) => !ele)}
                  ></BsFillEyeFill>
                ) : (
                  <BsFillEyeSlashFill
                    onClick={() => showPasswd((ele) => !ele)}
                  ></BsFillEyeSlashFill>
                )}
              </span>
            </div>

            <input type="submit" value="Submit" />
            {/* <Link to="/home"> */}
            <input
              type="button"
              onClick={() => navigate("/home", { state: { direct: true } })}
              value="Login With Test Credentials"
            />
          </form>
          <p>
            Don't have an account? <Link to="/signup">SignUp Here </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
