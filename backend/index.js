const express = require('express')
const app = express()
const port = 3001

const music_model = require('./music_model')

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/', (req, res) => {
  music_model.getUsersAccounts().then(response => {
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
