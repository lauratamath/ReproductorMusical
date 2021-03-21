import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import PlaySong from '../functions/PlaySong';
import './FreeAccount.css';

const Button = ({onClick, text}) => {
  const style = {
    color: '#FFFFFF'
  }
  return <button onClick={onClick} style={style} className = 'botonesFree'>{text}</button>
}

const SongSearched = ({artistName, songName, songDuration, songUrl}) => { 
  const style = {
      display: 'flex',
      width: '400px',
      height: '100px',
      lineHeight: '0px',
      position: 'relative',
      float: 'center',
      whiteSpace: 'nowrap',
      margin: '0px auto'
  }


  return <div style={style}>
          <div>
              <h4 align ='left'>
                  <font color = '#FFFFFF' face='Candara'>
                      <b>
                      {artistName}
                      </b>
                  </font>
              </h4>
              <h5>
                  <font color = '#8C8C8C' face='Candara'>
                      {songName}
                  </font>
              </h5>
              <h6 align ='left'>
                  <font color = '#8C8C8C' face='Candara'>
                      {songDuration}
                  </font>
              </h6>
          </div>
         <PlaySong songArtist={artistName} songName={songName} songUrl={songUrl}/>
      </div>
}



const PlaylistInfo = () => {
  const history = useHistory()
  const [playlists, setPlaylists] = useState([])
  const actualPlaylist = localStorage.getItem('actualPlaylist')
  const actualUsername = localStorage.getItem('actualUsername')

  useEffect(() => {
    getPlaylist();
  }, []);

  async function getPlaylist() {
    var temporary = []
    const json = await fetch('http://localhost:3001/playlists')
      .then(response => response.json())

    if(json.length>0){
      for(var a=0; a<json.length; a++){
        if(json[a].username === actualUsername && json[a].playlistname === actualPlaylist) {
          temporary.push(json[a])
        }
      }
    }
    setPlaylists(temporary)
  }

    return (
    <div>
        <Button onClick={() => history.push('../../home')} text='Log Out'/>
        <Button onClick={() => history.push('../../premium')} text='Home'/>
        <Button onClick={() => history.push('../playlists')} text='Playlists'/>
        

        <h1>
          <font color = '#FFFFFF' face='Candara'>
            <b>
              <br/>
              &nbsp;  &nbsp; 
              Actual playlist: {actualPlaylist}
              <br/><br/>
            </b>
          </font>
        </h1>

        {playlists.map((result) => {
                return <SongSearched artistName={result.artist} 
                        songName={result.song} 
                        songDuration={result.duration}
                        songUrl={result.url}/>  
         })}

    </div>
  );
}
export default PlaylistInfo;