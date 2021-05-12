import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import './reports.css';
import icono from './images/topsongs.png';

const Error = ({error}) => {
  const style = {
    color: 'red'
  }
  return <h5 style={style}>{error}</h5> 
}

const Input = ({type, onChange, name}) => { 
  const style = {
    display: 'block'
  }
  return <input type={type} onChange={onChange} style={style} name={name}/>
}

const Button = ({onClick, text}) => {
  const style = {
    color: '#FFFFFF',
    fontFamily: 'Candara',
    alignContent: 'left',
    margin: '4px',
  }
  return <button onClick={onClick} style={style} className = 'botonesHL'>{text}</button>
}

const TopSongs_style = ({song, artist, tracks}) => {
  const style = {
    color: '#FFFFFF'
  }

    return <div style={style}>
      <div>Song: {song}</div>
      <div>Artist: {artist}</div>
      <div>Tracks: {tracks}</div>
      <div> <br/> </div>
      </div>
}


const TopSongs = () => {
  const history = useHistory()
  const [songs,setSongs]= useState([])
  const [artistInfo,setArtistInfo]=useState({artistN: '', nSongs: ''})
  const [showError, setShowError] = useState('')
    useEffect(() => {
        getTopSongs();
    }, []);

    

    const handleChange = (event) => {
    setArtistInfo({
      ...artistInfo,
      [event.target.name] : event.target.value
    })
  } 


    async function getTopSongs(){
      var temporary = []
      const json = await fetch('http://localhost:3001/TopSongs')
        .then(response => response.json())
  
      var error = ''
      var flag = 0

      if ((artistInfo.artistN === '') ||  (artistInfo.nSongs === '')){
          error = 'Fill all the form'
      }
      if (error === ''){
        if(json.length>0){
          for(var a=0; a<json.length; a++){
            if((json[a].artist === artistInfo.artistN) && (temporary.length < artistInfo.nSongs)){
              temporary.push(json[a]) 
            }
          }
        }
      setSongs(temporary)
      setShowError(error)
      }
    }

    return(
    <div>
        <button onClick={history.goBack} div className ='back'>
          <font color = '#FFFFFF' face='Candara' size = '6'>
            ←
          </font>
        </button>
        <Button onClick={() => history.push('../../')} text='Log Out'/>
        <br/><br/><br/><br/>
        <h1>
          <font color = '#FFFFFF' face='Candara'>
            &nbsp; &nbsp;
           Top Played Songs
          </font>
        </h1>
        <br/><br/>
        <center>
          <label>
            <font face ='Candara' color ='#FFFFFF'>
              Artist<br/>
            </font><br/>
          </label>
          <Input type="text" onChange={handleChange} name="artistN"/>
          <br/><br/>
          <label>
            <font face ='Candara' color ='#FFFFFF'>
              Ranking Size<br/>
            </font><br/>
          </label>
          <Input type="text" onChange={handleChange} name="nSongs"/>
          <Error error={showError}/>
          <button onClick={ getTopSongs } className='botones'>
            <font color ='#FFFFFF'>
              <b>
                Submit
              </b>
            </font>
          </button>
          <br/><br/><br/><br/>
            
        </center>
        <center>
          <div class='column'>
            <div class='verticalCenter'><img class="active" src={icono} width="210"/></div>
            <div>{songs.map((result) => {
                    return <TopSongs_style song={result.song} 
                            artist ={result.artist}
                            tracks={result.sum}/>  
            })}
            </div>
          </div>
        </center>
    </div>
  );
}
export default TopSongs;