import React, { Component , Fragment } from 'react'
import { Grid, Header , Label , Rating , Icon, Loader , Segment , Dimmer , Image  } from 'semantic-ui-react'
import "./ViewProduct.css"
import ReactHtmlParser from 'react-html-parser';

import firebase from '../../../firebase'
export default class ViewProduct extends Component {
  state = {
      productName : '' , 
      productCat : '' ,
      images : [] , 
      price : 0 ,
      quantity : 0,
      warranty : 'yes' , 
      sale : 0 ,
      id : '',
      productRating : '',
      productReviews : 0 ,
      returnPolicy : 0 ,
      description : '' ,
      load : true
   }
  
   componentDidMount = () => {
       this.ViewProductDetails()
   }
  
   ViewProductDetails = () => {
    firebase.database().ref(`products/${this.props.id}`).on('value', (snapshot) => {
        const userObj = snapshot.val();


       this.setState({productName : userObj.productName , productRating : userObj.productRating , returnPolicy : userObj.returnPolicy , productReviews : userObj.productReviews ,price : userObj.Price , sale : userObj.Sale , quantity : userObj.Quantity , productCat : userObj.Category , id : userObj.id ,
         load : false  , warranty : userObj.Warranty  , images : userObj.Images , description : userObj.Description })

      
  })

      
   }

    render() {
        return (
            <div>
           <Segment>    
                <Grid columns={2}>
                    <Grid.Row >
                        <Grid.Column width={7}>
{this.state.load ? 

<Segment>
<Dimmer active>
  <Loader size='big'>Loading</Loader>
</Dimmer>

<Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
<Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
<Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
</Segment>

:

 <div>                     
{this.state.images.length > 0 ?


<Grid columns={2} >
{this.state.images.map((element , i) => (


<Grid.Column width={8}>
<div style = {{height : '150px' , width : '150px' , marginRight:'10px', background : `url('${element}') no-repeat center/contain`}}></div>
</Grid.Column>
    ))}
</Grid>
: <h3>No Image yet Uploaded.</h3> 

}
</div>

    }
 </Grid.Column>
                        <Grid.Column width={9}>
<h3 className="prodTit">{this.state.productName}</h3>
                           {this.state.productRating !== '' ?
                            <div> <Rating icon='star' defaultRating={this.state.productRating} maxRating={5}  size='mini' disabled /></div>
    : null}
               
                            <Label.Group size='large' className="zeroGroup" color="orange">
                              
                                <Label><Icon name="shopping bag"  /> Category: {this.state.productCat}</Label>
                              
                            </Label.Group>


                            <Label.Group size='large' className="zeroGroup" color="brown">
                              
                              <Label><Icon name="eye"  /> Product Reviews: {this.state.productReviews}</Label>
                            
                          </Label.Group>


                            <Label.Group size='large' className="firstGroup">
                                <Label  color="red"><Icon name="dollar"  /> Price: RS {this.state.price}</Label>
                                <Label  color="grey"><Icon name="shopping basket"  /> Quantity: {this.state.quantity} Available</Label>
                              
                            </Label.Group>


                            
                            <Label.Group size='large' className="secondGroup">
<Label  color={this.state.warranty == 'yes'? "green" : "red"}><Icon name="question circle"  />{this.state.warranty == 'yes' ? "Warranty Available" : "Warranty Not Available"}</Label>
<Label  color="blue"><Icon name="redo"  /> Return Policy {this.state.returnPolicy + " Days"} </Label>
                              
                            </Label.Group>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
    </Segment>
   {this.state.description !== '' ?
         <Segment>
             <Header as="h3">Product Overview</Header>
             <div>{ReactHtmlParser(this.state.description)}</div>


         </Segment>
: null }
            </div>
        )
    }
}
