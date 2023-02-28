import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import "typeface-roboto";
import "./signup.css";
import Header from "./LoginHeader";

function Signup(event) {
  const [passwd, showPasswd] = useState(false);
  const navigate = useNavigate();
  const [detail, setDetail] = useState({ mail: "", password: "" });

  async function submit(event) {
    console.log(" welcomt to submit ");
    event.preventDefault();
    const { mail, password } = detail;
    const res = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ mail, password }),
    });
    console.log(" data send  ");

    const data = await res.json();
    console.log("data came ");
    // .json() returns promise where JSON.PARSE() converts json string to valuanle object
    if (data.key === 1 || !data) {
      toast("User Alreaady Exist!");

      // window.alert("registeration fail ");
      // console.log("window.alert was tried ");
    } else {
      // window.alert("successful", data.arr);
      console.log("111111111111111111 ");
      console.log("33333");
      console.log(data);
      // history.push("/home");
      navigate("/home", { state: { direct: false } });
    }
    console.log("222222222 ");
  }
  return (
    <>
      <Header />
      {/* <div className="signupContainer"> */}
      <ToastContainer />;
      <div className="signup-box">
        <h1>SignUp</h1>
        <h4>It's free and only takes minute </h4>
        <form method="POST" onSubmit={(event) => submit(event)}>
          <label>First Name</label>
          <input type="text" placeholder="Decostar" />
          <label>Last Name</label>
          <input type="text" placeholder="Sharma" />
          <label>Email</label>
          <input
            type="email"
            placeholder=""
            onChange={(e) =>
              setDetail((prev) => ({ ...prev, mail: e.target.value }))
            }
            required
          />
          <label>Password</label>
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
          {/* <button>Click Me</button> */}
        </form>
        <p>
          Already have an account ?<a href="/">Login here</a>
        </p>
      </div>
      {/* </div> */}
    </>

    // <div>
    //   <form onSubmit={(event) => submit(event)} method="POST">
    //     <input
    //       placeholder="Enter you name"
    //       name="inpt"
    //       onChange={(event) => submitForm(event)}
    //     />
    //   </form>
    // </div>
  );
}

export default Signup;
