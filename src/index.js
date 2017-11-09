import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHystory, hashHistory} from 'react-router';
import reduxThunk from 'redux-thunk';
import RequireAuth from './components/auth/require_auth';

import App from './components/app';
import reducers from './reducers';
import Signin from './components/auth/signin';
import Feature from './components/feature';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Welcome from './components/welcome';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');

if(token) {
   store.dispatch({type: AUTH_USER});
}


ReactDOM.render(
   <Provider store={store}>
      <Router history={hashHistory}>
         <Route path="/" component={App}>
            <IndexRoute component={Welcome} />
            <Route path="/signin" component={Signin} />
            <Route path="/feature" component={RequireAuth(Feature)} />
            <Route path="/signout" component={Signout} />
            <Route path="/signup" component={Signup} />

         </Route>
      </Router>
   </Provider>
  , document.querySelector('.container'));
