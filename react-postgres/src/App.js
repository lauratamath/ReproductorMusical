import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from "./components/Home";
import Signin from "./components/Signin";
import LogIn from "./components/Login"
import Planes from "./components/Planes"
import Free from "./components/memberships/Free"
import Premium from "./components/memberships/Premium"
import FreeAccount from "./components/memberships/functions/FreeAccount"
import PremiumAccount from "./components/memberships/functions/PremiumAccount"
import GetPremium from "./components/memberships/functions/GetPremium"
import GetFree from "./components/memberships/functions/GetFree"

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
        <Route path="/login/premium/account/getFree" component={GetFree} />
          <Route path="/login/free/account/getPremium" component={GetPremium} />
          <Route path="/login/premium/account" component={PremiumAccount} />
          <Route path="/login/free/account" component={FreeAccount} />
          <Route path="/login/premium" component={Premium} />
          <Route path="/login/free" component={Free} />
          <Route path="/planes" component={Planes} />
          <Route path="/login" component={LogIn} />
          <Route path="/signin" component={Signin} />
          <Route path="/" component={Home}/>
        </Switch>
        
      </div>
    </Router>
  );
}
