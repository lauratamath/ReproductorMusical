const Pool  = require('pg').Pool 
const pool = new Pool ({
  user: 'postgres',
  host: 'localhost',
  database: 'proyecto',
  password: 'Benjamin1',
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
    pool.query("SELECT * FROM useraccount JOIN freemembership ON useraccount.username = freemembership.username WHERE type = 'Free'", (error, results) => {
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

const updateUserAccount = (body) => {
  return new Promise(function(resolve, reject) {
    const { actualType, actualUsername } = body
    pool.query("UPDATE useraccount SET type= $1 WHERE username = $2", [actualType, actualUsername], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve('User Membership has been updated')
    })
}) 
}

const createPremiumMembership = (body) => {
  return new Promise(function(resolve, reject) {
    const { actualUsername, actualDate, actualMethod } = body

    pool.query("INSERT INTO premiummembership VALUES ($1, $2, $3)", [actualUsername, actualDate, actualMethod], (error, results) => {
      if (error) {
        reject(error)
      }
    })
}) 
}

const getPremiumMembership = () => {
  return new Promise(function(resolve, reject) {
    pool.query("SELECT * FROM useraccount JOIN premiummembership ON useraccount.username = premiummembership.username JOIN emailmanagment  ON useraccount.username = emailmanagment.username", (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
  })
}) 
}

const createCreatorsMembership = (body) => {
  return new Promise(function(resolve, reject) {
    const { actualUsername, actualDate, actualMethod, artist, actualType, income} = body

    pool.query("INSERT INTO creatorsmembership VALUES ($1, $2, $3, $4, $5, $6)", [actualUsername, actualDate, actualMethod, artist, actualType, income], (error, results) => {
      if (error) {
        reject(error)
      }
    })
}) 
}

const getCreatorsMembership = () => {
  return new Promise(function(resolve, reject) {
    pool.query("SELECT * FROM useraccount JOIN creatorsmembership ON useraccount.username = creatorsmembership.username JOIN emailmanagment  ON useraccount.username = emailmanagment.username", (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
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
  getFreeMembership,
  updateUserAccount,
  createPremiumMembership,
  createCreatorsMembership,
  getCreatorsMembership,
  getPremiumMembership
}