import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import HeaderNav from '../HeaderNav/HeaderNav'
import {Grid, Segment , Divider, Container} from 'semantic-ui-react'
import Wishlist from '../Wishlist/Wishlist'
import MyProfile from '../MyProfile/MyProfile'
import "./UserProfile.css" 
import Security from '../Security/Security'
import firebase from '../../firebase'
let uid = localStorage.getItem("loginUserToken")

export default class UserProfile extends Component {
    state = {
        rightPanel : "" ,
        userName : ''
    }

    componentDidMount = () => {
        this.setState({rightPanel : this.props.match.params.page})
        firebase.database().ref("users/"+uid).on('value', (snapshot) => {
            const userObj = snapshot.val();
          //  console.log(userObj.cart)
            
           this.setState({userName : userObj.firstname})  
    
          })
    }
    render() {
        return (

          <div>
              {uid == null ? window.location.href = "/" :

            <div>
            <HeaderNav />

            <Container>
            <Grid columns="2">
                <Grid.Column width={3}>
                    <h5>Hello, {this.state.userName} </h5>
                    <Divider />
                    
                    <div style={{marginBottom : '10px'}}>
                    <h4 style={{marginBottom:'5px'}}>Manage My Account</h4>
                    
                    <Link to="/profile/myprofile" className={this.props.match.params.page === "myprofile" ? "sidebarLinks activeOption" : "sidebarLinks"}>My Profile</Link> <br/>
                    <Link to="/profile/security" className={this.props.match.params.page === "security" ? "sidebarLinks activeOption" : "sidebarLinks"}>Update Security</Link>
                    </div>
        

                   <Link to="/profile/wishlist" className={this.props.match.params.page !== "myprofile" ? "sidebarLinks activeOption" : "sidebarLinks"}><h4>My Wishlist</h4></Link>
                </Grid.Column>
                <Grid.Column width={13}>
                    <Segment style={{paddingBottom : '50px'}}>
          
                    {this.props.match.params.page === "myprofile" ? 
                    <MyProfile />
                    :
                    null 
                }
     {this.props.match.params.page === "wishlist" ? 
     <Wishlist />   

:
                    null 
                }


{this.props.match.params.page === "security" ? 
     <Security />   

:
                    null 
                }


                    </Segment>
                </Grid.Column>
            </Grid>
</Container>
            </div>
    }
  </div>
        )
    }
}
