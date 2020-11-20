import React from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import Dashboard from "./containers/homepage";
import Login from "./containers/auth/login";
import { connect } from "react-redux";
import { Provider as DataProvider } from "./api/dataProvider";

const App = ({ token }) => {
  return (
    <DataProvider>
      <Switch>
        {token && token.length > 0 ? (
          <Route path="/">
            <Dashboard token={token} />
          </Route>
        ) : (
          <Route exact path="/" component={Login} />
        )}
        {!token && <Route exact path="/" component={Login} />}
      </Switch>
      {!token && <Redirect to="/"/>}
    </DataProvider>
  );
};
//test comment

const mapStateToProps = (state) => ({
  token: state.auth.user && state.auth.user.token,
});

export default withRouter(connect(mapStateToProps, null)(App));

// AKIA5IL3UMD74KUN6DHE   l4ywHjoWj7Aowy36pwalQJ2Us7Jy2JuBpAPTz9P4