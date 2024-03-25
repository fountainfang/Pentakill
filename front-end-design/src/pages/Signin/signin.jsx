import React, { Component } from 'react'
import Signinform from './signinform'
import Navbar from '../../pages/Front-Page/Navbar'
import FlashMessage from '../../component/Flash/FlashMessage'
import { connect } from "react-redux"
import * as authActions from "../../action/auth"
import { bindActionCreators } from 'redux'

class signin extends Component {
    render() {
        return (
            (<div> <Navbar />

                <div className='row'>
                    <div className='col-md-3'></div>
                    <div className='col-md-6'>
                        <Signinform authActions={this.props.authActions} />
                    </div>
                    <div className='col-md-3'></div>
                </div>
            </div>
            )
        )
    }
}

const mapDispatchToProps = dispatch => {
    return { authActions: bindActionCreators(authActions, dispatch) }
}

export default connect(null, mapDispatchToProps)(signin)