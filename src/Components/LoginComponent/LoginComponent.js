import React, { Component } from 'react'
import firebase from '../../firebase'
import {Link, Redirect} from 'react-router-dom'

import { Button,  Form, Segment , Message } from 'semantic-ui-react'

let errorMsg = []
export default class LoginComponent extends Component {
   
   
    state = {
        email : '',
        emailEr : false ,
        pass : '',
        passEr : false ,
        loading : false ,
        uID : null 

    }

    
    valueChange = (e) => {
        this.setState({[e.target.name] : e.target.value})
        // console.log(e.target.value)
    }
    onSubmitLogin = () => {
        this.setState({loading : true})
        if(this.isValid())
        {
            firebase.auth().signInWithEmailAndPassword(this.state.email , this.state.pass)
               .then( (signedUser) => {
              this.setState({ uID : signedUser.user.uid  , loading : false })
              errorMsg = []
                console.log("Success")
    
            //   this.props.storedTasks(this.state.uID  ,this.state.email)
    
    
                localStorage.setItem("loginUserToken" , this.state.uID )
                this.setState({ pass:'', email:''})
    
                {this.props.source !== "modal" ? window.history.back() : window.location.reload() }
                
               })
               .catch(err => {
             
                   errorMsg.push(err.message)
                   this.setState({ loading: false})
                this.setState({ pass:'', email:''})
    
               })
        }
        else
        {
        this.setState({loading : false})
    
            console.log("Error")
        }
    }
    
    
    
    
    isValid = () => {
        errorMsg = []
       const {email , pass } = this.state
       this.setState({emailEr : false , passEr : false})
        if(email !== "" && pass !=="")
        {
            errorMsg = []
            return true
        }
        else
        {
            if(email == "")
            {
                errorMsg.push("Email Field must be filled")
                this.setState({emailEr : true})
            }
            if(pass == "")
            {
                errorMsg.push("Password Field must be filled")
                this.setState({passEr : true})
        }
    
        return false
        }
    }
    
    render() {
        return (
                      
   <div style={{maxWidth : '700px' , margin : '0 auto'}}>
   <Segment raised>   
               <h1>Welcome to E-Store!</h1>
      <Form  onSubmit={this.onSubmitLogin}>
   
       <Form.Input className={this.state.emailEr ? "error" : ""}
         label='Email Address'
         placeholder='Email Address'
         type="email"
         value={this.state.email}
         name="email"
         onChange = {this.valueChange}
   
       />
          <Form.Input className={this.state.passEr ? "error" : ""}
         label='Password'
         placeholder='*********'
         type="password"
         value={this.state.pass}
         name="pass"
         onChange = {this.valueChange}
   
      />
   
   {errorMsg.length > 0 ?
   <Message  negative={true} >
       <Message.Header>There was some errors with your submission</Message.Header>
       <Message.List>
       {errorMsg.map((element , i) => (
           <Message.Item>{errorMsg[i]}</Message.Item>
       ))}
       
       </Message.List>
     </Message>
   : null }
   
    <Button disabled={this.state.loading}  className={this.state.loading ? 'loading' : ''} color="instagram" type='submit'>Submit</Button>
    <Message >Not a User ? <Link  to="/register">Register</Link></Message>
    
     </Form>
     </Segment>
               </div>
          
        )
    }
}
