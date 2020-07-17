import React from 'react'
import {Switch,Route,withRouter} from 'react-router-dom'
import Homepage from '../homepage'
import Users from './components/users'
import Categories from './components/categories'
import axios from 'axios'



const Content = () => {


    return (
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/categories" component={Categories} />
      </Switch>
          );
}

export default withRouter(Content)
