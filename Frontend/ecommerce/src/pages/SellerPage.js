import '../styles/MyPage.css';
import AddProducts from './addProducts';
import ProductList from './productList';
import Orders from './orders';
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const SellerPageRouter = () => {
  return (
    <Router>
      <div className='router'>
        <Link to='/seller'>
          <button className='btn'>Orders</button>
        </Link>
        <Link to='/seller/addproducts'>
          <button className='btn'>Add Products</button>
        </Link>
        <Link to='/seller/productlist'>
          <button className='btn'>Product List</button>
        </Link>
      </div>
      <Switch>
        <Route exact path='/seller'>
          <Orders />
        </Route>
        <Route exact path='/seller/addproducts'>
          <AddProducts />
        </Route>
        <Route exact path='/seller/productlist'>
          <ProductList />
        </Route>
      </Switch>
    </Router>
  );
};

const SellerPage = () => {
  return (
    <div>
      <SellerPageRouter />
    </div>
  );
};

export default SellerPage;
