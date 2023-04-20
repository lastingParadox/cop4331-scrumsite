import React, { useState, useEffect, Component } from "react";
import "./Login.css";
import Switch from "react-switch";

import useWindowSize from "../windowSize";

export default function Login() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [color, setColor] = useState("white");
  const [checked, setChecked] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const size = useWindowSize();

  useEffect (() => {
      fetch("localhost:3000/api/authentication/login", {
        method: "POST",
        headers: {
            'Content-type': "application/json"
        },
        body: JSON.stringify([username,password])
      })
      .then(res => res.json())
      .then(data => console.log(data))
    }, [])


  function toggleColor() {
    if (color === "white") {
      setColor("black");
    } else {
      setColor("white");
    }
  }

  const switchColor = (nextChecked) => {
    setChecked(nextChecked);
    toggleColor();
  };

  useEffect(() => {
    document.body.style.backgroundColor = color;
  }, [color]);

  const login = (
    <div>
      <form className="login">
        <h1 className={color === "white" ? "login-light" : "login-dark"}>
          Login
        </h1>
        <label
          className={color === "white" ? "text-light" : "text-dark"}
          for="username"
        >
          <b>Username</b>
        </label>
        <input
          className={
            color === "white" ? "login-boxes-light" : "login-boxes-dark"
          }
          type="text"
          placeholder="Enter Username"
          name="username"
          maxlength="110"
          required
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <label
          className={color === "white" ? "text-light" : "text-dark"}
          for="password"
        >
          <b>Password</b>
        </label>
        <input
          className={
            color === "white" ? "login-boxes-light" : "login-boxes-dark"
          }
          type="password"
          placeholder="Enter Password"
          name="password"
          maxlength="110"
          required
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button className="login-button" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );

  const register = (
    <div>
      <form className="login">
        <h1 className={color === "white" ? "login-light" : "login-dark"}>
          register
        </h1>
        <label
          className={color === "white" ? "text-light" : "text-dark"}
          for="username"
        >
          <b>Email</b>
        </label>
        <input
          className={
            color === "white" ? "login-boxes-light" : "login-boxes-dark"
          }
          type="text"
          placeholder="Enter Email"
          maxlength="110"
          required
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <label
          className={color === "white" ? "text-light" : "text-dark"}
          for="username"
        >
          <b>First Name</b>
        </label>
        <input
          className={
            color === "white" ? "login-boxes-light" : "login-boxes-dark"
          }
          type="text"
          placeholder="Enter First Name"
          maxlength="110"
          required
          onChange={(e) => setFirstName(e.target.value)}
        ></input>
        <label
          className={color === "white" ? "text-light" : "text-dark"}
          for="username"
        >
          <b>Last Name</b>
        </label>
        <input
          className={
            color === "white" ? "login-boxes-light" : "login-boxes-dark"
          }
          type="text"
          placeholder="Enter Username"
          maxlength="110"
          required
          onChange={(e) => setLastName(e.target.value)}
        ></input>
        <label
          className={color === "white" ? "text-light" : "text-dark"}
          for="password"
        >
          <b>Password</b>
        </label>
        <input
          className={
            color === "white" ? "login-boxes-light" : "login-boxes-dark"
          }
          type="password"
          placeholder="Enter Password"
          maxlength="110"
          required
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <label
          className={color === "white" ? "text-light" : "text-dark"}
          for="password"
        >
          <b>Confirm Password</b>
        </label>
        <input
          className={
            color === "white" ? "login-boxes-light" : "login-boxes-dark"
          }
          type="password"
          placeholder="Enter Password Again"
          maxlength="110"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        ></input>
        <button className="login-button" type="submit">
          Register
        </button>
      </form>
    </div>
  );

  const switchBox = (
    <>
      {" "}
      <label>
        <span className={color === "white" ? "text-light" : "text-dark"}>
          {" "}
          Dark Mode
        </span>
        <Switch
          checked={checked}
          onChange={switchColor}
          onColor="#121212"
          onHandleColor="#a6a6a6"
          handleDiameter={30}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={20}
          width={48}
          className="react-switch"
          id="material-switch"
        />
      </label>
    </>
  );

  return (
    <>
      {size.width > 1040 ? (
        <>
          <div className="login-container">
            <div
              className={`fill-box-${color === "white" ? "light" : "dark"} ${
                signIn ? "" : "right"
              }`}
            >
              <label className={color === "white" ? "text-light" : "text-dark"}>
                {signIn
                  ? "Click here if you already have an account"
                  : "Click here to make a new account"}
              </label>
              <button
                className="switch-button"
                onClick={() => setSignIn(!signIn)}
              >
                {signIn ? "Login" : "Register"}
              </button>
            </div>
            {login}
            {register}
          </div>
        </>
      ) : (
        <div className="login-container">
          {!signIn ? <>{login}</> : <>{register}</>}
          <div className="center">
            <label className={color === "white" ? "text-light" : "text-dark"}>
              {signIn ? "Change to Sign in" : "Change to Register"}
            </label>
            <Switch
              checked={signIn}
              onChange={() => {
                setSignIn(!signIn);
              }}
              onColor="#248CFD"
              onHandleColor="#4fa3fc"
              handleDiameter={30}
              uncheckedIcon={false}
              checkedIcon={false}
              height={20}
              width={48}
              className="react-switch"
              id="material-switch"
            />
          </div>
        </div>
      )}

      <div className="footer">{switchBox}</div>
    </>
  );
}
