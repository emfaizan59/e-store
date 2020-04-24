import React, { Component } from 'react'
import { Button,  Form, Segment , Message , Divider  } from 'semantic-ui-react'
import firebase from '../../firebase'
import md5 from 'md5';
import {Link} from 'react-router-dom'
import HeaderNav from '../HeaderNav/HeaderNav';
import RegisterComponent from '../RegisterComponent/RegisterComponent';

let errorMsg = []
export default class Register extends Component {
  


    render() {
        return (

            <div>
            <HeaderNav />
            
            <Divider />
            <RegisterComponent />
       </div>
        )

}
}
