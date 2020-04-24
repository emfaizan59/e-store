import React, { Component } from 'react'
import { Container, Divider , Grid , Segment , Icon , Image , Header , Button , Placeholder} from 'semantic-ui-react'
import "./Wishlist.css"
import {Link} from 'react-router-dom'
import firebase from '../../firebase'
const uid = localStorage.getItem("loginUserToken")

export default class Wishlist extends Component {
 state = {
    array : [] , 
    load : true,
    dataSet : firebase.database().ref('users'),

 }
 componentDidMount = () => {
    console.log(uid)
    this.databaseLoadWishlist()
}
 
    databaseLoadWishlist = () => {
        var datalist = []
        this.setState({load : true})
        firebase.database().ref("users/"+uid+"/wishlist").once("value").then((snapshot) => {
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
            console.log(this.state.array)
        })
        .catch(error => {
            // this.setState({error : error})
            console.log(error); 
    
        })
    }

    removeWishlistItem = (id) => {
        this.state.dataSet.child(uid+"/wishlist/"+id).remove()

        this.databaseLoadWishlist()
    }

    render() {
        return (
        <Container fluid >
                <h3>Wishlist</h3>
                <Divider />
{this.state.load ?

<Grid columns={1}>
    <Grid.Row>
        <Grid.Column width={16}>
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
        </Grid.Row>
        </Grid>

:
<div>
{this.state.array.length == 0 ?
        <div>
            <Header as="h3">No Item in Wishlist</Header>
        <Link to="/"> <Button color="orange">Continue Shopping</Button> </Link>
        </div>
:
      <div>
      {this.state.array.map((element , i) =>(
        <Container className="wishItem">
        <Grid columns={4} >
            <Grid.Row className="topRow">
                <Grid.Column width={15} floated="right">
              <p style={{paddingLeft : '10px'}}>{element.Category}</p>
                <Divider />
                </Grid.Column>
                <Grid.Column width={1}>
                  <Icon name="delete" className="deleteProd" link onClick={() => this.removeWishlistItem(element.id)} size="large"  />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={3} verticalAlign="middle">
                    <Image src={element.image1} style={{height : '100px'}} />
                </Grid.Column>
                <Grid.Column width={7} verticalAlign="middle">
      <Link to={`/productid=${element.id}`} > <h4 className="titleProd">{element.title}</h4> </Link>
                    <p className="catProd">{element.Category}</p>
                </Grid.Column>
                <Grid.Column width={3} verticalAlign="middle">
              <p className="priceProd">RS. {element.actualPrice}</p>
                </Grid.Column>
               
            </Grid.Row>
        </Grid>

      </Container>
      ))}
    </div>

} 
</div>
    }           
        </Container>     
            )
    }
}
