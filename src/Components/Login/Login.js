import React, { Component } from 'react'
import firebase from '../../firebase'
import {Link, Redirect} from 'react-router-dom'

import { Button,  Form, Segment , Message, Divider } from 'semantic-ui-react'
import HeaderNav from '../HeaderNav/HeaderNav'
import LoginComponent from '../LoginComponent/LoginComponent'
let errorMsg = []
 class Login extends Component {


    render() {

        return (
         <div>
             <HeaderNav />
            <Divider />
            <LoginComponent source = "main" />
            </div>
        )
    }
}


export default Login