import React, { Fragment ,useEffect , useState  } from 'react'
import { Container, Header, Grid, Divider } from 'semantic-ui-react'
import DashboardCard from '../../Assets/DashboardCard'
import firebase from '../../../firebase'
import ProductTable from '../../Assets/ProductTable'
import ViewProduct from '../ViewProduct/ViewProduct'
class Dashboard extends React.Component {


  render(){
  return(
        <Fragment>
          
      <Container fluid>
        <Header as="h2">
          Admin Dashboard
        </Header>
        <DashboardCard />

        <Divider />

        <ProductTable  fromSource = "dashboardPanel" />

      {/* <ViewProduct /> */}

      </Container>
        </Fragment>
    )
}
}
export default Dashboard