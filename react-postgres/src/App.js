import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Signin from "./components/Signin";
import Login from "./components/Login"


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
          <Route path="/login">
            <Login />
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
