import React, {useState, useEffect} from 'react';
import PlaySong from '../functions/PlaySong';
import AddToPlaylist from '../functions/AddToPlaylist';
import './Search.css';

const Input = ({onChange}) => { 
    const style = {
      display: 'block',
      width: '400px',
      height: '25px',
      border: '0px',
      borderRadius: '10px',
      paddingLeft: '10px',
      float: 'center' 
    }
    return <input type='text' onChange={onChange} style={style} placeholder='artist, song, gender, or album'/>
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
            <AddToPlaylist songArtist={artistName} songName={songName}/>

        </div>
}

const SearchBarPremium = () => {
    const [search, setSearch] = useState('')
    const [songs, setSongs] = useState([])
    const [completeResults, setResults] = useState([])
    
    useEffect(() => {
        getSongs();
        searchSong();
    }, []);
      
    async function getSongs() {
        const json = await fetch('http://localhost:3001/songs')
          .then(r => r.json())
        
        await setSongs(json)
    }

    
    const handleChange = (event) => {
        setSearch(event.target.value)
    } 

    function searchSong () {
        getSongs()
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
    
    return (
        <div>
            <Input onChange={handleChange}/>
            <button onClick={searchSong} div className='botonSearch'>🔍</button>
            <br/><br/>

            {completeResults.map((result) => {
                return <SongSearched artistName={songs[result].artist} 
                        songName={songs[result].song} 
                        songDuration={songs[result].duration}
                        songUrl={songs[result].url}
                        />  
            })}
        </div>
    )
}
export default SearchBarPremium;