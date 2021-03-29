import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import NotFoundScreen from './screens/NotFoundScreen';
import ContactScreen from './screens/ContactScreen';

const App = () => {
  return (
    // Allowing routing throughout the app
    <Router>
      {/* scrolls to top of page when new component loads */}
      <ScrollToTop>
        <Header />
        <main>
          {/* Bootstrap container */}
          <Container>
            {/* Looks for a matching <Route> and once it finds it, it will stop looking further, outputting only one child (One Route) */}
            <Switch>
              {/* Route is being matched with <Link> via path and loads appropriate component */}
              <Route path='/order/:id' component={OrderScreen} />
              <Route path='/placeorder' component={PlaceOrderScreen} />
              <Route path='/payment' component={PaymentScreen} />
              <Route path='/shipping' component={ShippingScreen} />
              <Route path='/login' component={LoginScreen} />
              <Route path='/register' component={RegisterScreen} />
              <Route path='/profile' component={ProfileScreen} />
              <Route path='/product/:id' component={ProductScreen} />
              <Route path='/cart/:id?' component={CartScreen} />
              <Route path='/contact' component={ContactScreen} />
              <Route path='/admin/userlist' component={UserListScreen} />
              <Route path='/admin/user/:id/edit' component={UserEditScreen} />
              <Route
                exact
                path='/admin/productlist'
                component={ProductListScreen}
              />
              <Route
                exact
                path='/admin/productlist/:pageNumber'
                component={ProductListScreen}
              />
              <Route path='/admin/orderlist' component={OrderListScreen} />
              <Route
                path='/admin/product/:id/edit'
                component={ProductEditScreen}
              />
              <Route exact path='/search/:keyword' component={HomeScreen} />
              <Route path='/page/:pageNumber' component={HomeScreen} />
              <Route
                exact
                path='/search/:keyword/page/:pageNumber'
                component={HomeScreen}
              />
              <Route exact path='/' component={HomeScreen} />

              <Route component={NotFoundScreen} />
            </Switch>
          </Container>
        </main>
        <Footer />
      </ScrollToTop>
    </Router>
  );
};

export default App;
