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

const actualDate = () => {
    const today = new Date()
    const month = today.getMonth()+1

    if (month.toString().length === 1){
        return today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + today.getDate();
    } else {
        return today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    }
}

const actualUsername = localStorage.getItem('actualUsername')
const date = actualDate()

const PlaySong = ({songName, songArtist}) => {
    const [accountManager, setAccountManager] = useState([])
    const [freeMembershipManager, setFreeMembershipManager] = useState([])
  
    useEffect(() => {
        getAccountManager();
    }, []);

    useEffect(() => {
        getFreeMembership();
    }, []);

    function getAccountManager() {
        fetch('http://localhost:3001/accountManager')
          .then(r => r.json())
          .then(r => setAccountManager(r))
    }

    function getFreeMembership() {
        fetch('http://localhost:3001/freemembership')
          .then(r => r.json())
          .then(r => setFreeMembershipManager(r))
    }

    function updateAccountManager() {
        const [actualDate, actualTrack] = getTracks()
        const [actualDateFree, actualTrackFree] = getTracksFree()

        if (actualTrackFree<4 || actualTrackFree === undefined){ //Si no ha escuchado +3 o es usuario premium
            //LO AGREGAMOS A LA TABLA DE ACCOUNTMANAGER
            if (actualTrack !== 1){
                fetch('http://localhost:3001/accountManager/', { 
                    method: 'PUT',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({actualTrack, actualUsername, songName}),
                    }).then(response => {
                        return response.text();
                    }).then(data => {
                        alert(data);
                        getAccountManager()
                    });
            } else {
                fetch('http://localhost:3001/accountManager/', { 
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({actualTrack, actualUsername, songName, songArtist, actualDate}),
                    }).then(response => {
                        return response.text();
                    }).then(data => {
                        alert(data);
                        getAccountManager()
                    });      
            }
            //SI ES FREE, LE HACEMOS UPDATE A LA TABLA DE FREEMEMBERSHIP
            console.log(actualUsername + ' ' + actualDateFree + ' ' + actualTrackFree)
            if (actualTrackFree !== 1){
                fetch('http://localhost:3001/freemembership', { 
                    method: 'PUT',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({actualUsername, actualDateFree, actualTrackFree}),
                    }).then(response => {
                        return response.text();
                    }).then(data => {
                        alert(data);
                        getFreeMembership()
                    });
            } else {
                fetch('http://localhost:3001/freemembership', { 
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({actualUsername, actualDateFree, actualTrackFree}),
                    }).then(response => {
                        return response.text();
                    }).then(data => {
                        alert(data);
                        getFreeMembership()
                    });      
            }           
        }
    }

    function getTracks () {
        for (var a=0; a<accountManager.length; a++) { 
            const dbDate = accountManager[a].datetime.substring(0,10)
            if (accountManager[a].username === actualUsername && accountManager[a].song === songName && dbDate === date){
                accountManager[a].tracks += 1
                return [date, accountManager[a].tracks]
            } else if (accountManager[a].username === actualUsername){
                return [date, 1] //Es primera vez que escucha la cancion
            }
        }
    }

    function getTracksFree () {
        for (var a=0; a<freeMembershipManager.length; a++) { 
            const dbDate = freeMembershipManager[a].datetime.substring(0,10)
            if (freeMembershipManager[a].username === actualUsername && dbDate === date){
                freeMembershipManager[a].tracks += 1 
                return [date, freeMembershipManager[a].tracks]
            } 
        }
        for (var i=0; i<freeMembershipManager.length; i++) { 
            if (freeMembershipManager[i].username === actualUsername){
                return [date, 1] //Es primera vez que escucha en el dia
            }
        }
        return [undefined, undefined]
    }
    
    console.log('render', freeMembershipManager)

    return (
        <Play onClick={updateAccountManager}/>
    )
}
export default PlaySong;