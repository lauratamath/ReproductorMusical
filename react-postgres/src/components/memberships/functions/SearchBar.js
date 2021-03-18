import React, {useState, useEffect} from 'react';
import PlaySong from '../functions/PlaySong';
import './Search.css';

const Input = ({onChange}) => { 
    const style = {
      display: 'block',
      width: '400px',
      height: '25px',
      border: '0px',
      borderRadius: '10px',
      paddingLeft: '10px'
    }
    return <input type='text' onChange={onChange} style={style} placeholder='artist, song, gender, or album'/>
  }

const SongSearched = ({artistName, songName, songDuration}) => { 
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
                <h4>{artistName}</h4>
                <h5>{songName}</h5>
                <h6>{songDuration}</h6>
            </div>
           <PlaySong songArtist={artistName} songName={songName}/>
        </div>
}

const SearchBar = () => {
    const [search, setSearch] = useState('')
    const [songs, setSongs] = useState([])
    const [completeResults, setResults] = useState([])
    const [songInfo, setSongInfo] = useState({artist: '', album: '', song: '', duration: 0.00, release: ''})
    
    useEffect(() => {
        getSongs();
        searchSong();
        getFromApi();
    }, []);

      
    function getSongs() {
        fetch('http://localhost:3001/songs')
          .then(r => r.json())
          .then(r => setSongs(r))
    }


    const handleChange = (event) => {
        setSearch(event.target.value)
    } 

    function searchSong () {
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
    
    async function getFromApi() {
        const albumsFromApi = ['5JpH5T1sCYnUyZD6TM0QaY']
        
        for(var i=0; i<albumsFromApi.length; i++){
            
            const id = albumsFromApi[i]
            const json = await fetch('https://api.spotify.com/v1/albums/'+id, { 
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer BQBJl-rC9xabvNIdBoJLhJSa4-OTDIFBNtr-2UnrB2lgLMToKm57EK53llvnloECsvFcSLqVh9ZkipPMFsThMSLWGj_mIJXp6DwTpQ9SxOBYbNz9RKD5T6w7Kz3Y39G0cbHVLgFC"
                }
            }).then(response => response.json())

            const artist = json.artists[0].name
            const album = json.name
            const song = json.tracks.items[0].name
            const duration = json.tracks.items[0].duration_ms/60000
            const release = json.release_date
        }
        
    }

    return (
        <div>
            <Input onChange={handleChange}/>
            <button onClick={searchSong} div className='botonSearch'>🔍</button>

            {completeResults.map((result) => {
                return <SongSearched artistName={songs[result].artist} 
                        songName={songs[result].song} 
                        songDuration={songs[result].duration}/>  
            })}
        </div>
    )
}
export default SearchBar;