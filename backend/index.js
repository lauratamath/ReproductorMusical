const express = require('express')
const app = express()
const port = 3001

const music_model = require('./music_model')

const db = require('./mongo');
const UsersRep = db.usersRep;
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
  console.log("Cannot connect to the database!", err);
  process.exit();
})
app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
})

app.post('/repData', (req, res) => {
  const { username, listened } = req.body

  UsersRep.countDocuments({username: username}, (err, count) => {
    if (count > 0) {
      UsersRep.updateOne({username: username}, {$set: {listened: listened}}).then((response) => {
        res.status(200).send(response);
      })
    } else {
      UsersRep.create({username: username, listened: listened}).then((response) => {
        res.status(200).send(response);
      })
    }
  })
})

app.get('/repDate', (req, res) => {
  UsersRep.find().then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/delPastDate', (req, res) => {
  UsersRep.remove({}).then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/actualRecommendation', (req, res) => {
  music_model.getRecommendation(req.body).then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.put('/actualUsername', (req, res) => {
  music_model.setActualUsername(req.body).then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/', (req, res) => {
  music_model.getUsersAccounts().then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})


app.get('/bitacora', (req, res) => {
  music_model.getBitacora().then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/useraccount', (req, res) => {
  music_model.createUserAccount(req.body).then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/email', (req, res) => {
  music_model.createEmailManagment(req.body).then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.put('/', (req, res) => {
  music_model.updateUserAccount(req.body).then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/playlists', (req, res) => {
  music_model.getPlaylists().then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/usersSubscriptions', (req, res) => {
  music_model.getSubscriptions().then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.put('/usersSubscriptions', (req, res) => {
  music_model.updateSubscription(req.body).then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.put('/monitorType', (req, res) => {
  music_model.createMonitorMembership(req.body).then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/possibleMonitors', (req, res) => {
  music_model.getPossibleMonitors().then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})


app.get('/monitorsFeatures', (req, res) => {
  music_model.getMonitorsFeatures().then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/monitorMembership', (req, res) => {
  music_model.getMonitorMembership().then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})


app.post('/monitorFeatures', (req, res) => {
  music_model.getMonitorAccess(req.body).then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/monitorsFeatures', (req, res) => {
  music_model.createMonitorFeature(req.body).then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/monitorTypes', (req, res) => {
  music_model.createMonitor(req.body).then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})


app.post('/playlists', (req, res) => {
  music_model.createPlaylist(req.body).then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/songs', (req, res) => {
  music_model.getSongs().then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/songs', (req, res) => {
  music_model.createSong(req.body).then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.put('/songs', (req, res) => {
  music_model.updateSong(req.body).then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.put('/albumArtist', (req, res) => {
  music_model.updateAlbum(req.body).then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/spotifySongs', (req, res) => {
  music_model.createSpotifySong(req.body).then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/spotifyAlbums', (req, res) => {
  music_model.createSpotifyAlbum(req.body).then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/songsAvailability', (req, res) => {
  music_model.getAllSongs().then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})


app.put('/songsAvailability', (req, res) => {
  music_model.songAvailability(req.body).then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.put('/albumsAvailability', (req, res) => {
  music_model.albumAvailability(req.body).then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.delete('/songs', (req, res) => {
  music_model.deleteSong(req.body).then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/accountmanager', (req, res) => {
  music_model.getAccountManager().then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.put('/accountmanagermongo', (req, res) => {
  music_model.getAccountManagerPerDate(req.body).then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})


app.put('/accountmanager', (req, res) => {
  music_model.updateAccountManager(req.body).then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/accountmanager', (req, res) => {
  music_model.createAccountManager(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/freemembership', (req, res) => {
  music_model.getFreeMembership().then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.put('/deactivateFree', (req, res) => {
  music_model.deactivateFreeMembership(req.body).then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.put('/deactivateCreator', (req, res) => {
  music_model.deactivateCreator(req.body).then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})


app.put('/freemembership', (req, res) => {
  music_model.updateFreeMembershipDay(req.body).then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/freemembership', (req, res) => {
  music_model.createFreeMembershipDay(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/premiummembership', (req, res) => {
  music_model.createPremiumMembership(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/creatorsmembership', (req, res) => {
  music_model.getCreatorsMembership().then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
}) 

app.get('/premiummembership', (req, res) => {
  music_model.getPremiumMembership().then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
}) 

app.post('/creatorsmembership', (req, res) => {
  music_model.createCreatorsMembership(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.delete('/creatorsmembership', (req, res) => {
  music_model.deleteCreatorsMembership(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/activeUsers', (req, res) => {
  music_model.getMostActiveUsers().then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/albumReleases', (req, res) => {
  music_model.getAlbumsReleases().then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/salesPerWeek', (req, res) => {
  music_model.getSalesPerWeek().then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/salesPerGenre', (req, res) => {
  music_model.getSalesPerGenre().then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/mostSelledArtist', (req, res) => {
  music_model.getMostSelledArtists().then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/topSongs', (req, res) => {
  music_model.getTopSongs().then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/popularArtists', (req, res) => {
  music_model.getMostPopularArtists().then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/popularGenders', (req, res) => {
  music_model.getMostPopularGenders().then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/songsCount', (req, res) => {
  music_model.getArtistsSongsCount().then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/subscriptionCount', (req, res) => {
  music_model.getMensualSubscription().then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
