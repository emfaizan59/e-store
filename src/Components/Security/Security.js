import React, { Component } from 'react'
import { Container , Form , Divider , Button, Message } from 'semantic-ui-react'
import firebase from '../../firebase'

let errorMsg = []

export default class Security extends Component {
 state = {
    newpass  : '' ,
    newpassEr : false,
    loading : false,
    success : ''
 }
 

 valueChange = (e) => {
    this.setState({[e.target.name] : e.target.value})
    console.log(e.target.value)

}




onSubmitUpdate = () => {

    this.setState({loading : true})
    if(this.isValid())
    {
        var user = firebase.auth().currentUser;
        user.updatePassword(this.state.newpass)
        .then(
           this.setState({newpass : '' , loading: false , success : "Successfully update your Password" })
          )
          .catch(error =>  {
            errorMsg.push(error.message)
            this.setState({loading: false})
    
          });

}
else{
    this.setState({loading : false})

}
}
isValid = () => {
    errorMsg = []
   const {newpass } = this.state
   this.setState({newpassEr : false})
    if(newpass !=="")
    {
        errorMsg = []
        return true
    }
    else
    {
       
            errorMsg.push("Password Field must be filled")
            this.setState({newpassEr : true})
    

    return false
    }
}


render() {
        return (
            <Container fluid>

<h3>Update My Security</h3>

<Divider />
                
    <Form onSubmit= {this.onSubmitUpdate} loading = {this.state.loading ? true : false} >

    <Form.Group widths="equal">
    
    {/* <Form.Input  className={this.state.oldpassEr ? "error" : ""}
       //      error={{ content: 'Please enter your first name', pointing: 'below' }}
             label='Old Password'
             placeholder='*********'
             type="password"
             name="oldpass"
             value={this.state.oldpass}
       
             onChange = {this.valueChange}
       
           /> */}
              <Form.Input  className={this.state.newpassEr ? "error" : ""}
       //      error={{ content: 'Please enter your first name', pointing: 'below' }}
             label='New Password'
             placeholder='*********'
             type="password"
             name="newpass"
             value={this.state.newpass}
       
             onChange = {this.valueChange}
       
          />
       
    
           </Form.Group>
           
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

{this.state.success !== '' ?
   <Message  positive={true} >
       <Message.Header>{this.state.success}</Message.Header>
     </Message>
   : null }

<Button floated="right"  color="orange" type="submit" >Update Password</Button>

    </Form>
            </Container>
        )
    }
}
