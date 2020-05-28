import React, { Fragment } from 'react'
import {Route , Switch} from 'react-router-dom'
import Dashboard from '../Dashboard/Dashboard'
import Products from '../Products/Products'
import Orders from '../Orders/Orders'
import { Grid, Container } from 'semantic-ui-react';
import TopMenu from '../TopMenu/TopMenu'
import LeftNavBar from '../LeftNavBar/LeftNavBar'
import Users from '../Users/Users'

const AdminHome = () => {

 if (localStorage.getItem("loginUserToken") !== "wwVR6fezLGSS39muEbOSz01QA5t1") 
{
  
  return    window.location.href = "/login"

}

    return(
    
   <Container fluid>
    <TopMenu />
    <Grid columns={2}>
      <Grid.Row stretched>
        <Grid.Column width={4}>
          <LeftNavBar />
        </Grid.Column>
        <Grid.Column width={12} style={{paddingTop : '30px'}}>
    <Switch>
              <Route exact path={`/admin/products`}><Products /></Route>
              <Route path={`/admin/orders`}><Orders /></Route>
              <Route path={`/admin/users`}><Users /></Route>
              <Route path="/admin"><Dashboard /></Route>
            </Switch>
           </Grid.Column>
      </Grid.Row>
    </Grid>

 </Container>
    )
}

export default AdminHome