import React, { Component } from 'react'
import { Container, Grid , List, Header, Segment , Image} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import "./Brand.css"
export default class Brand extends Component {
    render() {
        return (
            <div>
              <Grid columns={4}>
                            <Grid.Row>
                      
        
          <Grid.Column>
                <Link to="/login">
            <Segment  raised className="productCard" >
           <div className="productImage" style={{background :`linear-gradient(to bottom, rgba(0,0,0,0.0)
                 50%, rgba(0,0,0,0.05)
           60%, rgba(0,0,0,0.10)
           70%, rgba(0,0,0,0.15)
           80%, rgba(0,0,0,0.20)
           100%
        ) ,url('/images/head.jpg'), #1c1c1c` , backgroundRepeat : 'no-repeat' , backgroundPosition : 'top' , backgroundSize : '100% 100%'
    }} >
                                        
                                        <Image className="productLogo" src="/images/headbrnd.jpeg" size="tiny" circular />

                                        </div>
                                    <Header textAlign="center" as='h4'>Head and Shoulder</Header>
                                    </Segment>
                
                                    </Link>          
                </Grid.Column>
                </Grid.Row>
                </Grid>

            </div>
        )
    }
}
