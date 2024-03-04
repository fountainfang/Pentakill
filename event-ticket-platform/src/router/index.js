import React, { Component } from 'react';
import Home from '../pages/App';
import Signup from '../pages/Signup/signup';
import Header from '../components/Header';
import Signin from '../pages/Signin/signin';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default class index extends Component {
    render() {
        return (
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signin" element={<Signin />} />
                </Routes>
                {/* 放在Routes之外 */}

            </Router>
        );
    }
}
