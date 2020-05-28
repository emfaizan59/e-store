import React, { Fragment } from 'react'
import {Container , Header,Modal , Divider, Button , Icon } from 'semantic-ui-react'
import DashboardCard from '../../Assets/DashboardCard'
import ProductTable from '../../Assets/ProductTable'
import AddProduct from '../AddProduct/AddProduct'
import UpdateProduct from '../UpdateProduct/UpdateProduct'

class Products extends React.Component {

    state={
        open : false
    }
//  editProd = (id) => {
//         console.log(id)
//     }
close = () => this.setState({ open: false })

    render(){
    return(   
 <Container >
          <Header as="h2">Products</Header>
      <DashboardCard />

        <Button style={{marginTop: '40px' }} onClick={() => this.setState({ open: true })} color="vk"   ><Icon name="plus" /> Add Product</Button>
        <Modal dimmer="blurring" open={this.state.open} onClose={this.close} >
    <Modal.Header>Add Product to Store</Modal.Header>
         
    <Modal.Content image scrolling>
        <div style={{margin : '30px'}}>
         <AddProduct />
         </div>
       
       </Modal.Content>
        </Modal>

        <ProductTable  fromSource = "productPanel" />


        {/* <UpdateProduct /> */}
        {/* <AddProduct /> */}
        </Container>
    )
}
}
export default Products