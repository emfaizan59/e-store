import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import { Container, Grid , Image , Input , Button, Segment , Dropdown , Loader , Icon } from 'semantic-ui-react'
import "./HeaderNav.css"
import firebase from '../../firebase'

const token = localStorage.getItem("loginUserToken")

export default class HeaderNav extends Component {
   
   state = {
    searchProd : '', 
    displayName : '' , 
     displayImg : '' ,
       loggedIn : false , 
       load : true ,
    cartCount : 0
   }

   logOut = ()=> {
    localStorage.removeItem("loginUserToken")
    window.location.reload()
   }


   profile = () => {
     return <Redirect to="/profile" />
   }

   onChangeSearch = e => {
      this.setState({[e.target.name] : e.target.value})
   }


   searchForItem = () => {
     localStorage.setItem("searchProd" , this.state.searchProd)
     console.log("Click")
    window.location.href = "/"
   }
   componentDidMount = () => {
     if(token !== null)
     {

      firebase.database().ref("users/"+token).on('value', (snapshot) => {
        const userObj = snapshot.val();
      //  console.log(userObj.cart)
        
       this.setState({displayName : userObj.firstname , displayImg : userObj.profileDP , load: false , loggedIn : true })
     

       firebase.database().ref("users/"+token+"/cart").on('value', (snapshot) => {

        var count = snapshot.numChildren()

        this.setState({cartCount : count})
        

       })


      })

     
     }
     else 
     {
       this.setState({load: false , loggedIn : false})
     }

   }

    render() {
      
      // console.log(token)
        return (
           <Container fluid className="headerMain" >
            <Grid>
         <Grid.Column width={3}  verticalAlign="middle" >
       <Link to="/">  <Image src='/images/e-store.png' style={{height : '120px' , width : '120px'}} circular floated="right" /></Link>

         </Grid.Column>





         <Grid.Column width={7} verticalAlign="middle">
        <form onSubmit={this.searchForItem} target="/">
         <Input fluid  icon='search' placeholder='Search...' name="searchProd" value={this.state.searchProd} onChange = {this.onChangeSearch} />
         
         </form>
         </Grid.Column>
         <Grid.Column width={2} verticalAlign="middle">
       
         <Link to="/cart">     <div className="divCart">
        {this.state.cartCount !== 0 ?<p className="cartNum">{this.state.cartCount}</p> : null }
          <Icon link  name='opencart' size="large" circular inverted color="red" />
          </div>
</Link>
          
         </Grid.Column>







         <Grid.Column width={4} verticalAlign="middle">
         {this.state.load ? 
        <div>
            <Loader active />
        </div>
:
    <div className="account">
      {this.state.loggedIn ? 
 <div style={{display : 'flex'}} >
    <h4>Welcome {this.state.displayName}</h4> 
 

    <Image className="avatarImg" src={ this.state.displayImg || '/images/elliot.jpg'} avatar />

  <Dropdown text='' >
    <Dropdown.Menu>
     <Dropdown.Item  link><Link to="/profile/myprofile" className="dropdownItem"  > Profile </Link></Dropdown.Item>
     <Dropdown.Item  link><Link to="/profile/wishlist" className="dropdownItem"  > Wishlist </Link></Dropdown.Item>
     <Dropdown.Item text='Logout'   link onClick={this.logOut}  />  
 
    </Dropdown.Menu>
  </Dropdown>
        </div>
         :
        <div className="guestPanel">
            <a href="/login">Login</a>
          <a href="/register">Register</a>
            </div>
}
    </div>
}
         </Grid.Column>
                
            </Grid>
           </Container>
        )
    }
}
