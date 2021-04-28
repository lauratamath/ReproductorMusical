import React, {useState, useEffect} from 'react';
import './Search.css';

const Error = ({error}) => {
    const style = {
      color: 'red'
    }
    return <h5 style={style}>{error}</h5> 
  }

const Input = ({onChange}) => { 
    const style = {
      display: 'block',
      width: '400px',
      height: '25px',
      border: '0px',
      borderRadius: '10px',
      paddingLeft: '10px',
    }
    return <input type='text' onChange={onChange} style={style} placeholder='artist, song, gender, or album'/>
  }

const Buttons = ({Activate, DeleteSong, Inactivate}) => {
    const style = {
        position: 'absolute',
        right: '-170px',
        top: '10px',
        paddingLeft:'300px',

    }

    const styleButton = {
        width: '90px',
        height: '40px',
        color: '#FFFFFF',
        padding: '5px',

    }
    return <div style={style}>
        <button style={styleButton} onClick={Activate} className = 'set'>Activate</button>
        <button style={styleButton} onClick={Inactivate} className = 'set'>Inactivate</button>
        <button style={styleButton} onClick={DeleteSong} className = 'set'>Delete</button>
        </div>
}



const style = {
    display: 'flex',
    width: '450px',
    height: '200px',
    lineHeight: '0px',
    position: 'relative',
    float: 'center',
    whiteSpace: 'nowrap',
    margin: '0px auto'
}

const SongSearched = ({artistName, songName, songDuration, songAlbum, isAlbum}) => { 
    const style2 = {
        display: 'block',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#827C7C',
    }

    if (isAlbum) {
        return <div style={style2}>
        <h4 align ='left' >
            <font color = '#FFFFFF' face='Candara'>
                {artistName}
            </font>
        </h4>
        <h5 align ='left'>
            <font color = '#9F9A9A' face='Candara'>
                {songAlbum}
            </font>
        </h5>
        </div>
    } else {
        return <div style={style2}>
        <h4 align ='left' >
            <font color = '#FFFFFF' face='Candara'>
                {artistName}
            </font>
        </h4>
        <h5 align ='left'>
            <font color = '#9F9A9A' face='Candara'>
                {songName}
            </font>
        </h5>
        <h6 align ='left'>{songDuration}</h6>
        </div>
    }


}

const SearchBarAvailability = () => {
    const [search, setSearch] = useState('')
    const [songs, setSongs] = useState([])
    const [completeResults, setResults] = useState([])
    const [showError, setShowError] = useState('')
    const [isAlbum, setIsAlbum] = useState(false)
    const actualUsername = localStorage.getItem('actualUsername')
    
    useEffect(() => {
        getSongs();
        searchSong();
    }, [])

    function getSongs() {
        fetch('http://localhost:3001/songsAvailability')
          .then(r => r.json())
          .then(r => setSongs(r))
    }
    const handleChange = (event) => {
        setSearch(event.target.value)
    } 

    function searchSong () {
        const results = []
        try {
            for (var a=0; a<songs.length; a++) {
                setIsAlbum(false)
                if (songs[a].artist === search) {
                    results.push(a)
                }
                if (songs[a].song === search) {
                    results.push(a)
                }
                if (songs[a].gender === search) {
                    results.push(a)
                }
                if (songs[a].album === search) {
                    setIsAlbum(true)
                    results.push(a)
                    break
                }
            }
          } catch (e) {}

          setResults([...new Set(results)])
    }

    function DeleteSong (actualArtist, actualSong) {
        fetch('http://localhost:3001/songs', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({actualUsername, actualArtist, actualSong}),
                }).then(response => {
                return response.text();
            });
            setShowError('Correctly deleted! Refresh page to see changes')
        
    } 
    
    function Inactivate (actualArtist, actualSong, actualAlbum) {
        const availability = 'False'
        if (isAlbum) {
            fetch('http://localhost:3001/albumsAvailability', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({actualUsername, availability, actualArtist, actualAlbum}),
                    }).then(response => {
                    return response.text();
                });
                setShowError('Album correctly inactivated! Refresh page to see changes')            
        } else {
            fetch('http://localhost:3001/songsAvailability', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({actualUsername, availability, actualArtist, actualSong}),
                    }).then(response => {
                    return response.text();
                });
                setShowError('Song correctly inactivated! Refresh page to see changes')
        }
    } 

    function Activate (actualArtist, actualSong, actualAlbum) {
        const availability = 'True'
        if (isAlbum) {
            fetch('http://localhost:3001/albumsAvailability', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({actualUsername, availability, actualArtist, actualAlbum}),
                    }).then(response => {
                    return response.text();
                });
                setShowError('Album correctly activated! Refresh page to see changes')            
        } else {
            fetch('http://localhost:3001/songsAvailability', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({actualUsername, availability, actualArtist, actualSong}),
                }).then(response => {
                return response.text();
            });
            setShowError('Song correctly activated! Refresh page to see changes')
        }
    } 

    return (
        <div>
            <Input onChange={handleChange}/>
            <button onClick={searchSong} div className='botonSearch'>🔍</button>

            {completeResults.map((result) => {
                return <div style={style}> 
                <SongSearched artistName={songs[result].artist} 
                        songName={songs[result].song} 
                        songAlbum={songs[result].album}
                        songDuration={songs[result].duration}
                        isAlbum={isAlbum}
                        />  
                 <Buttons 
                    Activate = {() =>
                    Activate(songs[result].artist, songs[result].song, songs[result].album)}
                    DeleteSong= {() =>
                    DeleteSong(songs[result].artist, songs[result].song)}
                    Inactivate = {() =>
                    Inactivate(songs[result].artist, songs[result].song, songs[result].album)}/> 
                 
                </div>
            })}

            <Error error={showError}/>

        </div>
    )
}
export default SearchBarAvailability;