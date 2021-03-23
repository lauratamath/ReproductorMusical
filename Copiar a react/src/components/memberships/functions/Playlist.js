import React, {useState, useEffect} from 'react';
import PlaySong from './PlaySong'
import { useHistory } from "react-router-dom";
import './FreeAccount.css';
import iconoo from './images/disco.gif';

const Button = ({onClick, text}) => {
  const style = {
    color: '#FFFFFF'
  }
  return <button onClick={onClick} style={style} className = 'botonesFree'>{text}</button>
}

const Album = ({onClick, text}) => {
  const style ={
    color: '#FFFFFF',
  }
    return <button onClick={onClick} style={style} className ='play' >{text}</button>
}

const Playlist = () => {
  const history = useHistory()
  const [playlists, setPlaylists] = useState([])
  const actualUsername = localStorage.getItem('actualUsername')

  useEffect(() => {
    getPlaylist();
  }, []);

  async function getPlaylist() {
    var temporary = []
    await fetch('http://localhost:3001/playlists')
      .then(r => r.json())
      .then(r => { 
            for(var a=0; a<r.length; a++){
                if(r[a].username === actualUsername && !temporary.includes(r[a].playlistname)) {
                  temporary.push(r[a].playlistname)
                  
                }
            }
        })
      setPlaylists(temporary)
        
    }

    const getInfo = ({result}) => {
       localStorage.setItem('actualPlaylist', result)
        history.push('playlists/playlistInfo')
    }

    return (
    <div>
        <Button onClick={() => history.push('../../home')} text='Log Out'/>
        <Button onClick={() => history.push('../premium')} text='Home'/>
        
        <img class="iconoo" src={iconoo} ondblclick="javascript:this.width=50;this.height=115" width="100"/><br/>
        <h1>
          <font color = '#FFFFFF' face='Candara'>
            <b>
              &nbsp;  &nbsp; 
              Playlists
              <br/><br/><br/>
            </b>
          </font>
        </h1>
        <center>
        {playlists.map((result) => { 
                return <Album text={result} 
                onClick={() => getInfo({result})}/>
        })}
        </center>

    </div>
  );
}
export default Playlist;