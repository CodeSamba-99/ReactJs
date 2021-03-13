import React from 'react';
import './App.css';
import Layout from '../src/components/Layout/Layout';
import BurgerBuilder from '../src/containers/BurgerBuilder/BurgerBuilder';
import { Route } from 'react-router-dom';
import Checkout from '../src/containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

function App() {
  return (
    <div>
      <Layout>
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" component={Orders} />
        <Route path="/auth" component={Auth} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={BurgerBuilder} />
      </Layout>
    </div>
  );
}

export default App;

//Use WithRouter to make sure he component route aware
