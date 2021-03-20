import React, {useState, useEffect} from 'react';
import PlaySong from './PlaySong'
import { useHistory } from "react-router-dom";
import './FreeAccount.css';


const Button = ({onClick, text}) => {
  const style = {
    color: '#FFFFFF'
  }
  return <button onClick={onClick} style={style} className = 'botonesFree'>{text}</button>
}

const Album = ({onClick, text}) => {
    return <button onClick={onClick}>{text}</button>
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
                if(r[a].username === actualUsername) {
                    temporary.push(r[a])
                    setPlaylists(temporary)
                }
            }
        })
    }

    const getInfo = ({result}) => {

       localStorage.setItem('actualPlaylist', result.playlistname)
        console.log('pasa')
        history.push('playlists/playlistInfo')
    }

    return (
    <div>
        <Button onClick={() => history.push('../../home')} text='Log Out'/>
        <Button onClick={() => history.push('../premium')} text='Home'/>
        

        <h1>
          <font color = '#FFFFFF' face='Candara'>
            <b>
              &nbsp;  &nbsp; 
              Playlists
              <br/><br/>
            </b>
          </font>
        </h1>

        {playlists.map((result) => {
                return <Album text={result.playlistname} 
                onClick={() => getInfo({result})}/>
        })}

    </div>
  );
}
export default Playlist;