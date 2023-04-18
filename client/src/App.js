import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.js'
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
    state = {
        data: null
    };

    componentDidMount() {
        this.callBackendAPI()
        .then(res => this.setState({ data: res.express }))
        .catch(err => console.log(err));
    }
    // fetching the GET route from the Express server which matches the GET route from server.js
    callBackendAPI = async () => {
        const response = await fetch('/api');
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message) 
        }
        return body;
    };

    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" index element={<HomePage/>} />
                </Routes>
            </BrowserRouter>
        );
    }
}

export default App;
