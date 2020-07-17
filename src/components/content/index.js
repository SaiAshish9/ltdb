import React from 'react'
import {Switch,Route} from 'react-router-dom'
import Homepage from '../homepage'
import Users from './components/users'
import Categories from './components/categories'

const Content = () => {
    return (
      <Switch>
        <Route exact path to="/home" component={Homepage} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/categories" component={Categories} />
      </Switch>
    );
}

export default Content
