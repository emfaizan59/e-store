import React, { Fragment } from  'react'
import { Container , Icon, Button, Divider } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import "./LeftNavBar.css"
class LeftNavBar extends React.Component {
  state = {
    prodLink : false , 
    orderLink : false , 
    dashLink : false , 
    userLink : false
  }
  componentDidMount = () => {
    if(window.location.pathname.includes('admin/products'))
    {   
        this.setState({prodLink : true , orderLink : false , dashLink : false , userLink : false})
    }
    else if(window.location.pathname.includes('admin/orders')){
        this.setState({prodLink : false , orderLink : true , dashLink : false , userLink : false})

    }
    else  if(window.location.pathname.includes('admin/users')){
        this.setState({prodLink : false , orderLink : false , dashLink : false , userLink : true})

    } 
    else
    {
        this.setState({prodLink : false , orderLink : false , dashLink : true , userLink : false})
        
    }
  }
    render(){
    return(
        <Fragment>
        <Container fluid  className="leftBar" textAlign="center">
            {/* <Link className="linkButtons" to="Home"><Icon name="dashboard" inverted /> Dashboard</Link>
            <Link className="linkButtons" to={`/products`}><Icon name="dashboard" inverted /> Products</Link> */}
            
           <Link to="/admin" onClick={() => { this.setState({prodLink : false , orderLink : false , dashLink : true , userLink : false})}} >
               <div  className={this.state.dashLink ? "linkButtons activeSection" : "linkButtons" } >
               <Icon name="dashboard" className="ico activeIco" /> Dashboard
               </div>   
           </Link>

            <h4 className="dividerTag">Warehouse</h4>
            <Divider />
           <Link to={`/admin/products`} onClick={() => { this.setState({prodLink : true , orderLink : false , dashLink : false , userLink : false})}} >
               <div className={this.state.prodLink ? "linkButtons activeSection" : "linkButtons" }  >
               <Icon name="shopping bag"  className="ico" /> Products
               </div>   
           </Link>
           <Link to={`/admin/orders`} onClick={() => { this.setState({prodLink : false , orderLink : true , dashLink : false , userLink : false})}} >
               <div className={this.state.orderLink ? "linkButtons activeSection" : "linkButtons" } >
               <Icon name="dollar sign"  className="ico" /> Orders
               </div>   
           </Link>

           <h4 className="dividerTag">Users</h4>
            <Divider />

            <Link to={`/admin/users`} onClick={() => { this.setState({prodLink : false , orderLink : false , dashLink :false , userLink : true})}} >
               <div className="linkButtons"  >
               <Icon name="users"  className="ico" /> Users Profile
               </div>   
           </Link>
        </Container>
        </Fragment>
    )
}
}

export default LeftNavBar