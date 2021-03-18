import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "./components/Home"
import Signin from "./components/Signin"
import LogIn from "./components/Login"
import Planes from "./components/Planes"
import Free from "./components/memberships/Free"
import Premium from "./components/memberships/Premium"
import Creator from "./components/memberships/Creator"
import Admin from "./components/memberships/Admin"
import Modify from "./components/memberships/functions/Modify"
import FreeAccount from "./components/memberships/functions/FreeAccount"
import UploadSongs from "./components/memberships/functions/UploadSongs"
import PremiumAccount from "./components/memberships/functions/PremiumAccount"
import CreatorAccount from "./components/memberships/functions/CreatorAccount"
import GetPremium from "./components/memberships/functions/GetPremium"
import GetFree from "./components/memberships/functions/GetFree"
import ListeningTo from "./components/memberships/functions/ListeningTo"
import GetCreator from "./components/memberships/functions/GetCreator"
import AdminAccount from "./components/memberships/functions/AdminAccount";
import DeleteSong from "./components/memberships/functions/DeleteSong";
import GetReports from "./components/memberships/functions/GetReports";
import InactivateSong from "./components/memberships/functions/InactivateSong";




export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login/premium/account/getCreator" component={GetCreator} />
          <Route path="/login/free/account/getCreator" component={GetCreator} />
          <Route path="/login/creator/account/getFree" component={GetFree} />
          <Route path="/login/creator/account/getPremium" component={GetPremium} />
          <Route path="/login/premium/account/getFree" component={GetFree} />
          <Route path="/login/free/account/getPremium" component={GetPremium} />
          <Route path="/login/creator/upload" component={UploadSongs} />
          <Route path="/login/premium/listeningTo" component={ListeningTo} />
          <Route path="/login/creator/listeningTo" component={ListeningTo} />
          <Route path="/login/free/listeningTo" component={ListeningTo} />
          <Route path="/login/admin/inactivate" component={InactivateSong} />
          <Route path="/login/admin/reports" component={GetReports} />
          <Route path="/login/admin/delete" component={DeleteSong} />
          <Route path="/login/admin/modify" component={Modify} />
          <Route path="/login/admin/account" component={AdminAccount} />
          <Route path="/login/creator/account" component={CreatorAccount} />
          <Route path="/login/premium/account" component={PremiumAccount} />
          <Route path="/login/free/account" component={FreeAccount} />
          <Route path="/login/admin" component={Admin} />
          <Route path="/login/creator" component={Creator} />
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
