import React from 'react' 
import { Container, Segment, Grid, Header , Icon , Loader} from 'semantic-ui-react'
import "./style.css"
import firebase from  '../../firebase'
class DashboardCard extends React.Component {
    state = {
        pCount : 0  ,
        pPrice : 0 ,
        array : [] , 
        load : true
     }
    
     componentDidMount = () => {
      var data_list = []
      firebase.database().ref("products").once("value").then((snapshot) => {
        snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key;
            var childData = childSnapshot.val();
            if(childData !== null)
            {
            data_list.push(childData) 
            }
            
        });   
        this.setState({array : []})
        this.setState({ array : [...data_list] , load : false})
    
        console.log(this.state.array); 
       
    
    })
    .catch(error => {
    //     this.setState({error : error})
    console.log(error); 
    this.setState({load: false})
    
    })
    
     }
    
    
     priceCalc = () => {
      var totalPrice = 0 
      var ar = [...this.state.array]
      for(let i=0 ; i<ar.length ; i++)
      {
        totalPrice = totalPrice + ar[i].Price * ar[i].Quantity
      }
    
    
    
      return totalPrice
     }
    
     amountCalc = () => {
       var totalItems = 0
       var ar = [...this.state.array]
      for(let i=0 ; i<ar.length ; i++)
      {
        totalItems = totalItems + ar[i].Quantity*1
      }
    
    
      return totalItems
     }
    render(){
    return(
        <Container fluid>

        <Grid >

<Grid.Column width={5}>
<Segment  raised  >
            <Grid  verticalAlign="middle" >
                <Grid.Row className="card">
                    <Grid.Column width={11} >
    <h3 className="cardTitle">Product Count</h3>
                        <h3 className="cardAmount">{ this.state.load ?  <Loader size="small" inline active /> :  this.state.array.length}</h3>
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <Icon name="box" className="icoColor" size="big" />
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        </Segment>
</Grid.Column>
<Grid.Column width={5}>
<Segment  raised  >
            <Grid  verticalAlign="middle" >
                <Grid.Row className="card">
                    <Grid.Column width={11} >
    <h3 className="cardTitle">Product Amount</h3>
                        <h3 className="cardAmount">{ this.state.load ?  <Loader  size="small" inline active /> : this.amountCalc()}</h3>
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <Icon name="box" className="icoColor" size="big" />
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        </Segment>
</Grid.Column>
<Grid.Column width={5}>
<Segment  raised  >
            <Grid  verticalAlign="middle" >
                <Grid.Row className="card">
                    <Grid.Column width={11} >
    <h3 className="cardTitle">Summary Price</h3>
                        <h3 className="cardAmount">{this.state.load ?  <Loader  size="small" inline active /> :   `$${this.priceCalc()}`}</h3>
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <Icon name="dollar" className="icoColor" size="big" />
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        </Segment>
</Grid.Column>


</Grid>
    </Container>
    )
} 
}
export default DashboardCard