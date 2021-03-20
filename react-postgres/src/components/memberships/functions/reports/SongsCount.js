import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";

const Button = ({onClick, text}) => {
  return <button onClick={onClick}>{text}</button>
}

const SongReleased = ({artistName, count}) => {
  const style = {
    color: '#FFFFFF'
  }

    return <div style={style}>
      <div>Artist: {artistName}</div>
      <div>Total songs: {count}</div>
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
        <Button onClick={() => history.push('../reports')} text='Go Back'/>
        <Button onClick={() => history.push('../../admin')} text='Home'/>
        <Button onClick={() => history.push('../../')} text='Log Out'/>

        <h1>Pantalla principal artists musical production</h1>

        {totalSongs.map((result) => {
                return <SongReleased artistName={result.artist} 
                        count={result.count}/>  
        })}
    </div>
  );
}
export default SongsCount;