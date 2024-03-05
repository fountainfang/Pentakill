


import React, { Component } from 'react'
import Signupform from './signupform'

export default class signup extends Component {
  render() {
    return (
      <div className='row'>
        <div className='col-md-3'></div>
        <div className='col-md-6'>
          <Signupform />
        </div>
        <div className='col-md-3'></div>
      </div>
    )
  }
}
