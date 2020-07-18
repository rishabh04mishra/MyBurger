import React, {Component} from 'react';
import {connect} from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import { Route, Switch,withRouter,Redirect } from 'react-router-dom';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuider';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

let asyncCheckout =asyncComponent (() =>{
  return import('./containers/Checkout/Checkout');
});
let asyncOrders =asyncComponent (() =>{
  return import('./containers/Orders/Orders');
});
let asyncAuth =asyncComponent (() =>{
  return import('./containers/Auth/Auth');
});
class  App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignUp();
  }
  render(){

    let routes=(
      <Switch>
        <Route path="/auth" component={asyncAuth}/>
        <Route path="/" exact component={BurgerBuilder}/>
        <Redirect to="/" />
      </Switch>
    );

    if(this.props.isAuthenticated){
      routes=(
        <Switch>
          <Route path="/checkout" component={asyncCheckout}/>  
            <Route path="/orders" component={asyncOrders}/> 
            <Route path="/logout" component={Logout}/>  
            <Route path="/auth" component={asyncAuth}/>
            <Route path="/" exact component={BurgerBuilder}/>
            <Redirect to="/" />
        </Switch>
      )
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
  
}

const mapStateToProps = state =>{
  return {
    isAuthenticated:state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    onTryAutoSignUp: () => dispatch(actions.authCheckstate())
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
