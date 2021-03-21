import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import './FreeAccount.css';

const Button = ({onClick, text}) => {
  const style = {
    color: '#FFFFFF'
  }
  return <button onClick={onClick} style={style} className = 'botonesFree'>{text}</button>
}

const Input = ({type, onChange, name}) => { 
    const style = {
      display: 'block',
      width: '160px',
      height: 's15px',
      fontFamily: 'Candara',
      fontSize: '15px'
    }
    return <input type={type} onChange={onChange} style={style} name={name}/>
}

const Error = ({error}) => {
    const style = {
      color: 'red'
    }
    return <h5 style={style}>{error}</h5> 
  }


const SongToPlaylist = () => {
  const history = useHistory()
  const [showError, setShowError] = useState('')
  const [playlists, setPlaylists] = useState([])
  const [actualPlaylist, setActualPlaylist] = useState({playlistName: ''})
  const actualUsername = localStorage.getItem('actualUsername')
  const playlistSong = localStorage.getItem('playlistSong')
  const playlistArtist = localStorage.getItem('playlistArtist')
  
  useEffect(() => {
    getPlaylist();
  }, []);

  const handleChange = (event) => {
    setActualPlaylist({
      ...actualPlaylist,
      [event.target.name] : event.target.value
    })
  } 

  function getPlaylist() {
    fetch('http://localhost:3001/playlists')
      .then(r => r.json())
      .then(r => setPlaylists(r))
}

  function addSong() {
    const pastPlaylists = playlists.map(({ playlistname }) => playlistname)
    const playlistSongs = playlists.map(({ song }) => song)
    const usernames = playlists.map(({ username }) => username)
    const song = playlistSong
    const artist = playlistArtist
    var continueFor = true
    var error = ''

    if (actualPlaylist.playlistName === ''){
        error = 'Enter the playlist name'
    }

    if (error === ''){
        for(var i=0; i<pastPlaylists.length; i++){
            if(usernames[i] === actualUsername && actualPlaylist.playlistName === pastPlaylists[i] && playlistSongs[i]===song){
                console.log('ya existe la cancion en la playlist')
                setShowError('Song already at playlist ' + actualPlaylist.playlistName)
                continueFor = false;   
                return;
            }
        }
        console.log('no existe la cancion en la playlist')

        const playlistname =  actualPlaylist.playlistName
      fetch('http://localhost:3001/playlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({actualUsername, playlistname, song, artist}),
        }).then(response => {
          return response.text();
        });
    }

    setShowError('Song Added')
  }

    return (
    <div>
        <Button onClick={() => history.push('../../home')} text='Log Out'/>
        <Button onClick={() => history.push('../premium')} text='Home'/>
        <Button onClick={() => history.push('../premium/playlists')} text='Playlists'/>
        

        <h1>
          <font color = '#FFFFFF' face='Candara'>
            <b>
              &nbsp;  &nbsp; 
              Add {playlistSong} - {playlistArtist} to playlist
              <br/><br/>
            </b>
          </font>
        </h1>

        <center>
          <label>
            <font color = '#FFFFFF' face='Candara'>
             Playlist Name<br/><br/>
            </font>
          </label>
          <Input type='text' onChange={handleChange} name='playlistName'/><br/><br/>

          <Error error={showError}/>
          <button onClick={addSong} div className ='otro'>
            <font color = '#FFFFFF' face='Candara'>
              <b>
                Add Song to Playlist
              </b>
            </font>
          </button>
        </center>

    </div>
  );
}
export default SongToPlaylist;