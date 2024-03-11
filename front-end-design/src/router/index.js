import React, { Component } from 'react';

import Signup from '../pages/Signup/signup';

import Signin from '../pages/Signin/signin';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FlashMessage from '../component/Flash/FlashMessage';

export default class index extends Component {
    render() {
        return (
            <Router>

                <FlashMessage />
                <Routes>
                    


                </Routes>
                {/* 放在Routes之外 */}

            </Router>
        );
    }
}
