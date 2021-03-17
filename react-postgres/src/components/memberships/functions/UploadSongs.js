import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";

const Button = ({onClick, text}) => {
  return <button onClick={onClick}>{text}</button>
}

const Input = ({type, onChange, name}) => { 
    const style = {
      display: 'block'
    }
    return <input type={type} onChange={onChange} style={style} name={name}/>
}

const Error = ({error}) => {
    const style = {
      color: 'red'
    }
    return <h5 style={style}>{error}</h5> 
  }


const actualUsername = localStorage.getItem('actualUsername')
const UploadSongs = () => {
  const history = useHistory()
  const [showError, setShowError] = useState('')
  const [creators, setCreators] = useState([])
  const [songInfo, setSongInfo] = useState({gender: '', album: '', song: '', duration: 0.00, release: ''})

  useEffect(() => {
    getCreatorsMembership();
  }, []);

  const handleChange = (event) => {
    setSongInfo({
      ...songInfo,
      [event.target.name] : event.target.value
    })
  } 

  function getCreatorsMembership() {
    fetch('http://localhost:3001/creatorsmembership')
      .then(r => r.json())
      .then(r => setCreators(r))
  }

  function createSong() {
    const artist = creators[creators.map(({ username }) => username).indexOf(actualUsername)].artist
    var error = ''

    if ((songInfo.gender === '') || (songInfo.album === '') ||  (songInfo.song === '') || (songInfo.duration === 0) || (songInfo.release === '')){
        error = 'Fill all the form'
    }

    if (error === ''){
      const gender = songInfo.gender
      const album = songInfo.album
      const song = songInfo.song
      const duration = parseFloat(songInfo.duration)
      const release = songInfo.release

      fetch('http://localhost:3001/songs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({artist, gender, album, song, duration, release}),
        }).then(response => {
          return response.text();
        });
    }

    setShowError(error)
  }

    return (
    <div>
        <Button onClick={() => history.push('../creator')} text='Home'/>
        <Button onClick={() => history.push('../../home')} text='Log Out'/>

        <h1>Pantalla principal subir musica</h1>

        <label>Gender</label>
        <Input type='text' onChange={handleChange} name='gender'/>

        <label>Song name</label>
        <Input type='text' onChange={handleChange} name='song'/>

        <label>Album name</label>
        <Input type='text' onChange={handleChange} name='album'/>

        <label>Duration</label>
        <Input type='number' onChange={handleChange} name='duration'/>

        <label>Release date</label>
        <input type="date" onChange={handleChange} name="release"/>

        <Error error={showError}/>
        <Button onClick={createSong} text='Submit Song'/>
    </div>
  );
}
export default UploadSongs;