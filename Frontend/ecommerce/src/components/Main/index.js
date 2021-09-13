import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../../pages/Home';
import Catalog from '../../pages/Catalog';
import SignUp from '../../pages/SignUp';
import SignIn from '../../pages/SignIn';
import SellerPage from '../../pages/SellerPage';
import Bag from '../../pages/Bag';
import Navbar from './NavbarElements';
import SingleProduct from '../../pages/SingleProduct';

const Header = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/catalog/:name'>
          <Catalog />
        </Route>
        <Route path='/signup'>
          <SignUp />
        </Route>
        <Route path='/signin'>
          <SignIn />
        </Route>
        <Route path='/seller'>
          <SellerPage />
        </Route>
        <Route exact path='/item/:id' children={<SingleProduct />}></Route>
        <Route path='/my-bag'>
          <Bag />
        </Route>
      </Switch>
    </Router>
  );
};

export default Header;
