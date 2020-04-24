import React, { Component } from 'react'
import HeaderNav from '../HeaderNav/HeaderNav'
import {Grid, Segment, Icon, Container , Image, Checkbox, Header, Divider, Button, Placeholder} from 'semantic-ui-react'
import "./Cart.css"
import firebase from '../../firebase'
import {Link} from 'react-router-dom'
const uid = localStorage.getItem("loginUserToken")
var subTotal = 0
var shippingFee = 109
export default class Cart extends Component {
  
  state = {
    productCount : 1 ,
    Quantity : 20, 
    array : [] , 
    stRateShip : true , 
    prRateShip : false ,
    load : true
  }



componentDidMount = () => {
    console.log(uid)
    this.databaseLoadCart()
}


checkBoxState = (id , totalPrice) => {
    if(this.state[id] === undefined || this.state[id] === false )
    {
     
        this.setState({[id] : true })
     
        subTotal  = subTotal+ totalPrice
        // console.log(sbt)
    }
    else
    {
        this.setState({[id] : false })
        subTotal  = subTotal - totalPrice
     
        // console.log(sbt)

    }
    // console.log("fun")
    // console.log(this.state[id])
}


delCart = (count , id , totalPrice) => {
    console.log("Total Item: " +count)
    console.log("ID: "+id)
    let prevQuantity = 0
    firebase.database().ref("products/"+id).once("value").then((snapshot) => {
        snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key;
            var childData = childSnapshot.val();
        
            if(childData !== null && key == "Quantity")
            {
                    prevQuantity = childData
            }
            
          

            firebase.database().ref("products/"+id).update({
                Quantity : prevQuantity + count
            })     
        });   
    })
    .catch(error => {
        // this.setState({error : error})
        console.log(error); 

    })

    firebase.database().ref("users/"+uid+"/cart").child(id).remove()
    // this.setState({array : []})
    if(this.state[id])
    subTotal = subTotal - totalPrice
    this.databaseLoadCart()


}

databaseLoadCart = () => {
    var datalist = []
    this.setState({load : true})
    firebase.database().ref("users/"+uid+"/cart").once("value").then((snapshot) => {
        snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key;
            var childData = childSnapshot.val();
                console.log(key)
            if(childData !== null)
            {
                    
                    datalist.push(childData)
          
            }
            
          
        });   
        this.setState({array : []})        
        this.setState({array : [...this.state.array , ...datalist] , load : false})
        console.log(datalist)
    })
    .catch(error => {
        // this.setState({error : error})
        console.log(error); 

    })
}

incProd = (id , count , actPrice) => {

    let prevQuantity = 0
    firebase.database().ref("products/"+id).once("value").then((snapshot) => {
        snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key;
            var childData = childSnapshot.val();
        
            if(childData !== null && key == "Quantity")
            {
                    prevQuantity = childData
            }
            
       
        });   
        if(prevQuantity !== 0)
        {
            firebase.database().ref("products/"+id).update({
                Quantity : prevQuantity-1
            })   
            let updatedCount = count + 1
            let actPriceNew = actPrice * updatedCount
                firebase.database().ref('users').child(uid+"/cart/"+id).update({
                    count : updatedCount ,
                    totalPrice : actPriceNew
                })
                if(this.state[id])
                {
                    subTotal = subTotal+actPrice
                }
            this.databaseLoadCart()
        }
    })
    .catch(error => {
        // this.setState({error : error})
        console.log(error); 

    })

   
   
}





decProd = (id , count , actPrice) => {


    let updatedCount = count - 1
let actPriceNew = actPrice * updatedCount
    firebase.database().ref('users').child(uid+"/cart/"+id).update({
        count : updatedCount ,
        totalPrice : actPriceNew
    })

    let prevQuantity = 0
    firebase.database().ref("products/"+id).once("value").then((snapshot) => {
        snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key;
            var childData = childSnapshot.val();
        
            if(childData !== null && key == "Quantity")
            {
                    prevQuantity = childData
            }
            
        
            firebase.database().ref("products/"+id).update({
                Quantity : prevQuantity+1
            })     
        });   
    })
    .catch(error => {
        // this.setState({error : error})
        console.log(error); 

    })

    if(this.state[id])
    {
        subTotal = subTotal-actPrice
    }
this.databaseLoadCart()


}


stRate = () => {
    shippingFee = 109
    this.setState({stRateShip : true , prRateShip : false})
}

prRate = () => {
    shippingFee = 209
    this.setState({stRateShip : false , prRateShip : true})
}
    render() {
        return (
            <div>
            {uid == null ?
            <div>
                {window.location.href = "/login"}
            </div>
:
       <div>
                <HeaderNav />   
                <Divider />
              
            <div>
                {this.state.load ? 
            <div>
                
                <Container>
                    <Grid columns={2}>
                        <Grid.Row>
                            <Grid.Column width={12}>
                                <Segment>

                                <Placeholder fluid> 
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                </Placeholder>
                                </Segment>
                                <Segment>

<Placeholder fluid> 
    <Placeholder.Line />
    <Placeholder.Line />
    <Placeholder.Line />
    <Placeholder.Line />
    <Placeholder.Line />
</Placeholder>
</Segment>
                            </Grid.Column>
                            <Grid.Column width={4}>
                            <Segment>

                            <Placeholder fluid> 
                                <Placeholder.Line />
                                <Placeholder.Line />
                                <Placeholder.Line />
                                <Placeholder.Line />
                                <Placeholder.Line />
                            </Placeholder>
                            </Segment>
                            
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>

            </div>
            :
                <div>
 {this.state.array .length > 0 ?
                <Container>
                <Grid Column={2} >
                    <Grid.Row>

                    <Grid.Column width={12} >

                        <Segment>
                            <p>Preferred Delivery Option</p>
                           
                {subTotal === 0 ? <p>Please Select Item(s) first.</p>
                        :   
                        
                            <div style={{display : 'flex'}}  >

                               <div className = {this.state.stRateShip ? "stRate selected" : " stRate"} onClick = {this.stRate}  >
                                <div className="stRateIcon">
                                    <Icon name ="check circle" color={this.state.stRateShip ? "blue" : "grey"} inverted />
                                </div>
                                <div className ="stDetailRate">
                                   <p>RS. 109</p>
                                   <p>Standard Rates</p>
                                   <p>Get by 27-29 Apr</p>
                                </div> 

                                </div> 


                                <div className = {this.state.prRateShip ? "stRate selected " : "stRate"} onClick = {this.prRate}  >
                                <div className="stRateIcon">
                                    <Icon name ="check circle" color={this.state.prRateShip ? "blue" : "grey"} inverted />
                                </div>
                                <div className ="stDetailRate">
                                   <p>RS. 209</p>
                                   <p>Premium Rates</p>
                                   <p>Get by 23-25 Apr</p>
                                </div> 

                                </div> 
                              

                            </div>
    }   
                        </Segment>

                {this.state.array.map((element , i) => (
          <Segment>
          <Grid columns={4}>
              <Grid.Row>
                  <Grid.Column width={14} floated="right">
<div style={{display:"flex"}} >
                  <Checkbox slider  checked={this.state[element.id]}  onChange={ () => { this.checkBoxState(element.id , element.totalPrice) }} />
                <p>{element.Category}</p>
                  </div>
                  <Divider />
                  </Grid.Column>
                  <Grid.Column width={2}>
                    <Icon name="delete" link size="large" className="deletButn" onClick={() => {this.delCart(element.count , element.id , element.totalPrice)}} />
                  </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                  <Grid.Column width={3} verticalAlign="middle">
                      <Image src={element.image1} style={{height : '100px'}} />
                  </Grid.Column>
                  <Grid.Column width={7} verticalAlign="middle">
                <Link to={`/productid=${element.id}`}>  <Header as="h4">{element.title}</Header> </Link>
                      <p>{element.Category}</p>
                  </Grid.Column>
                  <Grid.Column width={3} verticalAlign="middle">
                <p>RS. {element.actualPrice}</p>
                  </Grid.Column>
                  <Grid.Column width={3} floated="left" verticalAlign="middle">
                  <Button size="tiny" className="cartQuantityplus"  onClick={() => {this.incProd(element.id, element.count , element.actualPrice)}}><Icon name="plus" /></Button>
                  <p className="amount">{element.count}</p>
                  <Button size="tiny" className="cartQuantityminus" disabled = { element.count == 1 ? true : false}   onClick={() => {this.decProd(element.id, element.count , element.actualPrice)}}><Icon name="minus" /></Button>
        
                  </Grid.Column>
              </Grid.Row>
          </Grid>
      </Segment>

                ))}
                    </Grid.Column>
                    <Grid.Column width={4} >

                <Segment>
                    <Header as="h4">Order Summary</Header>
                    <Divider />
                    
                    {subTotal !== 0 ? 
                    <div >
                        <div style={{float:'left'}}>
                        <p>Subtotal (3 items)</p>
                        <p>Shipping Fee</p>
                        <hr/>
                      
                        <p>Total</p>

                        </div>
                        <div  style={{float:'right'}}>
                        <p>RS. {subTotal}</p>
                        <p>RS. {shippingFee}</p>
                        <hr/>
                        <p>RS. {subTotal + shippingFee}</p>
                        </div>
                  
                    </div>
                        : null }
                    <Button color="orange" disabled={subTotal !== 0 ? false : true} fluid>Proceed to Checkout</Button>
                </Segment>

                    </Grid.Column>

                    </Grid.Row>
                </Grid>
                </Container>
                 :
                 <Container textAlign="center">
                     <Header as="h1">No Item in Cart</Header>
                       <Button  color = "olive" onClick={() => {window.location.href = "/"}}>Continue Shopping</Button>
                 </Container>
       }
                </div>
            }
            </div>

             
            </div>
 
    }
    </div>
 )
    }
}
