import React, { Component } from 'react'
import Signinform from './signinform'

export default class signin extends Component {
    render() {
        return (
            (
                <div className='row'>
                    <div className='col-md-3'></div>
                    <div className='col-md-6'>
                        <Signinform />
                    </div>
                    <div className='col-md-3'></div>
                </div>
            )
        )
    }
}
