import React from 'react'
import {Container, Image, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import "./TopMenu.css"
const logOut = ()=> {
    localStorage.removeItem("loginUserToken")
    window.location.reload()
   }
const TopMenu = () => {
    return(
        <Container fluid className="topMenuBar">
         <div className="divTop">
          <Link to="/"> <Image src="/images/e-store.png"  size="tiny"  /> </Link>  

            <Button className="divTopButton"  onClick={logOut}>Log Out</Button>
            </div>
        </Container>
    )
}


export default TopMenu