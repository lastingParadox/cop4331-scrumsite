import React, { Component } from "react";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

import Dashboard from "./pages/Dashboard.js";

import Home from "./pages/Home";
import Login from "./pages/Login";

class App extends Component {
    state = {
        data: null,
    };

    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/home/*" index element={<Home />} />
                    <Route path="/dashboard" index element={<Dashboard />} />
                    <Route path="/login" index element={<Login />} />
                </Routes>
            </BrowserRouter>
        );
    }
}

export default App;
