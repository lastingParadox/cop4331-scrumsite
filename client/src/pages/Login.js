import React, { useState, useEffect } from "react";
import "./Login.css";
import Switch from "react-switch";
import { Navigate, Route, useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';
import useWindowSize from "../components/home/WindowSize";

export default function Login() {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [usernameValid, setUsernameValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [firstNameValid, setFirstNameValid] = useState(true);
    const [lastNameValid, setLastNameValid] = useState(true);
    const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);

    const [passwordMatch, setPasswordMatch] = useState(true);
    const [emailMatch,setEmailMatch] = useState(true);
    const [userExists, setUserExists] = useState("");

    const [color, setColor] = useState("white");
    const [checked, setChecked] = useState(false);
    const [signIn, setSignIn] = useState(false);
    const size = useWindowSize();

    const loginData = { email: username, password: password };
    const registerData = {
        email: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
    };

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setUsernameValid(username);
        setPasswordValid(password);

        if (username && password) {
            fetch("/api/authentication/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            })
                .then(async (response) => {
                    if (response.ok) {
                        setEmailMatch(true);
                        setPasswordMatch(true);
                        const json = await response.json();
                        sessionStorage.setItem("token", json.token);
                        navigate("/dashboard");
                    }
                    if (response.status === 404)
                    {
                        setEmailMatch(false);
                        console.log("User not found");
                    }
                    else if (response.status === 401)
                    {
                        setEmailMatch(true);
                        setPasswordMatch(false);
                    }
                    else {
                        setEmailMatch(true);
                        setPasswordMatch(true);
                        return response.json();
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();

        setUsernameValid(username);
        setPasswordValid(password);
        setFirstNameValid(firstName);
        setLastNameValid(lastName);
        setConfirmPasswordValid(confirmPassword === password);
        setUserExists("");
        

        if (username && firstName && lastName && confirmPassword && password === confirmPassword) {
            fetch("/api/authentication/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registerData),
            })
                .then(async (response) => {
                    if (response.ok) {
                        const json = await response.json();
                        sessionStorage.setItem("token", json.token);
                        navigate("/dashboard");
                    }
                    if (response.status === 409)
                    {
                        setUserExists("This Email is already in use");
                    }
                    else if (response.status === 500)
                    {
                        setUserExists("Make sure the email is in the format name@email.com")
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

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
        console.log(JSON.stringify(loginData));
    };

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            navigate('/dashboard');
            return;
        }
        document.body.style.backgroundColor = color;
    }, [color]);

    const login = (
        <div>
            <form className="login">
                <h1 className={color === "white" ? "login-light" : "login-dark"}>Login</h1>
                <div className="login-content-input">
                    <label
                        className={color === "white" ? "text-light" : "text-dark"}
                        htmlFor="username"
                    >
                        <b>Username</b>
                    </label>
                    <input
                        className={color === "white" ? "login-boxes-light" : "login-boxes-dark"}
                        value={username}
                        type="text"
                        placeholder="Enter Username"
                        name="username"
                        maxLength="110"
                        onChange={(e) => setUsername(e.target.value)}
                    ></input>
                    <div className={!usernameValid || !emailMatch ? "line" : ""}></div>
                    <div className={`show-error${!usernameValid || !emailMatch ? "True" : "False"}`}>
                        {emailMatch?"Email must be filled out" : "The Email you entered doesn't exist"}
                    </div>
                    <label
                        className={color === "white" ? "text-light" : "text-dark"}
                        htmlFor="password"
                    >
                        <b>Password</b>
                    </label>
                    <input
                        className={color === "white" ? "login-boxes-light" : "login-boxes-dark"}
                        value={password}
                        type="password"
                        placeholder="Enter Password"
                        name="password"
                        maxLength="110"
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    <div className={!passwordValid || !passwordMatch ? "line" : ""}></div>
                    <div className={`show-error${!passwordValid || !passwordMatch ? "True" : "False"}`}>
                        {passwordMatch ? "Password must be filled out": "The password you entered doesn't match"}
                    </div>
                    <button className="login-button" type="submit" onClick={handleLogin}>
                        Sign in
                    </button>
                </div>
            </form>
        </div>
    );

    const register = (
        <div>
            <form className="login">
                <h1 className={color === "white" ? "login-light" : "login-dark"}>register</h1>
                <div className="login-content-input">
                    <label
                        className={color === "white" ? "text-light" : "text-dark"}
                        htmlFor="username"
                    >
                        <b>Email</b>
                    </label>
                    <input
                        className={color === "white" ? "login-boxes-light" : "login-boxes-dark"}
                        value={username}
                        type="text"
                        placeholder="Enter Email"
                        maxLength="110"
                        onChange={(e) => setUsername(e.target.value)}
                    ></input>
                    <div className={!usernameValid  || userExists? "line" : ""}></div>
                    <div className={`show-error${!usernameValid || userExists ? "True" : "False"}`}>
                        {userExists? userExists:"Email must be filled out"}
                    </div>
                    <label
                        className={color === "white" ? "text-light" : "text-dark"}
                        htmlFor="username"
                    >
                        <b>First Name</b>
                    </label>
                    <input
                        className={color === "white" ? "login-boxes-light" : "login-boxes-dark"}
                        value={firstName}
                        type="text"
                        placeholder="Enter First Name"
                        maxLength="110"
                        onChange={(e) => setFirstName(e.target.value)}
                    ></input>
                    <div className={!firstNameValid ? "line" : ""}></div>
                    <div className={`show-error${!firstNameValid ? "True" : "False"}`}>
                        First Name must be filled out
                    </div>
                    <label
                        className={color === "white" ? "text-light" : "text-dark"}
                        htmlFor="username"
                    >
                        <b>Last Name</b>
                    </label>
                    <input
                        className={color === "white" ? "login-boxes-light" : "login-boxes-dark"}
                        value={lastName}
                        type="text"
                        placeholder="Enter Last Name"
                        maxLength="110"
                        onChange={(e) => setLastName(e.target.value)}
                    ></input>
                    <div className={!lastNameValid ? "line" : ""}></div>
                    <div className={`show-error${!lastNameValid ? "True" : "False"}`}>
                        Last Name must be filled out
                    </div>
                    <label
                        className={color === "white" ? "text-light" : "text-dark"}
                        htmlFor="password"
                    >
                        <b>Password</b>
                    </label>
                    <input
                        className={color === "white" ? "login-boxes-light" : "login-boxes-dark"}
                        value={password}
                        type="password"
                        placeholder="Enter Password"
                        maxLength="110"
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    <div className={!passwordValid ? "line" : ""}></div>
                    <div className={`show-error${!passwordValid ? "True" : "False"}`}>
                        Password must be filled out
                    </div>
                    <label
                        className={color === "white" ? "text-light" : "text-dark"}
                        htmlFor="password"
                    >
                        <b>Confirm Password</b>
                    </label>
                    <input
                        className={color === "white" ? "login-boxes-light" : "login-boxes-dark"}
                        type="password"
                        placeholder="Enter Password Again"
                        maxLength="110"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></input>
                    <div className={!confirmPasswordValid ? "line" : ""}></div>
                    <div className={`show-error${!confirmPasswordValid ? "True" : "False"}`}>
                        Passwords must match
                    </div>
                    <button className="login-button" type="submit" onClick={handleRegister}>
                        Register
                    </button>
                </div>
            </form>
        </div>
    );

    const switchBox = (
        <>
            {" "}
            <label>
                <span className={color === "white" ? "text-light" : "text-dark"}> Dark Mode</span>
                <Switch
                    checked={checked}
                    onChange={switchColor}
                    onColor="#dddddd"
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

    function resetAndSwap() {
        setSignIn(!signIn);
        setUsernameValid(true);
        setPasswordValid(true);
        setFirstNameValid(true);
        setLastNameValid(true);
        setConfirmPasswordValid(true);
    }

    return (
        <>
            <Helmet>
                <title>{signIn ? "Scrum Site - Register" : "Scrum Site - Login"}</title>
            </Helmet>
            {size.width > 1120 ? (
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
                            <button className="switch-button" onClick={() => resetAndSwap()}>
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
                    <div className="small-login-switch">
                        <label className={color === "white" ? "text-light" : "text-dark"}>
                            {signIn ? "Change to Sign in" : "Change to Register"}
                        </label>
                        <Switch
                            checked={signIn}
                            onChange={() => {
                                resetAndSwap();
                            }}
                            onColor="#dddddd"
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
                    </div>
                </div>
            )}
        </>
    );
}
