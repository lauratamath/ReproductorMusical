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
import GetReports from "./components/memberships/functions/GetReports";
import AvailabilitySong from "./components/memberships/functions/AvailabilitySong";
import SongToPlaylist from "./components/memberships/functions/SongToPlaylist";
import Playlist from "./components/memberships/functions/Playlist";
import PlaylistInfo from "./components/memberships/functions/PlaylistsInfo";
import AlbumReleases from "./components/memberships/functions/reports/AlbumReleases";
import PopularArtists from "./components/memberships/functions/reports/PopularArtists";
import SubscriptionCount from "./components/memberships/functions/reports/SubscriptionCount";
import SongsCount from "./components/memberships/functions/reports/SongsCount";
import PopularGenders from "./components/memberships/functions/reports/PopularGenders";
import ActiveUsers from "./components/memberships/functions/reports/ActiveUsers";
import Monitor from "./components/memberships/Monitor";
import DeactivateFree from "./components/memberships/functions/DeactivateFree";
import DeactivateCreator from "./components/memberships/functions/DeactivateCreator";
import DeleteSubscriptions from "./components/memberships/functions/DeleteSubscription";
import CreateMonitor from "./components/memberships/functions/CreateMonitor";
import AsignMonitor from "./components/memberships/functions/AsignMonitor";
import Bitacora from "./components/memberships/functions/reports/Bitacora";
import SalesPerWeek from "./components/memberships/functions/reports/SalesPerWeek";
import MostSelledArtist from "./components/memberships/functions/reports/MostSelledArtist";
import TopSongs from "./components/memberships/functions/reports/TopSongs";
import SalesPerGenre from "./components/memberships/functions/reports/SalesPerGenre";




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
          <Route path="/login/premium/playlists/playlistInfo" component={PlaylistInfo} />
          <Route path="/login/premium/playlists" component={Playlist} />
          <Route path="/login/premium/SongToPlaylist" component={SongToPlaylist} />
          <Route path="/login/premium/listeningTo" component={ListeningTo} />
          <Route path="/login/creator/listeningTo" component={ListeningTo} />
          <Route path="/login/free/listeningTo" component={ListeningTo} />
          <Route path="/login/admin/reports/activeUsers" component={ActiveUsers} />
          <Route path="/login/admin/reports/popularGenders" component={PopularGenders} />
          <Route path="/login/admin/reports/songsCount" component={SongsCount} />
          <Route path="/login/admin/reports/subscriptionCount" component={SubscriptionCount} />
          <Route path="/login/admin/reports/popularArtists" component={PopularArtists} />
          <Route path="/login/admin/reports/albumReleases" component={AlbumReleases} />
          <Route path="/login/admin/reports/salesPerWeek" component={SalesPerWeek} />
          <Route path="/login/admin/reports/salesPerGenre" component={SalesPerGenre} />
          <Route path="/login/admin/reports/mostSelledArtist" component={MostSelledArtist} />
          <Route path="/login/admin/reports/topSongs" component={TopSongs} />
          <Route path="/login/monitor/reports/activeUsers" component={ActiveUsers} />
          <Route path="/login/monitor/reports/popularGenders" component={PopularGenders} />
          <Route path="/login/monitor/reports/songsCount" component={SongsCount} />
          <Route path="/login/monitor/reports/subscriptionCount" component={SubscriptionCount} />
          <Route path="/login/monitor/reports/popularArtists" component={PopularArtists} />
          <Route path="/login/monitor/reports/albumReleases" component={AlbumReleases} />
          <Route path="/login/admin/availability" component={AvailabilitySong} />
          <Route path="/login/admin/reports" component={GetReports} />
          <Route path="/login/admin/delete" component={AvailabilitySong} />
          <Route path="/login/admin/modify" component={Modify} />
          <Route path="/login/monitor/1" component={Modify} />
          <Route path="/login/monitor/2" component={AvailabilitySong} />
          <Route path="/login/monitor/3" component={DeactivateFree} />
          <Route path="/login/monitor/4" component={DeleteSubscriptions} />
          <Route path="/login/monitor/5" component={DeactivateCreator} />
          <Route path="/login/monitor/6" component={AsignMonitor} />
          <Route path="/login/monitor/7" component={GetReports} />
          <Route path="/login/monitor/8" component={Bitacora} />
          <Route path="/login/admin/accessBitacora" component={Bitacora} />
          <Route path="/login/admin/asignMonitor" component={AsignMonitor} />
          <Route path="/login/admin/createMonitor" component={CreateMonitor} />
          <Route path="/login/admin/account" component={AdminAccount} />
          <Route path="/login/creator/account" component={CreatorAccount} />
          <Route path="/login/premium/account" component={PremiumAccount} />
          <Route path="/login/free/account" component={FreeAccount} />
          <Route path="/login/monitor" component={Monitor} />
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
