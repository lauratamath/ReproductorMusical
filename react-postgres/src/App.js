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
          <Route path="/login/premium">
            <Premium />
          </Route>
          <Route path="/login/free">
            <Free />
          </Route>
          <Route path="/login">
            <LogIn />
          </Route>
          <Route path="/signin">
            <Signin />
          </Route>
          <Route path="/">
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
