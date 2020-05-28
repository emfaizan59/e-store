import React from 'react';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import {Route , BrowserRouter , Switch} from 'react-router-dom'
import Home from './Components/Home/Home';
import ProductPage from './Components/ProductPage/ProductPage';
import Cart from './Components/Cart/Cart';
import AdminHome from './Admin/Components/AdminHome/AdminHome'
import UserProfile from './Components/UserProfile/UserProfile';
function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route component={Home} exact path="/" />
      <Route component={Login} exact path="/login" />
      <Route component={Register} exact path="/register" />
      <Route component={Cart} exact path="/cart" />
      <Route  path="/admin"><AdminHome /></Route>

      <Route component={UserProfile} exact path="/profile/:page" />
      <Route component={ProductPage} exact path="/productid=:prodID" />


      </Switch>
      </BrowserRouter>
  );
}

export default App;
