import React, { Component } from 'react';

import {
    BrowserRouter,
    Route,
    Routes,
    Navigate
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import HomePage from './pages/HomePage.js'
import ExamplePage from './pages/HomePage-Example.js'
import WorkspacePage from './pages/WorkspacePage.js';
import Dashboard from './pages/Dashboard.js'

import Home from './pages/Home';
import About from './pages/About';
import Service from './pages/Service';
import Contact from './pages/Contact';
import Login from './components/Login/Login'

class App extends Component {
	state = {
		data: null,
	};

    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/home/*" index element={<Home/>} />
                    <Route path="/dashboard" index element={<Dashboard/>} />
                    <Route path="/example" index element={<ExamplePage/>} />
                    <Route path="/bruh/:id" index element={<WorkspacePage/>} />
                    <Route path= "/login" index element = {<Login/>} />
                </Routes>
            </BrowserRouter>
        )
    }
}

export default App;
