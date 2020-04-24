import React, { Component } from 'react'
import { Grid , Loader} from 'semantic-ui-react';
import './Carousel.css'
import Slider from 'infinite-react-carousel';
import { Link } from 'react-router-dom';
const date = new Date()

export default class Carousel extends Component {
 
    state={
        load : false
      }
    render() {
     
        const settings =  {
            accessibility: false,
            arrows: false,
            arrowsBlock: false,
            autoplay: true,
            autoplaySpeed: 10000,
            dots: true ,
            duration: 500
          };
     
        return (
 
       <div>
    {this.state.load ? 
    
    <div  className="carouselMain" style={{
        border : 'black',
      background : 
      `linear-gradient(to bottom, rgba(0,0,0,0.0)
          0%, rgba(0,0,0,0.0)
          5%, rgba(0,0,0,0.10)
         10%, rgba(0,0,0,0.20)
         20%, rgba(0,0,0,0.30)
         30%, rgba(0,0,0,0.40)
         40%, rgba(0,0,0,0.50)
         50%, rgba(0,0,0,0.60)
         60%, rgba(0,0,0,0.70)
         70%, rgba(0,0,0,0.80)
         80%, rgba(0,0,0,0.85)
         100%
      ) , #1c1c1c` , backgroundRepeat : 'no-repeat' , backgroundPosition : 'top' , backgroundSize : '100% 100%'
  }}   >
      <Loader active />
   
     </div>
: 

        <div>

<div>

<Slider { ...settings }>

<div>
        <Link to="/">  
        <div  className="carouselMain" style={{
          border : 'black',
        background : 
        `url('/images/car1.webp'), #1c1c1c` , backgroundRepeat : 'no-repeat' , backgroundPosition : 'top' , backgroundSize : '100% 100%'
    }}   >
   
     
       </div>
       </Link>
       </div>

       <div>
        <Link to="/"> 
         <div  className="carouselMain" style={{
          border : 'black',
        background : 
        `url('/images/car2.webp'), #1c1c1c` , backgroundRepeat : 'no-repeat' , backgroundPosition : 'top' , backgroundSize : '100% 100%'
    }}   >
   
     
       </div>
       </Link>
       </div>




       <div>
        <Link to="/">  
        <div  className="carouselMain" style={{
          border : 'black',
        background : 
        `url('/images/car3.webp'), #1c1c1c` , backgroundRepeat : 'no-repeat' , backgroundPosition : 'top' , backgroundSize : '100% 100%'
    }}   >
   
     
       </div>
       </Link>
       </div>

       <div>
        <Link to="/"> 
         <div  className="carouselMain" style={{
          border : 'black',
        background : 
        `url('/images/car4.webp'), #1c1c1c` , backgroundRepeat : 'no-repeat' , backgroundPosition : 'top' , backgroundSize : '100% 100%'
    }}   >
   
     
       </div>
       </Link>
       </div>




       <div>
        <Link to="/">  
        <div  className="carouselMain" style={{
          border : 'black',
        background : 
        `url('/images/car5.jpg'), #1c1c1c` , backgroundRepeat : 'no-repeat' , backgroundPosition : 'top' , backgroundSize : '100% 100%'
    }}   >
   
     
       </div>
       </Link>
       </div>

       <div>
        <Link to="/"> 
         <div  className="carouselMain" style={{
          border : 'black',
        background : 
        `url('/images/car6.webp'), #1c1c1c` , backgroundRepeat : 'no-repeat' , backgroundPosition : 'top' , backgroundSize : '100% 100%'
    }}   >
   
     
       </div>
       </Link>
       </div>



       <div>
        <Link to="/"> 
         <div  className="carouselMain" style={{
          border : 'black',
        background : 
        `url('/images/car7.webp'), #1c1c1c` , backgroundRepeat : 'no-repeat' , backgroundPosition : 'top' , backgroundSize : '100% 100%'
    }}   >
   
     
       </div>
       </Link>
       </div>

       </Slider>

     </div>
     

        </div>
}         
            </div>
        )
    }
}
