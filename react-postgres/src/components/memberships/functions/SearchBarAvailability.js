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
      paddingLeft: '10px'
    }
    return <input type='text' onChange={onChange} style={style} placeholder='artist, song, gender, or album'/>
  }

const Buttons = ({ActivateSong, DeleteSong, InactivateSong}) => {
    const style = {
        position: 'absolute',
        right: '0px',
        top: '10px'
    }

    const styleButton = {
        width: '70px',
        height: '50px'
    }
    return <div style={style}>
        <button style={styleButton} onClick={ActivateSong}>Activate</button>
        <button style={styleButton} onClick={InactivateSong}>Inactivate</button>
        <button style={styleButton} onClick={DeleteSong}>Delete</button>
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

const SongSearched = ({artistName, songName, songDuration}) => { 
    const style2 = {
        display: 'block',
        alignItems: 'center',
        justifyContent: 'center'
    }

    return <div style={style2}>
            <h4>{artistName}</h4>
            <h5>{songName}</h5>
            <h6>{songDuration}</h6>
        </div>
}

const SearchBarAvailability = () => {
    const [search, setSearch] = useState('')
    const [songs, setSongs] = useState([])
    const [completeResults, setResults] = useState([])
    const [editInfo, setEditInfo] = useState({artist: '', song: '', album: '', duration:'', release:'', gender:''})
    const [showError, setShowError] = useState('')
    
    useEffect(() => {
        getSongs();
        searchSong();
    }, []);

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
                    results.push(a)
                }
            }
          } catch (e) {}

          setResults(results)
    }

    function DeleteSong (actualArtist, actualSong) {
        fetch('http://localhost:3001/songs', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({actualArtist, actualSong}),
                }).then(response => {
                return response.text();
            });
            setShowError('Correctly deleted! Refresh page to see changes')
        
    } 
    
    function InactivateSong (actualArtist, actualSong) {
        const availability = 'False'
        fetch('http://localhost:3001/songsAvailability', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({availability, actualArtist, actualSong}),
                }).then(response => {
                return response.text();
            });
            setShowError('Correctly inactivated! Refresh page to see changes')
    } 

    function ActivateSong (actualArtist, actualSong) {
        const availability = 'True'
        fetch('http://localhost:3001/songsAvailability', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({availability, actualArtist, actualSong}),
                }).then(response => {
                return response.text();
            });
            setShowError('Correctly activated! Refresh page to see changes')
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
                        songRelease={songs[result].release}
                        songDuration={songs[result].duration}
                        songGender={songs[result].gender}
                        />  
                 <Buttons 
                    ActivateSong = {() =>
                    ActivateSong(songs[result].artist, songs[result].song)}
                    DeleteSong= {() =>
                    DeleteSong(songs[result].artist, songs[result].song)}
                    InactivateSong = {() =>
                    InactivateSong(songs[result].artist, songs[result].song)}/> 
                 
                </div>
            })}

            <Error error={showError}/>

        </div>
    )
}
export default SearchBarAvailability;