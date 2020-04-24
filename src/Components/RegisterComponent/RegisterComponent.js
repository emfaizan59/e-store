import React, { Component } from 'react'
import { Button,  Form, Segment , Message } from 'semantic-ui-react'
import firebase from '../../firebase'
import md5 from 'md5';
import {Link} from 'react-router-dom'
let errorMsg = []

export default class RegisterComponent extends Component {
    state = {
        fname : '',
        fnameEr : false,
        lname : '' ,
        lnameEr : false,
        username : '',
        usernameEr : false,
        email : '',
        emailEr : false,
        pass : '',
        passEr : false,
        cpass : '',
        cpassEr : false,
        gender : 'male',
        checkbox : false , 
        checkboxEr : false ,
        loading : false,
        dataSet : firebase.database().ref('users')

    }
    


    valueChange = (e) => {
        this.setState({[e.target.name] : e.target.value})
        console.log(e.target.value)
    }
    
    onSubmitReg = () => {
        this.setState({loading : true})
          
        if(this.isValid())
        {
        // console.log("Success")
    
        firebase.auth().createUserWithEmailAndPassword(this.state.email , this.state.pass)
        .then( createdUser => {
            let user = firebase.auth().currentUser
           user.updateProfile({
               displayName : this.state.username , 
               photoURL : `https://gravatar.com/avatar/${md5(user.email)}?d=identicon`
           })
           .then(() => {
            this.state.dataSet.child(user.uid).set({
                firstname : this.state.fname ,
                lastname : this.state.lname ,
                username : user.displayName ,
                email : this.state.email ,
                gender : this.state.gender ,
                profileDP : user.photoURL
            })
    
            this.setState({username:'', pass:'', email:'', cpass:'', fname : '' , lname : ''  , checkbox  : false, loading: false}) 
    
        console.log(user)
       
     this.setState({ loading:false})
    
    
    })
        .catch(e => {
            errorMsg.push(e.message)
            this.setState({ loading: false})
        })
        
        
    
    })
      .catch(err => {
    
          errorMsg.push(err.message)
          this.setState({ loading: false})
    
      })
    
    
        }
        else{
            console.log(errorMsg)
        // console.log("Error")
        this.setState({ loading: false})
        
        
        }
    
    }
    
    
    isValid = () => {
        
        const {fname , lname , username , email , pass , cpass , checkbox } = this.state
        this.setState({fnameEr : false , lnameEr : false , usernameEr : false , emailEr : false , passEr : false , cpassEr:false , checkboxEr: false})
        errorMsg = []
        if(fname !== "" && lname !== "" && username !== "" &&  username.length >= 6  && username.length <=10 &&
        email !== "" &&   
        pass !== "" && cpass !=="" && pass.length >= 6 && pass === cpass && checkbox )
        {
     
            errorMsg = []
                return true
        }
        else{
            if(fname == "")
            {
                errorMsg.push("First Name should not be empty.\n")
                this.setState({ fnameEr : true})
            }   
            if(lname == "")
            {
                errorMsg.push("Last Name should not be empty.\n")
    
                this.setState({ lnameEr : true})
    
            }   
            if(email == "")
            {
                errorMsg.push("Email must be filled.\n")
    
                this.setState({emailEr : true})
            }
            
            if(username == "" || username.length > 10 || username.length < 6)
            {
            errorMsg.push("Username is required and should be of 6-10 letters.\n")
    
                this.setState({ usernameEr : true})
    
            }
            if(pass == "" || pass.length < 6)
            {
                errorMsg.push("Password must be filled and of greater than 6 letter/digits.\n")
    
                this.setState({ passEr : true})
    
            }
            if(cpass == "" || cpass !==pass)
            {
                errorMsg.push("Confirm Password must be filled and matched with above field.\n")
    
                this.setState({ cpassEr : true})
    
            }
            if(!checkbox)
            {
                errorMsg.push("Accept the Terms and Conditions.\n")
    
                this.setState({checkboxEr : true})
            }
            return false
        }
    
    }

    render() {
        const {errorEmpty} = this.state

        return (
        
   <div style={{maxWidth : '700px' , margin : '0px auto'}}>
   <Segment raised>  
               <h1>Welcome to E-Store!</h1>
      <Form size="large" onSubmit = {this.onSubmitReg}>
   
            <Form.Group widths="equal">
                
      <Form.Input  className={this.state.fnameEr ? "error" : ""}
          label='First name'
           placeholder='First name'
           value={this.state.fname}
           name="fname"
           onChange = {this.valueChange}
   
       />
       <Form.Input  className={this.state.lnameEr ? "error" : ""}
       //   error='Please enter your last name'
         label='Last name'
         placeholder='Last name'
         name="lname"
         value={this.state.lname}
   
         onChange = {this.valueChange}
   
   />

   
</Form.Group>

    <Form.Input  className={this.state.usernameEr ? "error" : ""}
   //      error={{ content: 'Please enter your first name', pointing: 'below' }}
         label='username'
         placeholder='username'
         name="username"
         value={this.state.username}
   
         onChange = {this.valueChange}
   
      />
       <Form.Input  className={this.state.emailEr ? "error" : ""}
   //      error={{ content: 'Please enter your first name', pointing: 'below' }}
         label='Email Address'
         placeholder='Email Address'
         type="email"
         name="email"
         value={this.state.email}
   
         onChange = {this.valueChange}
   
       />

       <Form.Group widths="equal">
          <Form.Input  className={this.state.passEr ? "error" : ""}
   //      error={{ content: 'Please enter your first name', pointing: 'below' }}
         label='Password'
         placeholder='*********'
         type="password"
         name="pass"
         value={this.state.pass}
   
         onChange = {this.valueChange}
   
      />
   
   <Form.Input  className={this.state.cpassEr ? "error" : ""}
   //      error={{ content: 'Please enter your first name', pointing: 'below' }}
         label='Confirm Password'
         placeholder='*********'
         type="password"
         name="cpass"
         value={this.state.cpass}
   
         onChange = {this.valueChange}
   
       />
       </Form.Group>
    <Form.Field label='Gender' control='select'     name="gender"  onChange = {this.valueChange}
     >
           <option value='male'>Male</option>
           <option value='female'>Female</option>
         </Form.Field>
       <Form.Checkbox className={this.state.checkboxEr ? "error" : ""}
       name = "checkbox"
       onChange = {() => {this.setState({checkbox : !this.state.checkbox})}}
         label='I agree to the Terms and Conditions'
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
   
   
       <Button type='submit' disabled={this.state.loading}  className={this.state.loading ? 'loading' : ''} color="twitter">Submit</Button>
     </Form>
     <Message >Already a User ? <Link to="/login">Login</Link></Message>
     </Segment>
               </div>
          
        )
    }
}
