const Pool  = require('pg').Pool 
const pool = new Pool ({
  user: 'postgres',
  host: 'localhost',
  database: 'proyecto',
  password: 'lauRamaRiia1',
  port: 5432,
});

const getUsersAccounts = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM useraccount JOIN emailmanagment ON useraccount.username = emailmanagment.username', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
    })
  }) 
}

const getFreeMembership = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM freemembership', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
  })
}) 
}

const createUserAccount = (body) => {
  return new Promise(function(resolve, reject) {
    const { username, password, type } = body
    pool.query('INSERT INTO useraccount VALUES ($1, $2, $3)', [username, password, type], (error, results) => {
      if (error) {
        reject(error)
        console.log(error)
      }
      resolve('A new account has been added', results)
    })
  })
}

const getAccountManager = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM accountmanager', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
  })
}) 
}

const updateAccountManager = (body) => {
  return new Promise(function(resolve, reject) {
    const { actualTrack, actualUsername, songName } = body
    
    pool.query("UPDATE accountmanager SET tracks = " + actualTrack + " WHERE username = '"+ actualUsername +"' AND song = '" + songName + "'", (error, results) => {
      
      if (error) {
        reject(error)
      }
      resolve('Account Manager has been updated')
  })
}) 
}

const createAccountManager = (body) => {
  return new Promise(function(resolve, reject) {
    const { actualUsername, songName, songArtist, actualDate, actualTrack } = body
    pool.query('INSERT INTO accountmanager VALUES ($1, $2, $3, $4, $5)', [actualUsername, songName, songArtist, actualDate, actualTrack], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve('A new account manager has been added', results)
    })
  })
}

const getSongs = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM songs', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
  })
}) 
}

const updateFreeMembershipDay = (body) => {
  console.log(body)
  return new Promise(function(resolve, reject) {
    const { actualUsername, actualDateFree, actualTrackFree } = body
    
    pool.query("UPDATE freemembership SET tracks = " + actualTrackFree + " WHERE username = '"+ actualUsername +"' AND dateTime = '" + actualDateFree + "'", (error, results) => {
      
      if (error) {
        reject(error)
      }
      resolve('Free Membership has been updated')
  })
}) 
}

const createFreeMembershipDay = (body) => {
  console.log(body)
  return new Promise(function(resolve, reject) {
    const { actualUsername, actualDateFree, actualTrackFree } = body
    pool.query('INSERT INTO freemembership VALUES ($1, $2, $3)', [actualUsername, actualDateFree, actualTrackFree], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve('Free membership has been added', results)
    })
  })
}


module.exports = {
  getUsersAccounts,
  createUserAccount,
  getSongs,
  getAccountManager,
  updateAccountManager,
  createAccountManager,
  updateFreeMembershipDay,
  createFreeMembershipDay,
  getFreeMembership
}