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

app.put('/', (req, res) => {
  music_model.updateUserAccount(req.body).then(response => {
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


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
