import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import './reports.css';
import icono from './images/playlist.png';

const Button = ({onClick, text}) => {
  const style = {
    color: '#FFFFFF'
  }
  return <button onClick={onClick} style={style} className = 'botonesHL'>{text}</button>
}

const SongReleased = ({artistName, count}) => {
  const style = {
    color: '#FFFFFF',
    fontFamily: 'Candara',
    alignContent: 'left',
    margin: '4px',
  }

    return <div style={style}>
      <div>Artist: {artistName}</div>
      <div>Total songs: {count}</div>
      <div> <br/> </div>
      </div>
}

const SongsCount = () => {
  const history = useHistory()
  const [totalSongs, setTotalSongs] = useState([])
    
    useEffect(() => {
        getTotalSongs();
    }, []);

    async function getTotalSongs() {
      const json = await fetch('http://localhost:3001/songsCount')
        .then(response => response.json())
  
      setTotalSongs(json)
    }

    return (
    <div>
        <button onClick={() => history.push('../reports')} div className ='back'>
          <font color = '#FFFFFF' face='Candara' size = '6'>
            ←
          </font>
        </button>
        <Button onClick={() => history.push('../../admin')} text='Home'/>
        <Button onClick={() => history.push('../../')} text='Log Out'/>
        <br/><br/><br/><br/>
        <h1>
          <font color = '#FFFFFF' face='Candara'>
            &nbsp; &nbsp;
            Artists musical production
          </font>
        </h1>
        <br/><br/><br/><br/>
        <center>
          <br/><br/><br/>
          {totalSongs.map((result) => {
                  return <SongReleased artistName={result.artist} 
                          count={result.count}/>
            })}
          <img class="iconos" src={icono} ondblclick="javascript:this.width=50;this.height=115" width="100"/>
          </center>
    </div>
  );
}
export default SongsCount;