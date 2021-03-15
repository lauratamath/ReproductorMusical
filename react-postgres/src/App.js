import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Signin from "./components/Signin";
import LogIn from "./components/Login"
import Free from "./components/memberships/Free"
import Premium from "./components/memberships/Premium"

export default function App() {
  return (
    <Router>
      <div>
        <div>
          <Link to="/">
            <button>Home</button>
          </Link>
          <Link to="/login">
            <button>LogIn</button>
          </Link>
          <Link to="/signin">
            <button>SingIn</button>
          </Link>
        </div>

        <Switch>
          <Route path="/login/premium" component={Premium} />
          <Route path="/login/free" component={Free} />
          <Route path="/login" component={LogIn} />
          <Route path="/signin" component={Signin} />
          <Route path="/"/>
        </Switch>
        
      </div>
    </Router>
  );
}
