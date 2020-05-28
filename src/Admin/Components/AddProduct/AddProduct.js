import React, { Component, Fragment } from 'react'
import { Grid , Form , Message , Header , Container , Button , Progress , Icon ,Image , Segment} from 'semantic-ui-react'
import firebase from '../../../firebase'
import JoditEditor from "jodit-react";

import "./AddProduct.css"
let errorMsg = []
let fileArr = []
let urlArr = []
let imgArr = []
export default class AddProduct extends Component {
   
   state={
       loading : false , 
       pname : '',
       pnameEr : false ,
       catname : '' ,
        catnameEr : false ,
        quantity : 0 ,
        quantityEr :false ,
        price : 0 ,
        priceEr :false ,
        warranty : 'yes' , 
        returnPolicy : 0 , 
        returnPolicyEr : false,
        fileEr : false ,    
         progress : 0, 
         content  : '',
         contentEr : false ,
         dataSet : firebase.database().ref('products'),
         successMsg :'',
    prevImg : [] 
   }

   
   valueChange = (e) => {
    this.setState({[e.target.name] : e.target.value})
    console.log(e.target.value)
}

   componentDidMount = () => {
        
    
   }


      fileObj = [];
   fileArray = [];
onFileChange = e => {
    
    for (let i = 0; i < e.target.files.length; i++) {
         const newFile = e.target.files[i];
         newFile["id"] = Math.random();
         imgArr.push(URL.createObjectURL(e.target.files[i]))
      // add an "id" property to each File object

    //   this.setState({multFiles : [...this.state.multFiles , newFile]})

        fileArr.push(newFile)

       }
       this.setState({prevImg : [...imgArr]})
       console.log(imgArr)
     }
   
     
     timeout = null;

onUploadSubmission = e => {
    this.setState({loading : true})
if(this.isValid())
{

    
        e.preventDefault(); // prevent page refreshing
       console.log(fileArr.length)
    
       var timeStamp = Math.round((new Date()).getTime()/1000 );

       const promises = [];
         fileArr.forEach(file => {
           const uploadTask = 
            firebase.storage().ref().child(`${timeStamp}/${file.name}`).put(file);
              promises.push(uploadTask);
              uploadTask.on(
                 firebase.storage.TaskEvent.STATE_CHANGED,
                 snapshot => {
                //   const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)


                        this.setState({progress : progress , fileNameUp : file.name})
                        console.log(file.name + " Uploading: "+ progress)
          

        // const prog1 = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                    //   this.setState({progress : prog1})
                    //     console.log(file.name + " Uploading: "+ prog1)
                   },
                   error => console.log(error.code),
                   async () => {
                     const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
                      // do something with the url
                      console.log(downloadURL)
                        urlArr.push(downloadURL)
                      

                    //   this.setState({progress : 0})
                    }
                   );
                 });
             Promise.all(promises)
              .then(() => {
                console.log("then wala")
               
                
                  clearTimeout(this.timeout)
    
                  this.timeout = setTimeout(() => {
                    
                  
                    const uniqueUrl = urlArr.filter((val,id,array) => array.indexOf(val) == id);
                    console.log(uniqueUrl)
                    console.log(uniqueUrl.length)




                    this.state.dataSet.child(timeStamp).set({
                        id : timeStamp ,
                        productName : this.state.pname ,
                        Category : this.state.catname ,
                        Quantity : this.state.quantity ,
                        Price : this.state.price ,
                        Warranty : this.state.warranty ,
                        returnPolicy : this.state.returnPolicy,
                        Description : this.state.content ,
                        Sale : 0 ,
                        productRating : 0 ,
                        productReviews : 0 ,
                        Images : ''
                    })

                // for(let i = 0 ; i < uniqueUrl.length ;i++)
                // {
                    firebase.database().ref('products/'+timeStamp).child("Images").set(uniqueUrl)
                // }
                  

                this.setState({loading : false , successMsg : "Successfully Add Product" , pname : '' , catname : '' , quantity : 0 , price : 0 , 
            warranty : 'yes' , returnPolicy : 0 
            })
            fileArr = [] 
            urlArr = []

            window.location.reload()
                  }, 3000);
           

              })
              .catch(err => console.log(err.code));
       }
       else
       {
           console.log("Error")
           this.setState({loading : false})
       }
    }

   
    isValid = () => {
        
        const {pname , catname , quantity , price , returnPolicy , content } = this.state
        this.setState({pnameEr : false , catnameEr : false , quantityEr : false , priceEr : false , returnPolicyEr : false , fileEr : false , contentEr : false })
        errorMsg = []
        if(pname !== "" && catname !== "" && quantity !== 0 &&  price !==0 &&  returnPolicy !== 0 && fileArr.length >0 && content !== '' )
        {
     
            errorMsg = []
                return true
        }
        else{
            if(pname == "")
            {
                errorMsg.push("Product Name should not be empty.\n")
                this.setState({ pnameEr : true})
            }   
            if(catname == "")
            {
                errorMsg.push("Select Appropriate Category.\n")
    
                this.setState({ catnameEr : true})
    
            }   
            if(quantity <= 0)
            {
                errorMsg.push("Qunatity must not be zero or less.\n")
    
                this.setState({quantityEr : true})
            }
            
            if( price <= 0 )
            {
            errorMsg.push("Price must not be zero or less.\n")
    
                this.setState({ priceEr : true})
    
            }
           
            if(returnPolicy <= 0)
            {
                errorMsg.push("Return Policy must not be zero or less.\n")
    
                this.setState({ returnPolicyEr : true})
    
            }
            if(fileArr.length <= 0)
            {
                errorMsg.push("Should upload atleast one product image.\n")
    
                this.setState({ fileEr : true})
            }
            if(content == '')
            {
                errorMsg.push("Product Description should not be empty.\n")
                this.setState({contentEr : true})
            }
            return false
        }
    
    }



    deleteImg = (id) => {
        fileArr.splice(id ,1)
        imgArr.splice(id, 1)
        this.setState({prevImg : []})
        this.setState({prevImg : [...imgArr]})


        console.log(fileArr)
        console.log(imgArr)
        console.log(this.state.prevImg)

    }

    render() {
        
        const config = {
            readonly: false , // all options from https://xdsoft.net/jodit/doc/
                toolbarButtonSize :'large',
                uploader : { "insertImageAsBase64URI": true},
                iframe : true
            }


        return (
            
 <Container fluid style={{paddingBottom : '40px'}}>
                <Header as="h3">Add Product</Header>
                <Form >

                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column width={8}>
              
                
                <Form.Input  className={this.state.pnameEr ? "error" : ""}
                    label="Product Name"
                     placeholder='Product Name'
                     value={this.state.pname}
                     name="pname"
                     onChange = {this.valueChange}
             
                 />
               
   <Form.Group widths="equal">
           
                <Form.Field label='Category' control='select'   name="catname"    onChange = {this.valueChange}  className={this.state.catnameEr ? "error" : ""}
               >
                   
                     <option value=''>Select Category</option>
                     <option value='Electronic Devices'>Electronic Devices</option>
                     <option value='Electronic Accessories'>Electronic Accessories</option>
                     <option value='Health and Beauty'>Health and Beauty</option>
                     <option value='Babies and Toys'>Babies and Toys</option>
                     <option value='Groceries and Pets'>Groceries and Pets</option>
                     <option value='Home and Lifestyle'>Home and Lifestyle</option>
                     <option value='Women Fashion'>Women Fashion</option>
                     <option value='Men Fashion'>Men Fashion</option>
                     <option value='Watches, Bags and Jewelery'>Watches, Bags and Jewelery</option>
                     <option value='Sports and Outdoor'>Sports and Outdoor</option>
                     <option value='Automotive and Motorbike'>Automotive and Motorbike</option>
                   </Form.Field>
    
                   <Form.Input  className={this.state.quantityEr ? "error" : ""}
                    label="Quantity"
                     placeholder='0'
                     value={this.state.quantity}
                     name="quantity"
                     type="number"

                     onChange = {this.valueChange}
             
                 />
               
  </Form.Group>
  <Form.Input  className={this.state.priceEr ? "error" : ""}
                    label="Price"
                     placeholder='0'
                     type="number"

                     value={this.state.price}
                     name="price"
                     onChange = {this.valueChange}
             
                 />
  <Form.Group widths="equal">
    
  

<Form.Field label='Warranty' control='select'     name="warranty"  onChange = {this.valueChange}
     >
           <option value='yes'>Yes</option>
           <option value='no'>No</option>
         </Form.Field>
                   
         <Form.Input  className={this.state.returnPolicyEr ? "error" : ""}
                    label="Return Policy (Days)"
                     placeholder='0'
                     type="number"

                     value={this.state.returnPolicy}
                     name="returnPolicy"
                     onChange = {this.valueChange}
             
                 />

         </Form.Group>


     
                      </Grid.Column>


                        <Grid.Column width={7}>

{this.state.prevImg.length > 0 ?
<Fragment>
<p>Click on Image to Delete.</p> 
   <Image.Group size='small'>
                    {this.state.prevImg.map((element , i) => (
                     
     
                              
                        <Image src={element}  onClick={() => {this.deleteImg(i)}} />
          

                  


                    ))}
                    </Image.Group>
                    </Fragment>
: null}




           <Form.Input  className={this.state.fileEr ? "error" : ""}
                    label="Product Image"
                  
                    fluid  type="file" multiple onChange={this.onFileChange} 
                 />
           
   
         
               

                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            <Segment style={{border : this.state.contentEr ? "1px solid red" : ""}}>
            <JoditEditor
      // ref={editor}
        value={this.state.content}
        config={config}

        
      tabIndex={1} // tabIndex of textarea 
      onBlur={newContent => this.setState({content: newContent})} // preferred to use only this option to update the content for performance reasons
        // onChange={newContent => setContent(newContent)}
    />

            </Segment>
            {fileArr.length > 0 && this.state.progress !== 100 ? 
                  <div>
                      <Progress percent={this.state.progress} indicating style={{marginBottom : '5px'}} />
               {/* <progress className="ui active indicating progress" data-percent="this.state.progress" max="100" /> */}
                <span > {this.state.progress != 0 ? `${this.state.fileNameUp} => ${this.state.progress}%  Upload Completed` : null }</span> 
                </div>          
                : null }
               {errorMsg.length > 0 ?
             <Message  negative={true} >
                 <Message.Header>There was some errors with your submission</Message.Header>
                 <Message.List>
                 {errorMsg.map((element , i) => (
                     <Message.Item>{errorMsg[i]}</Message.Item>
                 ))}
                 
                 </Message.List>
               </Message>
             : null }
             
             {this.state.successMsg !== '' ?
             <Message  positive={true} >
                 <Message.Header>{this.state.successMsg}</Message.Header>
                
               </Message>
             : null }   
             {/* <Button type='submit' disabled={this.state.loading}  className={this.state.loading ? 'loading' : ''} color="twitter">Submit</Button> */}
                 <Button type='submit' fluid onClick={this.onUploadSubmission} disabled={this.state.loading}  className={this.state.loading ? 'loading' : ''}  color="twitter">Submit</Button>
          
                </Form>
            </Container>
        )
    }
}
