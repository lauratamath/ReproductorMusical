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
    console.log(songName)
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
        const albumsFromApi = ['5JpH5T1sCYnUyZD6TM0QaY', '5lKlFlReHOLShQKyRv6AL9', '1TTxcgs3zEngN0EB56yXzY', '71O60S5gIJSIAhdnrDIh3N', '6DEjYFkNZh67HP7R9PSZvv']
        
        for(var i=0; i<albumsFromApi.length; i++){
            const token = 'BQC3FRR-MY1dSqniX2PLP2TPNL5Ug-SfK2Uf7qASIi5Syj9wihUVGgHw7PC42lIWPkHqFuz0UAN6RB-lF7Dw8ujRmxEKq0ubI_cpQjhRWU5N40gs0t3BOFJLcXfX9qhHrGLKLRe0'
            
            const id = albumsFromApi[i]
            const json = await fetch('https://api.spotify.com/v1/albums/'+id, { 
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
                }
            }).then(response => response.json())

            const album = json.name //Si no esta
            var revisar = songs.map(({ album }) => album).indexOf(album)

            if(revisar == -1 && songs.length!=0) {
                for(var j=0; j<4; j++){
                    const artist = json.artists[0].name
                    const song = json.tracks.items[j].name
                    const gender = 'not available'
                    const duration = (json.tracks.items[j].duration_ms/60000).toFixed(2)
                    const release = json.release_date
                    const url = json.tracks.items[j].id

                    

                    fetch('http://localhost:3001/spotifySongs', {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({artist, gender, album, song, duration, release, url}),
                        }).then(response => {
                        return response.text();
                        })
                }
            }
        }
        
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