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
import Free from "./components/memberships/Free"
import Premium from "./components/memberships/Premium"

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login/premium" component={Premium} />
          <Route path="/login/free" component={Free} />
          <Route path="/login" component={LogIn} />
          <Route path="/signin" component={Signin} />
          <Route path="/" component={Home}/>
        </Switch>
        
      </div>
    </Router>
  );
}
