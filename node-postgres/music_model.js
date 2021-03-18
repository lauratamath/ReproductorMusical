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
    const { actualTrack, actualUsername, songName, actualDate } = body
    
    pool.query("UPDATE accountmanager SET tracks = " + actualTrack + " WHERE username = '"+ actualUsername +"' AND song = '" + songName + "' AND datetime ='" + actualDate + "'", (error, results) => {
      
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

const getAllSongs = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM songs', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
  })
}) 
}

const getSongs = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM songs WHERE availability=True', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
  })
}) 
}

const createSong = (body) => {
  return new Promise(function(resolve, reject) {
    const { artist, gender, album, song, duration, release } = body
    pool.query("INSERT INTO songs VALUES ($1, $2, $3, $4, $5, $6, True)", [artist, gender, album, song, duration, release], (error, results) => {
      
      if (error) {
        reject(error)
      }
      resolve('Song has been created')
  })
}) 
}

const createSpotifySong = (body) => {
  return new Promise(function(resolve, reject) {
    const { artist, gender, album, song, duration, release, url } = body
    pool.query("INSERT INTO songs VALUES ($1, $2, $3, $4, $5, $6, True, $7)", [artist, gender, album, song, duration, release, url], (error, results) => {
      
      if (error) {
        reject(error)
      }
      resolve('Song has been created')
  })
}) 
}

const updateSong = (body) => {
  return new Promise(function(resolve, reject) {
    const { artist, gender, album, song, duration, release, actualArtist, actualSong} = body
    pool.query("UPDATE songs SET artist=$1, gender=$2, album=$3, song=$4, duration=$5, release=$6, availability=$7 WHERE artist=$7 AND song=$8", [artist, gender, album, song, duration, release, actualArtist, actualSong], (error, results) => {
      
      if (error) {
        reject(error)
      }
      resolve('Song has been updated')
  })
}) 
}


const songAvailability = (body) => {
  return new Promise(function(resolve, reject) {
    const { availability, actualArtist, actualSong} = body
    pool.query("UPDATE songs SET availability=$1 WHERE artist=$2 AND song=$3", [availability, actualArtist, actualSong], (error, results) => {
      
      if (error) {
        reject(error)
      }
      resolve('Song has been updated')
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

const deleteCreatorsMembership = (body) => {
  const { actualUsername } = body

  return new Promise(function(resolve, reject) {
    pool.query("DELETE FROM creatorsmembership WHERE username= $1", [actualUsername], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve('CREATORS MEMBERSHIP ELIMINADO');
  })
}) 
}

const deleteSong = (body) => {
  const { actualArtist, actualSong } = body
  return new Promise(function(resolve, reject) {
    pool.query("DELETE FROM accountmanager WHERE artist= $1 AND song= $2", [actualArtist, actualSong], (error, results) => {
      if (error) {
        reject(error)
      }
    })    
    pool.query("DELETE FROM playlist WHERE artist= $1 AND song=  $2", [actualArtist, actualSong], (error, results) => {
      if (error) {
        reject(error)
      }
    })    
    pool.query("DELETE FROM songs WHERE artist= $1 AND song= $2", [actualArtist, actualSong], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve('song deleted');
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
  getPremiumMembership,
  deleteCreatorsMembership,
  createSong,
  updateSong,
  deleteSong,
  songAvailability,
  getAllSongs,
  createSpotifySong
}