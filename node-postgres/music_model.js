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

const getPlaylists = () => {
  return new Promise(function(resolve, reject) {
    pool.query("SELECT * FROM playlist JOIN songs ON playlist.song = songs.song AND playlist.artist = songs.artist", (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
  })
  })  
}

const createPlaylist = (body) => {
  return new Promise(function(resolve, reject) {
    const { actualUsername, playlistname, song, artist } = body
    console.log(body)
    pool.query('INSERT INTO playlist VALUES ($1, $2, $3, $4)', [actualUsername, playlistname, song, artist], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve('A new playlist has been added', results)
    })
  })
}

const createUserAccount = (body) => {
  return new Promise(function(resolve, reject) {
    const { username, password, type, dateSubscribed } = body
    pool.query('INSERT INTO useraccount VALUES ($1, $2, $3, $4)', [username, password, type, dateSubscribed], (error, results) => {
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

const getMostActiveUsers = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT username, SUM(tracks) FROM accountmanager GROUP BY username  ORDER BY SUM(tracks) desc', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
  })
}) 
}

const getAlbumsReleases = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT EXTRACT(YEAR FROM release) as anio, EXTRACT(MONTH FROM release) as mes, album FROM songs GROUP BY anio, mes, album ORDER BY anio desc', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
  })
}) 
}

const getMostPopularArtists = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT artist, EXTRACT(MONTH FROM datetime) as mes, EXTRACT(YEAR FROM datetime) as anio, SUM(tracks) FROM accountmanager GROUP BY artist, mes, anio ORDER BY SUM(tracks) desc', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
  })
}) 
}

const getMostPopularGenders = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT gender, SUM(tracks) FROM accountmanager JOIN songs ON songs.artist = accountmanager.artist AND songs.song = accountmanager.song GROUP BY gender  ORDER BY SUM(tracks) desc', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
  })
}) 
}

const getArtistsSongsCount = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT artist, COUNT(song) from songs GROUP BY artist ORDER BY COUNT(song) desc', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
  })
}) 
}

const getMensualSubscription = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT EXTRACT(MONTH FROM dateSubscribed) as mes, EXTRACT(YEAR FROM dateSubscribed) as anio, COUNT(username) FROM useraccount GROUP BY (mes, anio) ORDER BY mes, anio desc', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
  })
}) 
}


const updateAccountManager = (body) => {
  return new Promise(function(resolve, reject) {
    const { actualTrack, actualUsername, songName, songArtist, actualDate } = body
    console.log(body)
    
    pool.query("UPDATE accountmanager SET tracks = $1 WHERE username = $2 AND song = $3 AND artist = $4 AND datetime = $5", [actualTrack, actualUsername, songName, songArtist, actualDate], (error, results) => {
      
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
  createSpotifySong,
  getPlaylists,
  createPlaylist,
  getMostActiveUsers,
  getAlbumsReleases,
  getMostPopularArtists,
  getMostPopularGenders,
  getArtistsSongsCount,
  getMensualSubscription
}