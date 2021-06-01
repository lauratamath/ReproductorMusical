const Pool  = require('pg').Pool 
const pool = new Pool ({
  user: 'postgres',
  host: 'localhost',
  database: 'proyecto',
  //password: 'Benjamin1',
  //password: 'lauRamaRiia1',
  password: 'Sandalias00',
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

const deactivateFreeMembership = (body) => {
  const {username, availability} = body
  return new Promise(function(resolve, reject) {
    pool.query("UPDATE freemembership SET availability = $1 WHERE username = $2", [availability, username], (error, results) => {
      if (error) {
        reject(error)
      }
    })
  })  
}

const getSubscriptions = () => {
  return new Promise(function(resolve, reject) {
    pool.query("SELECT * FROM useraccount WHERE type <> 'Free'", (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
  })
  })  
}

const updateSubscription = (body) => {
  const {username} = body

  return new Promise(function(resolve, reject) {
    pool.query("UPDATE useraccount SET type = 'Free' WHERE username = $1", [username], (error, results) => {
      if (error) {
        reject(error)
        setActualUsername(username)
      }
  })
  })  
}

const getPlaylists = () => {
  return new Promise(function(resolve, reject) {
    pool.query("SELECT * FROM playlist JOIN songs ON playlist.song = songs.song AND playlist.artist = songs.artist WHERE availability = True", (error, results) => {
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
    pool.query('INSERT INTO playlist VALUES ($1, $2, $3, $4)', [actualUsername, playlistname, song, artist], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve('A new playlist has been added', results)
      setActualUsername(actualUsername)
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
      setActualUsername(username)
    })
  })
}

const createEmailManagment = (body) => {
  return new Promise(function(resolve, reject) {
    const { username, email } = body
    pool.query('INSERT INTO emailmanagment VALUES ($1, $2)', [username, email], (error, results) => {
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
    pool.query('SELECT EXTRACT(YEAR FROM release) as anio, EXTRACT(WEEK FROM release) as semana, album, artist FROM songs GROUP BY anio, semana, album, artist ORDER BY anio desc, semana desc', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
  })
}) 
}

const getSalesPerWeek = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM salesperweek', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
  })
}) 
}

const getSalesPerGenre = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM salespergenre', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
  })
}) 
}

const getMostSelledArtists = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM mostselledartists', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
  })
}) 
}

const getTopSongs = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM topsongs', (error, results) => {
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
    pool.query('SELECT EXTRACT(MONTH FROM dateSubscribed) as mes, EXTRACT(YEAR FROM dateSubscribed) as anio, COUNT(username) FROM useraccount GROUP BY (mes, anio) ORDER BY anio desc, mes desc', (error, results) => {
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
    
    pool.query("UPDATE accountmanager SET tracks = $1 WHERE username = $2 AND song = $3 AND artist = $4 AND datetime = $5", [actualTrack, actualUsername, songName, songArtist, actualDate], (error, results) => {
      
      if (error) {
        reject(error)
      }
      resolve('Account Manager has been updated')
  })
}) 
}

const getAccountManagerPerDate = (body) => {
  return new Promise(function(resolve, reject) {
    const { date } = body
    pool.query('SELECT SUM(tracks) AS tracks, username, song, artist FROM accountmanager WHERE datetime < $1::date GROUP BY username, song, artist', [date], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  })  
}

const getRecommendation = (body) => {
  return new Promise(function(resolve, reject) {
    const { similarTo } = body
    pool.query('SELECT artist, song FROM ( SELECT gender FROM songs WHERE song=$1 ) n1 JOIN songs ON n1.gender = songs.gender', [similarTo], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
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
    const { actualUsername, artist, gender, album, song, duration, release } = body
    pool.query("INSERT INTO songs VALUES ($1, $2, $3, $4, $5, $6, True)", [artist, gender, album, song, duration, release], (error, results) => {
      
      if (error) {
        reject(error)
      }
      setActualUsername(actualUsername)
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

      setActualUsername('From API')
      resolve('Song has been created')
  })
}) 
}

const createSpotifyAlbum = (body) => {
  return new Promise(function(resolve, reject) {
    const { artist, album } = body
    pool.query("INSERT INTO albums VALUES (DEFAULT, $1, $2, True)", [album, artist], (error, results) => {
      
      if (error) {
        reject(error)
      }

      setActualUsername('From API')
      resolve('Album has been created')
  })
}) 
}

const updateSong = (body) => {
  return new Promise(function(resolve, reject) {
    
    const { actualUsername, artist, gender, album, song, duration, release, availability, actualArtist, actualSong} = body

    pool.query("UPDATE songs SET artist=$1, gender=$2, album=$3, song=$4, duration=$5, release=$6, availability=$7 WHERE artist=$8 AND song=$9", [artist, gender, album, song, duration, release, availability, actualArtist, actualSong], (error, results) => {
      if (error) {
        reject(error)}
    })
    pool.query("UPDATE playlist SET artist=$1, song=$2 WHERE artist=$3 AND song=$4", [artist, song, actualArtist, actualSong], (error, results) => {
      if (error) {
        reject(error)
        
      }
    })
    pool.query("UPDATE accountmanager SET artist=$1, song=$2 WHERE artist=$3 AND song=$4", [artist, song, actualArtist, actualSong], (error, results) => {
      if (error) {
        reject(error)
      }
    })
    
    setActualUsername(actualUsername)
  }) 
}

const updateAlbum = (body) => {
  return new Promise(function(resolve, reject) {
    
    const { actualUsername, artist, album, actualArtist, actualAlbum } = body

    pool.query("UPDATE albums SET artist=$1, album=$2 WHERE artist=$3 AND album=$4", [artist, album, actualArtist, actualAlbum], (error, results) => {
      if (error) {
        reject(error)}
    }) 
    
    pool.query("UPDATE songs SET artist=$1, album=$2 WHERE artist=$3 AND album=$4", [artist, album, actualArtist, actualAlbum], (error, results) => {
      if (error) {
        reject(error)}
    })

    setActualUsername(actualUsername)
  }) 
}

const songAvailability = (body) => {
  return new Promise(function(resolve, reject) {
    const { actualUsername, availability, actualArtist, actualSong} = body
    pool.query("UPDATE songs SET availability=$1 WHERE artist=$2 AND song=$3", [availability, actualArtist, actualSong], (error, results) => {
      
      if (error) {
        reject(error)
      }
      resolve('Song has been updated')

      setActualUsername(actualUsername)
  })
}) 
}

const albumAvailability = (body) => {
  return new Promise(function(resolve, reject) {
    const { actualUsername, availability, actualArtist, actualAlbum } = body
    pool.query("UPDATE songs SET availability=$1 WHERE artist=$2 AND album=$3", [availability, actualArtist, actualAlbum], (error, results) => {
      if (error) {
        reject(error)
      }
    }) 

    pool.query("UPDATE albums SET availability=$1 WHERE artist=$2 AND album=$3", [availability, actualArtist, actualAlbum], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve('Album has been updated')    
      setActualUsername(actualUsername)
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
    pool.query('INSERT INTO freemembership VALUES ($1, $2, $3, True)', [actualUsername, actualDateFree, actualTrackFree], (error, results) => {
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
        setActualUsername(username)
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

const deactivateCreator = (body) => {
  const { artisticName, availability, username } = body

  return new Promise(function(resolve, reject) {
    pool.query("UPDATE songs SET availability=$1 WHERE artist=$2", [availability, artisticName], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
  })
  return new Promise(function(resolve, reject) {
    pool.query("UPDATE creatorsmembership SET availability = $1 WHERE username = $2", [availability, username], (error, results) => {
      if (error) {
        reject(error)
      }
    })
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
  const { actualUsername, actualArtist, actualSong } = body
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

      setActualUsername(actualUsername)
      resolve('song deleted');
      
    })
}) 
}

const getPossibleMonitors = () => {
  return new Promise(function(resolve, reject) {
    pool.query("SELECT * FROM useraccount WHERE type = 'Premium' OR type = 'Free'", (error, results) => {
      if (error) {
        reject(error)
      }
      
      resolve(results.rows)
    })
  })  
}

const getMonitorMembership = () => {
  return new Promise(function(resolve, reject) {
    pool.query("SELECT * FROM monitorMembership  ", (error, results) => {
      if (error) {
        reject(error)
      }

      resolve(results.rows)
    })
  })  
}

const getMonitorsFeatures = () => {
  return new Promise(function(resolve, reject) {
    pool.query("SELECT * FROM monitorFeature", (error, results) => {
      if (error) {
        reject(error)
      }

      resolve(results.rows)
    })
  })  
}

const createMonitor = (body) => {
  return new Promise(function(resolve, reject) {
    const { monitorName } = body

    pool.query("INSERT INTO monitorMembership VALUES (DEFAULT, $1)", [monitorName], (error, results) => {
      if (error) {
        reject(error)
      }
    })
}) 
}

const createMonitorFeature = (body) => {
  return new Promise(function(resolve, reject) {
    const { monitorName, idFeature } = body
    pool.query("INSERT INTO monitorManager VALUES ($1, $2, True)", [monitorName, idFeature], (error, results) => {
      if (error) {
        reject(error)
      }
    })
}) 
}

const createMonitorMembership = (body) => {
  const { username, monitorName } = body
  return new Promise(function(resolve, reject) {
    pool.query("UPDATE useraccount SET type = 'Monitor' WHERE username = $1", [username], (error, results) => {
      if (error) {
        reject(error)
      }
    })
    
    pool.query("INSERT INTO monitorType VALUES ($1, $2)", [username, monitorName], (error, results) => {
      if (error) {
        reject(error)
      }
    })
  }) 
}

const getMonitorAccess = (body) => {
  const { actualUsername } = body
  
  return new Promise(function(resolve, reject) {
    pool.query("SELECT * FROM monitortype  JOIN monitormembership ON monitortype.idmonitor = monitormembership.idmonitor JOIN monitormanager ON monitormembership.namemonitor = monitormanager.namemonitor JOIN monitorfeature ON monitorfeature.idfeature = monitormanager.idfeature WHERE username = $1", [actualUsername], (error, results) => {
      if (error) {
        reject(error)
      }

      resolve(results.rows)
    })
  })  
}

const setActualUsername = (actualUsername) => {
  try {
    if (actualUsername.actualUsername !== undefined) {
      actualUsername = actualUsername.actualUsername
    }
  } catch (error) {}

  return new Promise(function(resolve, reject) {
    pool.query("SELECT updateUsernameInManagement($1)", [actualUsername], (error, results) => {
      if (error) {
        reject(error)
      }
    })
  })  
}

const getBitacora = () => {
  return new Promise(function(resolve, reject) {
    pool.query("SELECT * FROM updatemanagement", (error, results) => {
      if (error) {
        reject(error)
      }

      resolve(results.rows)
    })
  })  
}

module.exports = {
  url: "mongodb://localhost:27017/usernamesRep",
  getBitacora,
  setActualUsername,
  getMonitorAccess,
  deactivateFreeMembership,
  getUsersAccounts,
  createUserAccount,
  getSongs,
  getAccountManager,
  getAccountManagerPerDate,
  updateAccountManager,
  createAccountManager,
  createEmailManagment,
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
  updateAlbum,
  deleteSong,
  songAvailability,
  albumAvailability,
  getAllSongs,
  createSpotifySong,
  createSpotifyAlbum,
  getPlaylists,
  createPlaylist,
  getMostActiveUsers,
  getMostSelledArtists,
  getAlbumsReleases,
  getSalesPerWeek,
  getSalesPerGenre,
  getTopSongs,
  getMostPopularArtists,
  getMostPopularGenders,
  getArtistsSongsCount,
  getMensualSubscription,
  getSubscriptions,
  updateSubscription,
  deactivateCreator,
  getPossibleMonitors,
  getMonitorsFeatures,
  createMonitor,
  createMonitorFeature,
  getMonitorMembership,
  createMonitorMembership,
  getRecommendation
}