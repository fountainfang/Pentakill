
import React, { Component } from 'react'
import Signupform from './signupform'
import Navbar from '../../pages/Front-Page/Navbar'
import FlashMesageList from '../../component/Flash/FlashMesageList'

export default class signup extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <FlashMesageList />

        <div className='row'>
          <div className='col-md-3'></div>
          <div className='col-md-6'>
            <Signupform />
          </div>
          <div className='col-md-3'></div>
        </div>
      </div>
    )
  }
}
