import React, { Component } from 'react'
import { Container , Divider , Form, Button , Message} from 'semantic-ui-react'
import firebase from '../../firebase'
let uid = localStorage.getItem("loginUserToken")
let errorMsg = []

export default class MyProfile extends Component {
   state = {
    prevfname : '' ,
    fname : '',
    fnameEr : false,
    prevlname : '',
    lname : '' ,
    lnameEr : false,
    prevgender : '',
    gender : '',
load: true,
   }
   
   valueChange = (e) => {
    this.setState({[e.target.name] : e.target.value})
    console.log(e.target.value)
}
   

onSubmitUpdate = () => {

    this.setState({load : true})
          
    if(this.isValid())
    {
    firebase.database().ref("users/"+uid).update({
        firstname : this.state.fname , 
        lastname : this.state.lname , 
        gender : this.state.gender
    })
    .then(
        this.setState({load:false})
    )
    .catch(err => {
        errorMsg.push(err.message)
        this.setState({ load: false})
    })

}
else
{
    this.setState({ load: false})
    console.log("Error")
}
}

componentDidMount = () => {
        
      firebase.database().ref("users/"+uid).on('value', (snapshot) => {
        const userObj = snapshot.val();
      //  console.log(userObj.cart)
        
       this.setState({fname : userObj.firstname , prevfname : userObj.firstname , lname : userObj.lastname , prevlname : userObj.lastname , gender : userObj.gender , prevgender : userObj.gender , load: false })
     
      })
}


isValid = () => {
        
    const {fname , lname } = this.state
    this.setState({fnameEr : false , lnameEr : false })
    errorMsg = []
    if(fname !== "" && lname !== "" )
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
        return false
    }
}

render() {


    
        return (
            <Container fluid>
                <h3>Update My Profile</h3>

                <Divider />

 <Form size="large" onSubmit = {this.onSubmitUpdate} loading = {this.state.load ? true : false} >
   
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

<Form.Field label='Gender' control='select'   name="gender"  value = {this.state.gender}  onChange = {this.valueChange}>
            <option value='female' >Female</option>
           <option value='male' >Male</option>
         </Form.Field>

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
   
<Button floated="right"  color="orange" type="submit" disabled = {
    this.state.fname === this.state.prevfname && this.state.lname === this.state.prevlname  && this.state.gender === this.state.prevgender ? true : false
}  >Update Profile</Button>

</Form>


            </Container>
        )
    }
}
