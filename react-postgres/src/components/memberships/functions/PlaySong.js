import React, {useState, useEffect} from 'react';

export const Play = ({onClick}) => {
    const styleButton = {
        width: '50px',
        height: '50px',
        position: 'absolute',
        right: '0px',
        top: '10px'
    }
    return <button style={styleButton} onClick={onClick}>Play</button>
}

const actualUsername = localStorage.getItem('actualUsername')
const PlaySong = () => {
    const [accountManager, setAccountManager] = useState([])
    const [actualTrack, setActualTrack] = useState([])
  
    useEffect(() => {
      getAccountManager();
      setTracks();
    }, []);
  
    function getAccountManager() {
        fetch('http://localhost:3001/accountManager')
          .then(r => r.json())
          .then(r => setAccountManager(r))
    }

    function setTracks () {
        for (var a=0; a<accountManager.length; a++) {
            if (accountManager[a].username == actualUsername){
                setActualTrack(accountManager[a].tracks)
            }
        }
    }
    console.log('render', accountManager)

    const handleChange = (event) => {
        fetch('http://localhost:3001/accountManager', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({actualTrack, actualUsername}),
            }).then(response => {
              return response.text();
            });
    }

    return (
        <Play onClick={handleChange}/>
    )
}
export default PlaySong;