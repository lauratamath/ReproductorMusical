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


const UploadSongs = () => {
  const history = useHistory()
  const [showError, setShowError] = useState('')
  const [creators, setCreators] = useState([])
  const [songInfo, setSongInfo] = useState({gender: 'Pop', album: '', song: '', duration: 0.00, release: ''})
  const actualUsername = localStorage.getItem('actualUsername')

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
        <Button onClick={() => history.push('../../home')} text='Log Out'/>
        <Button onClick={() => history.push('../creator')} text='Home'/>
        

        <h1>
          <font color = '#FFFFFF' face='Candara'>
            <b>
              &nbsp;  &nbsp; 
              Upload your songs
              <br/><br/>
            </b>
          </font>
        </h1>

        <center>
          <label>
            <font color = '#FFFFFF' face='Candara'>
             Song Name<br/><br/>
            </font>
          </label>
          <Input type='text' onChange={handleChange} name='song'/><br/><br/>

          <label>
            <font color = '#FFFFFF' face='Candara'>
              Gender<br/><br/>
            </font>
          </label>
          <select onChange={handleChange} name='gender'>
            <option value="Pop" >Pop</option>
            <option value="Indie">Indie</option>
            <option value="Rap" >Rap</option>
            <option value="CumbiaPop">CumbiaPop</option>
            <option value="Salsa" >Salsa</option>
            <option value="Merengue">Merengue</option>
            <option value="Tango" >Tango</option>
            <option value="Electronic">Electronic</option>
            <option value="Reggae" >Reggae</option>
            <option value="HipHop">HipHop</option>
            <option value="Techno" >Techno</option>
            <option value="House">House</option>
            <option value="Otro">Otro</option>
          </select>
          <br/><br/>

          <label>
            <font color = '#FFFFFF' face='Candara'>
              Album name<br/><br/>
            </font>
          </label>
          <Input type='text' onChange={handleChange} name='album'/><br/><br/>

          <label>
            <font color = '#FFFFFF' face='Candara'>
              Duration<br/><br/>
            </font>
          </label>
          <Input type='number' onChange={handleChange} name='duration'/><br/><br/>

          <label>
            <font color = '#FFFFFF' face='Candara'>
              Release date<br/>
            </font>
          </label><br/>
          <input type="date" onChange={handleChange} name="release"/><br/><br/>

          <Error error={showError}/>
          <button onClick={createSong} div className ='otro'>
            <font color = '#FFFFFF' face='Candara'>
              <b>
                Submit Song
              </b>
            </font>
          </button>
        </center>

    </div>
  );
}
export default UploadSongs;