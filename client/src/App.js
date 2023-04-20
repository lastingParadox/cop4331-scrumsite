import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import HomePage from './pages/HomePage.js'

class App extends Component {
    state = {
        data: null
    };

    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" index element={<HomePage/>} />
                </Routes>
            </BrowserRouter>
        )
    }
}

export default App;
