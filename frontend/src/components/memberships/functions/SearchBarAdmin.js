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
      fontFamily: 'Candara'

    }
    return <input type='text' onChange={onChange} style={style} placeholder='artist, song, gender, or album'/>
  }

const Edit = ({onClick}) => {
    const styleButton = {
        width: '50px',
        height: '50px',
        position: 'absolute',
        right: '0px',
        top: '25px',
        color: '#FFFFFF',
    }
    return <button style={styleButton} onClick={onClick} className='editar'>🖍</button>
}

const style = {
    display: 'flex',
    width: '300px',
    height: '200px',
    lineHeight: '0px',
    position: 'relative',
    float: 'center',
    whiteSpace: 'nowrap',
    margin: '0px auto',
}


const SongSearched = ({artistName, songName, songAlbum, songDuration, songRelease, songGender, onChange}) => { 
    const style2 = {
        display: 'block',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFFFF',

    }


    return <div>
            <input style={style2} className ='inpb' type='text' placeholder={artistName} onChange={onChange} name='artist'/>
            <input style={style2} className ='inpb' type='text' placeholder={songName} onChange={onChange} name='song'/>
            <input style={style2} className ='inpb' type='text' placeholder={songGender} onChange={onChange} name='gender'/>
            <input style={style2} className ='inpb' type='text' placeholder={songAlbum} onChange={onChange} name='album'/>
            <input style={style2} className ='inpb' type='date' placeholder={songRelease} onChange={onChange} name='release'/>
            <input style={style2} className ='inpb' type='number' placeholder={songDuration} onChange={onChange} name='duration'/>   
        </div>
}

const SearchBarAdmin = () => {
    const [search, setSearch] = useState('')
    const [songs, setSongs] = useState([])
    const [completeResults, setResults] = useState([])
    const [editInfo, setEditInfo] = useState({artist: '', song: '', album: '', duration:'', release:'', gender:''})
    const [showError, setShowError] = useState('')
    const actualUsername = localStorage.getItem('actualUsername')
    
    useEffect(() => {
        getSongs();
        searchSong();
    }, []);

    const handleChangeEdit = (event) => {
        setEditInfo({
          ...editInfo,
          [event.target.name] : event.target.value
        })
        
      } 
      
    function getSongs() {
        fetch('http://localhost:3001/songs')
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

    function EditSong (actualArtist, actualSong, actualAlbum, actualRelease, actualDuration, actualGender) {
        var artist = editInfo.artist
        var gender = editInfo.gender
        var album = editInfo.album
        var song = editInfo.song
        var duration = parseFloat(editInfo.duration)
        var release = editInfo.release
        const availability = 'True'

        if(artist!==''||gender!==''||album!==''||song!==''||editInfo.duration!==''||release!==''){
            if(editInfo.duration===''){
                duration = parseFloat(actualDuration)
            }
            if(editInfo.release===''){
                release = actualRelease
            }
            if(editInfo.song===''){
                song = actualSong
            }
            if(editInfo.album===''){
                album = actualAlbum
            }
            if(editInfo.gender===''){
                gender = actualGender
            }
            if(editInfo.artist===''){
                artist = actualArtist
            }
            //Si modifica el nombre del artista o el nombre del album
            if (editInfo.album !== '' || editInfo.artist !== '') {
                fetch('http://localhost:3001/albumArtist', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({actualUsername, artist, album, actualArtist, actualAlbum}),
                        }).then(response => {
                        return response.text();
                    }).then(response => {
                        getSongs()
                        
                    })
            } 
            fetch('http://localhost:3001/songs', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({actualUsername, artist, gender, album, song, duration, release, availability, actualArtist, actualSong}),
                }).then(response => {
                return response.text();
            }).then(response => {
                getSongs()
                
            })  
            setShowError('Correctly edited! Refresh page to see changes')
        } else {
            setShowError('Nothing to edit')
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
                        songRelease={songs[result].release}
                        songDuration={songs[result].duration}
                        songGender={songs[result].gender}
                        onChange={handleChangeEdit}
                        />  
                       <Edit onClick= {() => EditSong(songs[result].artist, songs[result].song, songs[result].album, songs[result].release, songs[result].duration, songs[result].gender)}/> 
                    </div>
            })}

            <Error error={showError}/>

        </div>
    )
}
export default SearchBarAdmin;