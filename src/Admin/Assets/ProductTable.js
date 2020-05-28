import React, { Fragment } from 'react'
import {Table, Container , Header, Icon , Modal, Loader} from 'semantic-ui-react'
import "./style.css"
import firebase from '../../firebase'
import UpdateProduct from '../Components/UpdateProduct/UpdateProduct'
import ViewProduct from '../Components/ViewProduct/ViewProduct'
var data_list = []

class ProductTable extends React.Component {
 
 state = {
     load : true , 
     array : [] , 
     open : false ,
     modalStatue : '' ,
    id : '' ,
    cartedItem : []
}
close = () => this.setState({ open: false })

 
    componentDidMount = () => {
      this.databaseProdListLoad()  
    }

editItem = (id) => {
  this.setState({id})
  this.setState({ modalStatue: 'edit' , open: true })
}

viewItem = (id) => {
  this.setState({id})
  this.setState({ modalStatue: 'view' , open: true })
}


    databaseProdListLoad = () => {
      data_list = []  
      firebase.database().ref("products").once("value").then((snapshot) => {
            snapshot.forEach(function(childSnapshot) {
                var key = childSnapshot.key;
                var childData = childSnapshot.val();
                if(childData !== null)
                {
                data_list.push(childData) 

                
                  

                let carted_list = childData.cartedItem
                console.log(carted_list)

                //     let carted_count = 23
            //     firebase.database().ref("products/"+id+"/cartedItem").once("value").then((snapshot) => {
            //       snapshot.forEach(function(childSnapshot) {
            //           var key = childSnapshot.key;
            //           var childData = childSnapshot.val();
                      
            //           if(childData !== null )
            //           {
            //             // console.log(childData.count)
            //             carted_count = carted_count + childData.count
            //             carted_list.push(childData) 
            //           }
                      
            //       });   
            //       // this.setState({array : []})
            //       // this.setState({ array : [...data_list] , load : false})
            
            //       console.log(carted_count); 
                 
            
            
            //   })
            //   .catch(error => {
            //  //     this.setState({error : error})
            //  console.log(error); 
            
            
            // })
            



                }
                
            });   
            this.setState({array : []})
            this.setState({ array : [...data_list] , load : false})
    
            console.log(data_list); 
           

    
        })
        .catch(error => {
       //     this.setState({error : error})
       console.log(error); 
       this.setState({load : false})
    
    })
    }






    deleteProduct = (id) => {
// this.setState({load : true})

 let ref = firebase.storage().ref(`${id}`);
ref.listAll().then(dir => {
  dir.items.forEach(fileRef => {
    var dirRef = firebase.storage().ref(fileRef.fullPath);
    dirRef.getDownloadURL().then(function(url) {
      var imgRef = firebase.storage().refFromURL(url);
      imgRef.delete().then(function() {
  console.log("success");
  firebase.database().ref("products").child(`${id}`).remove()
// this.setState({load : false})
  
  window.location.reload()

  // File deleted successfully 
      }).catch(function(error) {
        // There has been an error      
      });
    });
  });
}).catch(error => {
  console.log(error);
// this.setState({load :false})

});
    }
 
    render(){
      
 const   getCartedItems = (index , id) => {
 

    console.log(data_list[0].cartedItem.length)
    let carted_list = []
    let carted_count = 23
    firebase.database().ref("products/"+id+"/cartedItem").once("value").then((snapshot) => {
      snapshot.forEach(function(childSnapshot) {
          var key = childSnapshot.key;
          var childData = childSnapshot.val();
          
          if(childData !== null )
          {
            // console.log(childData.count)
            carted_count = carted_count + childData.count
            carted_list.push(childData) 
          }
          
      });   
      // this.setState({array : []})
      // this.setState({ array : [...data_list] , load : false})

      console.log(carted_count); 
     


  })
  .catch(error => {
 //     this.setState({error : error})
 console.log(error); 


})

  return carted_count
}
    return (
    <Fragment>
    
    {this.state.load ? 
    
      <Loader active />
 
 :   

    <Container className="prodTable">
    {this.state.array.length > 0 ?
    <Fragment>
        <Header as="h4">Product List</Header> 

        <Table unstackable color="grey" selectable >
        <Table.Header >
          <Table.Row>
            <Table.HeaderCell>ID#</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Category</Table.HeaderCell>
            <Table.HeaderCell >Quantity</Table.HeaderCell>
            <Table.HeaderCell >Carted Items</Table.HeaderCell>
            <Table.HeaderCell >Price</Table.HeaderCell>
            <Table.HeaderCell >Rating</Table.HeaderCell>
       <Table.HeaderCell >Action</Table.HeaderCell> 
         
         </Table.Row>
        </Table.Header>
    
        <Table.Body>
    {this.state.array.map((element , i) => (
  <Table.Row className="elementRow">
  <Table.Cell>{element.id}</Table.Cell>
  <Table.Cell>{element.productName}</Table.Cell>
  <Table.Cell>{element.Category}</Table.Cell>
  <Table.Cell >{element.Quantity}</Table.Cell>
  <Table.Cell >1</Table.Cell>
  <Table.Cell >{element.Price}</Table.Cell>
  <Table.Cell >{element.productRating}</Table.Cell>
  {this.props.fromSource == "productPanel" ?
      
  <Table.Cell>   

       <Icon className="cellAction" circular inverted color="blue" name='eye' size="small" link  onClick={() => {this.viewItem(element.id)}}/>
        <Icon className="cellAction" circular inverted color="orange" name='edit' size="small" link onClick={() => {this.editItem(element.id)}} />
                     <Icon className="cellAction" circular inverted color='red' name='delete' size="small" link onClick = {() => {this.deleteProduct(element.id)}} />

      
  </Table.Cell>


  : 
  <Table.Cell >   
  <Icon circular className="cellAction" inverted color="blue" name='eye' size="small" link  onClick={() => {this.viewItem(element.id)}}/> </Table.Cell>
  }




</Table.Row>
 
    ))}
         

        </Table.Body>
      </Table>

    

   <Modal dimmer="blurring" open={this.state.open} onClose={this.close} >
    <Modal.Header>{this.state.modalStatue == 'edit' ?  "Edit Product" : "View Product"}</Modal.Header>
       
  <Modal.Content image scrolling>
      <div style={{margin : '30px'}}>

        {this.state.modalStatue == "edit" ? 
       <UpdateProduct itemNo = {this.state.id} />
       :
       <ViewProduct id = {this.state.id} />

    }
       </div>
     
     </Modal.Content>
      </Modal>

      </Fragment>

      : <h3>No Product yet Added.</h3> }
      </Container>
   
  }
   </Fragment>
    )
}
}

export default ProductTable