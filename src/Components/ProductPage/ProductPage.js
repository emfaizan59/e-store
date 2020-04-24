import React, { Component } from 'react'
import HeaderNav from '../HeaderNav/HeaderNav'
import "./ProductPage.css"
import {Breadcrumb, Container, Grid, Segment , Image ,Modal ,Header , Rating , Card, Icon, Button , Divider , Placeholder } from 'semantic-ui-react'
import {Link, Redirect} from 'react-router-dom'
import Viewer from 'react-viewer';
import firebase from '../../firebase'
import MyModal from '../Modal/LoginModal'
import LoginComponent from '../LoginComponent/LoginComponent'
let prodCart = []
let a = localStorage.getItem("loginUserToken")
let arrImgSrc = []
let uid = localStorage.getItem("loginUserToken")
export default class ProductPage extends Component {
    
    state= {
        
        visible : false ,
        ind : 0 , 
        productName : '' ,
        productRating : '',
        productReviews : '' ,
        Price : '',
        Sale : '',
        Quantity : '',
        featuredImage : '',
        returnPolicy : '' ,
        Category : '',
        id : '' ,
        warranty : true ,
        productCount : 1 ,
        dataSet : firebase.database().ref('users'),
        prodSet : firebase.database().ref('products') ,
        load : true ,
        open : false ,
        addedCart : false ,
        wish : false ,
        imageArr : [],
        // modalOpen: false,
        // valueIntoModal: "123456abcdef"


     }

    setVisible = (e) => {

        this.setState({ind : e , visible : true})
    }


    componentDidMount = () => {
        // console.log(localStorage.getItem("loginUserToken"))
      firebase.database().ref("products/"+this.props.match.params.prodID).on('value', (snapshot) => {
        const userObj = snapshot.val();

       prodCart = {...userObj}

       this.setState({productName : userObj.productName , productRating : userObj.productRating , returnPolicy : userObj.returnPolicy , productReviews : userObj.productReviews ,Price : userObj.Price , Sale : userObj.Sale , Quantity : userObj.Quantity , Category : userObj.Category , id : userObj.id ,
         load : false  , warranty : userObj.Warranty
    })

     
 
    var imgList = []
    var featureImg = ''
    firebase.database().ref("products/"+this.props.match.params.prodID+"/Images").once("value").then((snapshot) => {
        snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key;
            var childData = childSnapshot.val();
            console.log(key)
            if(childData !== null && key == "0")
            {
               featureImg = childData
            }
            if(childData !== null && key !== "0")
            {
            imgList.push(childData) 
            }
            
        });   
        arrImgSrc.push(  {src : featureImg} )
        
        this.setState({featuredImage : featureImg ,imageArr : []})
        this.setState({ imageArr : [...imgList]})
        console.log(this.state.imageArr)

        imgList.map((element,i)=>(
                arrImgSrc.push({src : imgList[i]})
     ))

    })


    firebase.database().ref("users/"+a+"/cart/"+this.props.match.params.prodID).on('value', (snapshot) => {

        var count = snapshot.numChildren()

        if(count !== 0)
        {
            this.setState({addedCart : true})
        }
        

       })

       firebase.database().ref("users/"+a+"/wishlist/"+this.props.match.params.prodID).on('value', (snapshot) => {

        var count = snapshot.numChildren()

        if(count !== 0)
        {
            this.setState({wish : true})
        }
        

       })

      })

      
    }
    
    close = () => this.setState({ open: false })


addCart = () => {
      

if(a == null)
{
    // window.location.href = "/login"

    this.setState({ open: true })
}
else{

        let id = prodCart.id
        let prevCount = 0
        this.setState({ open: true })
        firebase.database().ref("users/"+a+"/cart/"+id).once("value").then((snapshot) => {
            snapshot.forEach(function(childSnapshot) {
                var key = childSnapshot.key;
                var childData = childSnapshot.val();
        
                if(childData !== null && key == 'count')
                {
             
                    prevCount = childData
              
                }
                
            });   
    


            console.log("Count => "+prevCount)


            // console.log(prodCart)
            // let id = prodCart.id
       
            
            let currentCount = prevCount + this.state.productCount
            let currentPrice = this.state.Price * currentCount
            console.log("Calc .....")
             console.log(prevCount + " , "+ this.state.productCount)
            console.log(currentCount)
            console.log("Calc .....")
            console.log(currentPrice)
            this.state.prodSet.child(id).update({
                Quantity : this.state.Quantity - this.state.productCount
            })
            this.state.dataSet.child(a+"/cart/"+id).update({
                    title : prodCart.productName,
                    id : prodCart.id ,
                    count : currentCount ,
                    Category : this.state.Category,
                    image1 : arrImgSrc[0].src ,
                    actualPrice : this.state.Price , 
                    totalPrice : currentPrice

            })
    
            this.setState({productCount : 1})

        })
        .catch(error => {
            // this.setState({error : error})
            console.log(error); 

        })
       
    }
    }


    toggleWishlist = () => {
       
        if(a == null)
{
    // window.location.href = "/login"

    this.setState({ open: true })
}
else{

        if(this.state.wish)
        {
            
                console.log(this.props.match.params.prodID + "Item delete from Wishlist")

                this.state.dataSet.child(uid+"/wishlist/"+this.props.match.params.prodID).remove()
        }
        else
        {
            console.log( this.props.match.params.prodID +"Item add in Wishlist")

            this.state.dataSet.child(uid+"/wishlist/"+this.props.match.params.prodID).update({
                title : prodCart.productName,
                id : prodCart.id ,
                Category : this.state.Category,
                image1 : arrImgSrc[0].src,
                actualPrice : this.state.Price , 
        })

        }

        
        this.setState({wish : !this.state.wish})

    }
    }
    render() {
            // console.log(this.props.match.params.prodID)
        return (

  
                <div>
                <HeaderNav />
            <Container>
          
          {this.state.load ? null :
                <div>
                <Breadcrumb size="medium">
            <Breadcrumb.Section link href="/">Home</Breadcrumb.Section>
          <Breadcrumb.Divider icon='right chevron' />
        <Breadcrumb.Section link href="/">{this.state.Category}</Breadcrumb.Section>
          <Breadcrumb.Divider icon='right chevron' />
        <Breadcrumb.Section active>{this.state.productName}</Breadcrumb.Section>
        </Breadcrumb>
                </div>
    }

    {this.state.load ?
<Segment>
    <Grid columns={3}>
        <Grid.Row >
            <Grid.Column width={6}>
            <Placeholder fluid style={{height : '400px'}}>
                <Placeholder.Image />
             </Placeholder>
            </Grid.Column>
            <Grid.Column width={6}>
            <Placeholder className="titlePlaceholder">
            <Placeholder.Line length='full' />
            </Placeholder>
            <Placeholder  className="descPlaceholder">
            <Placeholder.Line length='medium' />
            </Placeholder>

            <Placeholder  className="descPlaceholder">
            <Placeholder.Line length='short' />
            </Placeholder>

            <Placeholder  className="descPlaceholder">
            <Placeholder.Line length='short' />
            </Placeholder>

            <Placeholder  className="descPlaceholder">
            <Placeholder.Line length='very long' />
            </Placeholder>

            <Placeholder  className="descPlaceholder">
            <Placeholder.Line length='very short' />
              <Placeholder.Line length='very short' />
            </Placeholder>    
            </Grid.Column>
            <Grid.Column width={4}>
            <Placeholder className="titlePlaceholder">
            <Placeholder.Line length='full' />
            </Placeholder>
            <Placeholder className="descPlaceholder">
            <Placeholder.Line length='medium' />
            </Placeholder>

            <Placeholder className="descPlaceholder">
            <Placeholder.Line length='medium' />
            </Placeholder>

            <Placeholder className="descPlaceholder">
            <Placeholder.Line length='medium' />
            </Placeholder>

            </Grid.Column>
        </Grid.Row>
    </Grid>
</Segment>

:
<Segment clearing>
            <Grid columns={3}>
                <Grid.Row stretched >
                    <Grid.Column width={6}>
             
                            <Image fluid src={this.state.featuredImage} style={{cursor:'pointer'}} onClick={() => {this.setVisible(0)}} />
                      
                            <Image.Group size="tiny" centered={true} >

            {this.state.imageArr.map((element , i) => (
                            <Image src={this.state.imageArr[i]} size="tiny" bordered fluid style={{cursor:'pointer' , height : '70px'}} onClick={() => {this.setVisible(i+1)}}/>

            ))}
                            {/* <Image src={this.state.image2} size="tiny" bordered fluid style={{cursor:'pointer' , height : '70px'}} onClick={() => {this.setVisible(1)}}/>
                            <Image src={this.state.image3} size="tiny"  bordered fluid  style={{cursor:'pointer', height : '70px'}} onClick={() => {this.setVisible(2)}}/>
                            <Image src={this.state.image4} size="tiny" bordered fluid  style={{cursor:'pointer', height : '70px'}} onClick={() => {this.setVisible(3)}} />
                            <Image src={this.state.image5} size="tiny" bordered fluid  style={{cursor:'pointer', height : '70px'}} onClick={() => {this.setVisible(4)}} /> */}

                            </Image.Group>  
                
                            <Viewer
            visible={this.state.visible}
            activeIndex = {this.state.ind}
      
      
            rotatable = {false}
            disableMouseZoom = {true}
            drag = {false}
            zoomSpeed= {0.20}
            noImgDetails= {true}
            scalable  = {false}
            showTotal	= {true}
            onClose={ () => { this.setState({visible : false}) } }
            images={arrImgSrc}
            // images={[{src: `${this.state.image1}`} , {src: `${this.state.image2}`} , {src: `${this.state.image3}`} , {src: `${this.state.image4}`} , {src: `${this.state.image5}`} ]}
            />

                    </Grid.Column>
                    <Grid.Column width={6}>
                        <div className="ProdDetail">

                        <span style={{float: 'right' }}>{this.state.wish ? "Added to Wishlist" : "Add to Wishlist"}</span>
                       <Icon name={this.state.wish ?"heart" : "heart outline"  } color ="red" size="large" link onClick={this.toggleWishlist} style={{float : 'right'}}/> 



        <h3 className="title">{this.state.productName}</h3>
                              <p className="prodRatings"> <Rating icon='star' defaultRating={this.state.productRating} maxRating={5}  size='mini' disabled /> ({this.state.productReviews})</p>
                   
                    <Divider />
                            <h3 className="price">RS. {this.state.Price}</h3>
                        <p className="prodSales"><strong>RS. {this.state.Sale}</strong> -4%</p> 

        <div>
          
          {this.state.addedCart ? 
<div>
                <p>Product Already added to Cart.</p>
              <Link to="/cart"> <Button color="linkedin" fluid >Go to Cart</Button></Link>
     </div>
        :

        <div>
                    <div className="quantity">
                    <p className="labelQuantity">Quatity </p>
                    <Button disabled = { this.state.productCount >= this.state.Quantity ? true : false} onClick={() => {this.setState({productCount : this.state.productCount+1})}}><Icon name="plus" /></Button>
                    <p className="amount">{this.state.Quantity == 0 ? 0 :  this.state.productCount}</p>
                    <Button disabled = { this.state.productCount == 1 ? true : false}   onClick={() => {this.setState({productCount : this.state.productCount-1})}}><Icon name="minus" /></Button>
    {this.state.Quantity == 0 ?  <span>Out of Stock</span> : <span>{this.state.Quantity}  Available</span> }
                     </div>
                    <Button disabled = { this.state.Quantity == 0 ? true : false} fluid onClick={this.addCart} ><Icon name="heart outline" />Add to Cart</Button>
  </div>
    }
    </div>
                    {/* <MyModal // The invisible modal itself
                        key='modal1'
                        modalOpen={this.state.modalOpen}
                        handleClose={
                            () => {
                            this.setState({ modalOpen: false })
                            }
                        }
                        
                        valueIntoModal={this.state.valueIntoModal}
                        /> */}



        <Modal dimmer="blurring" open={this.state.open} onClose={this.close}>
                    <Modal.Header>{a == null ? "You are not logged in. Kindly Log in to proceed." : "Item(s) added to Cart."  }</Modal.Header>
         
        {uid == null ? 

        <div style={{margin : '30px'}}>
         <LoginComponent source = "modal" />
         </div>

         :
         <div style={{margin : '30px'}}>
           
             <Button.Group>
            <Link to="/cart"> <Button color="orange">Go to Cart</Button></Link>
            <Link to="/"><Button color="twitter" >Continue Shopping</Button></Link> 
             </Button.Group>
         </div>
         
         }
       
        </Modal>


                        </div>
                    </Grid.Column>
                    <Grid.Column width={4}>
                <div>
                <p className="warranty">Return &amp; Warranty</p>
                <Divider />
                <p><Icon name="check circle"  color="blue"/> 100% Authentic</p>
                <p><Icon name="check circle" color="blue" />{this.state.returnPolicy} days easy return.<br/>
                <span style={{paddingLeft:'20px' , fontSize:'11px' , color : 'grey'}}>Change of mind is not applicable</span></p>
        <p><Icon name="check circle" color="blue" disabled = {this.state.warranty ? false : true} />{this.state.warranty ? "Warranty available" :"Warranty not available"  } </p>
                </div>


                    </Grid.Column>
                </Grid.Row>
            </Grid>
            </Segment>
    }
    </Container>
            </div>
  
        )
    }
}
