import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Homepage from "../homepage";
import Users from "./components/users";
import Categories from "./components/categories";
import Notifications from "./components/notifications";
import Items from "./components/items";
import Games from "./components/games";
import Banner from "./components/banner";
import Labels from "./components/labels";
import DeliveryFees from "./components/delivery-fees";
import Orders from "./components/orders";
import AdvancedBuilder from "./components/advancedBuilder"

const Content = () => {
  return (
    <Switch>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/users" component={Users} />
      <Route exact path="/categories" component={Categories} />
      <Route exact path="/notifications" component={Notifications} />
      <Route exact path="/labels" component={Labels} />
      <Route exact path="/items" component={Items} />
      <Route exact path="/games" component={Games} />
      <Route exact path="/orders" component={Orders} />
      <Route exact path="/banner" component={Banner} />
      <Route exact path="/advanced-builder" component={AdvancedBuilder} />
      <Route exact path="/delivery-fees" component={DeliveryFees} />
    </Switch>
  );
};

export default withRouter(Content);
