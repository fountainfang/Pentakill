import React, { Component } from 'react'
import Signinform from './signinform'
import Navbar from '../../pages/Front-Page/Navbar'
import FlashMessage from '../../component/Flash/FlashMessage'

export default class signin extends Component {
    render() {
        return (
            (<div> <Navbar />

                <div className='row'>
                    <div className='col-md-3'></div>
                    <div className='col-md-6'>
                        <Signinform />
                    </div>
                    <div className='col-md-3'></div>
                </div>
            </div>
            )
        )
    }
}
