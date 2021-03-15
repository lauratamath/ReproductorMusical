import React, {useState, useEffect} from 'react';

const Input = ({onChange}) => { 
    const style = {
      display: 'block'
    }
    return <input type='text' onChange={onChange} style={style} placeholder='artist, song, gender, or album'/>
  }

const SongSearched = ({artistName, songName, songDuration}) => { 
    const style = {
      display: 'block'
    }
    return <div align='center'>
        <h4>{artistName}</h4>
        <h5>{songName}</h5>
        <h6>{songDuration}</h6>
        </div>
}

const SearchBar = () => {
    const [search, setSearch] = useState('')
    const [songs, setSongs] = useState([])
    const [completeResults, setResults] = useState([])
    
    useEffect(() => {
        getSongs();
        searchSong();
    }, []);

      
    function getSongs() {
        fetch('http://localhost:3001/songs')
          .then(r => r.json())
          .then(r => setSongs(r))
    }
    console.log('render', songs)

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

    return (
        <div>
            <Input onChange={handleChange}/>
            <button onClick={searchSong}>Search</button>

            {completeResults.map((result) => {
                return <SongSearched artistName={songs[result].artist} 
                        songName={songs[result].song} 
                        songDuration={songs[result].duration}/>  
            })}
        </div>
    )
}
export default SearchBar;