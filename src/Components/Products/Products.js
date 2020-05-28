import React, { Component } from 'react'
import "./Products.css"
import {Link} from 'react-router-dom'
import { Container, Grid , List, Header, Segment , Image , Card , Icon , Rating , Placeholder} from 'semantic-ui-react'
import Brand from '../Brand/Brand'
export default class Products extends Component {
    state = {
        prodAr : [] ,
      
    }
    
  
    
    render() {
  
        const arrayList = this.props.productArray

        console.log(arrayList)
        return (

            <Container fluid>
                <Grid>
                    <Grid.Column width={12} style={{paddingLeft : '70px'}}>
                     
  <Header>E-Store Products</Header>
  {this.props.load ? 
<Grid columns={4}>
    <Grid.Row stretched>

    <Grid.Column>
          <Card>
                <Placeholder style={{height : '200px'}}>
                  <Placeholder.Image />
                </Placeholder>
          
                  <Placeholder>
                    <Placeholder.Header>
                    <Placeholder.Line length='large' />
                    <Placeholder.Line length='large' />
                      <Placeholder.Line length='medium' />
                      <Placeholder.Line length='very short' />
                      <Placeholder.Line length='large' />
                      <Placeholder.Line length='medium' />

                    </Placeholder.Header>
                    
                  </Placeholder>
                  </Card>
                  </Grid.Column>

                  <Grid.Column>
          <Card>
                <Placeholder style={{height : '200px'}}>
                  <Placeholder.Image />
                </Placeholder>
          
                  <Placeholder>
                    <Placeholder.Header>
                    <Placeholder.Line length='large' />
                    <Placeholder.Line length='large' />
                      <Placeholder.Line length='medium' />
                      <Placeholder.Line length='very short' />
                      <Placeholder.Line length='large' />
                      <Placeholder.Line length='medium' />

                    </Placeholder.Header>
                    
                  </Placeholder>
                  </Card>
                  </Grid.Column>

                  <Grid.Column>
          <Card>
                <Placeholder style={{height : '200px'}}>
                  <Placeholder.Image />
                </Placeholder>
          
                  <Placeholder>
                    <Placeholder.Header>
                    <Placeholder.Line length='large' />
                    <Placeholder.Line length='large' />
                      <Placeholder.Line length='medium' />
                      <Placeholder.Line length='very short' />
                      <Placeholder.Line length='large' />
                      <Placeholder.Line length='medium' />

                    </Placeholder.Header>
                    
                  </Placeholder>
                  </Card>
                  </Grid.Column>

                  <Grid.Column>
          <Card>
                <Placeholder style={{height : '200px'}}>
                  <Placeholder.Image />
                </Placeholder>
          
                  <Placeholder>
                    <Placeholder.Header>
                    <Placeholder.Line length='large' />
                    <Placeholder.Line length='large' />
                      <Placeholder.Line length='medium' />
                      <Placeholder.Line length='very short' />
                      <Placeholder.Line length='large' />
                      <Placeholder.Line length='medium' />

                    </Placeholder.Header>
                    
                  </Placeholder>
                  </Card>
                  </Grid.Column>

 </Grid.Row>
</Grid>

:
            <Grid columns={4}>
                <Grid.Row stretched>
   
   {arrayList.map((element , i) => (
 <Grid.Column>
 <Card raised link href= {`productid=${element.id}`}>
    <Image className="prodImage" src={element.Images[0]}   style={{height: '210px'}} />
   <h5 className="prodTitle">{element.productName.length > 100 ? `${element.productName.substring(0,45)}...` : element.productName }</h5>
   <p className="prodPrice">RS. {element.Price}</p>  
      <p className="prodSale"><strong>RS. {element.Sale}</strong> -50%</p> 
    
    <p className="prodRating"> <Rating icon='star' defaultRating={element.productRating} maxRating={5}  size='mini' disabled /> ({element.productReviews})</p>
    
  </Card>
                    </Grid.Column>
    

   ))}
       
      
                </Grid.Row>
            </Grid>

   }


          
                    </Grid.Column>
                


                  
                    <Grid.Column width={4}>
                        <Header>Product Categories</Header>
                    <List>
                    <List.Item><a className="catLink" href='#'>Electronic Devices</a></List.Item>
                    <List.Item><a className="catLink" href='#'>Electronic Accessories</a></List.Item>
                    <List.Item><a className="catLink" href='#'>TV and Home Appliances</a></List.Item>
                    <List.Item><a className="catLink" href='#'>Health and Beauty</a></List.Item>
                    <List.Item><a className="catLink" href='#'>Babies and Toys</a></List.Item>
                    <List.Item><a className="catLink" href='#'>Groceries and Pets</a></List.Item>
                    <List.Item><a className="catLink" href='#'>Home and Lifestyle</a></List.Item>
                    <List.Item><a className="catLink" href='#'>Women's Fashion</a></List.Item>
                    <List.Item><a className="catLink" href='#'>Men's Fashion</a></List.Item>
                    <List.Item><a className="catLink" href='#'>Watches, Bags and Jewelery</a></List.Item>
                    <List.Item><a className="catLink" href='#'>Sports and Outdoor</a></List.Item>
                    <List.Item><a className="catLink" href='#'>Automotive and Motorbike</a></List.Item>
          
            
                    </List>
                    </Grid.Column>
                </Grid>
            </Container>
        )
    }
}
