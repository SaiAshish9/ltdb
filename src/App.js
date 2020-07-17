import React from "react";
import { Switch,Route,withRouter } from "react-router-dom";
import Dashboard from './containers/homepage'
import Login from "./containers/auth/login";
import {connect} from "react-redux"


const App = ({token}) => {
  return (
    <Switch>
      {token && token.length>0 ? (
        <Route exact  path="/" >
          <Dashboard
          token={token}
          />
        </Route>
      ) : (
        <Route exact  path="/" component={Login} />
      )}
    </Switch>
  );
};

const mapStateToProps =(state) => ({
  token: state.auth.user && state.auth.user.token
})

export default withRouter(connect(mapStateToProps,null)(App));
