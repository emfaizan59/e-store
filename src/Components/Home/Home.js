import React, { Component } from 'react'
import HeaderNav from '../HeaderNav/HeaderNav'
import Carousel from '../Carousel/Carousel'
import Products from '../Products/Products'

import firebase from '../../firebase'
export default class Home extends Component {

    state={
        array : [] ,
        load : true
    }

componentDidMount = () => {
        this.databaseLoad()
}

databaseLoad = () => {
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

        // console.log(this.state.array); 
       

    })
    .catch(error => {
   //     this.setState({error : error})
   console.log(error); 

})


}

    render() {
        const searchProd = localStorage.getItem("searchProd")
        const token = localStorage.getItem("loginUserToken")
        console.log(searchProd)
        return (
            <div>
                <HeaderNav />
                <Carousel  />
                <Products productArray = {this.state.array} load = {this.state.load} />

            </div>
        )
    }
}


