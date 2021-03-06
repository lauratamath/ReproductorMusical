import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import './Playsong.css';

export const Play = ({onClick}) => {
    const styleButton = {
        width: '50px',
        height: '50px',
        position: 'absolute',
        right: '0px',
        top: '10px',
        color: '#FFFFFF'
    }
    return <button style={styleButton} onClick={onClick} className='play'>▶</button>
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




const PlaySong = ({songName, songArtist, songUrl}) => {
    const [freeInfo, setFreeInfo] = useState({actualUsernameFree:'', actualDateFree: '', actualTrackFree: undefined})
    const [info, setInfo] = useState({actualUsername: '', actualTrack: 0, actualDateTime:''})
    const history = useHistory()
    const actualUsername = localStorage.getItem('actualUsername')
    
    const date = actualDate()

    useEffect(() => {
        getFreeMembership();  
        getAccountManager();
    }, []);

    function getAccountManager() {
        //Primera vez que escucha
        setInfo({
            ...info,
            actualUsername: actualUsername,
            actualTrack: 1,
            actualDateTime: date
        })
    
        fetch('http://localhost:3001/accountManager').then((r) => {
            return r.json()
            }).then((j) => {
            j.forEach((usernameDB) => {
                const dbDate = usernameDB.datetime.substring(0,10)
                if(actualUsername === usernameDB.username && dbDate === date && usernameDB.song === songName){ //Ya ha escuchado
                    setInfo({
                        ...info,
                        actualTrack: usernameDB.tracks+1,
                        actualDateTime: usernameDB.datetime
                    })
                }
            }
            )
        })
    }

    function getFreeMembership() {
        //Primera vez que escucha
        setFreeInfo({
            ...freeInfo,
            actualUsername: actualUsername,
            actualTrackFree: 1,
            actualDateFree: date
        })

        fetch('http://localhost:3001/freemembership').then((r) => {
			return r.json()
			}).then((j) => {
			j.forEach((usernameDB) => {
                const dbDate = usernameDB.datetime.substring(0,10)
				if(actualUsername === usernameDB.username && dbDate === date){ //Ya ha escuchado
                    
                    setFreeInfo({
                        ...freeInfo,
                        actualTrackFree: usernameDB.tracks+1,
                        actualDateFree: usernameDB.datetime
                    })
                }
			}
	       	)
		})
    }


    function updateAccountManager() {
        const actualTrack = info.actualTrack
        const actualDate = info.actualDateTime.substring(0,10)
        const actualDateFree = freeInfo.actualDateFree
        const actualTrackFree = freeInfo.actualTrackFree
        
        if (freeInfo.actualTrackFree<4 || freeInfo.actualTrackFree === undefined){ //Si no ha escuchado +3 o es usuario premium
            //LO AGREGAMOS A LA TABLA DE ACCOUNTMANAGER
            if (actualTrack !== 1){
                fetch('http://localhost:3001/accountManager/', { 
                    method: 'PUT',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({actualTrack, actualUsername, songName, songArtist, actualDate }),
                    }).then(response => {
                        return response.text();
                    }).then(data => {
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
                        getAccountManager()
                    });      
            }
            //SI ES FREE, LE HACEMOS UPDATE A LA TABLA DE FREEMEMBERSHIP
            if (actualTrackFree !== undefined){
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
                            getFreeMembership()
                        });      
                }
            }
            localStorage.setItem('songName', songName);
            localStorage.setItem('songArtist', songArtist);
            localStorage.setItem('songUrl', songUrl)
        }

        if(window.location.pathname === '/login/premium/playlists/playlistInfo'){
            history.push('../../premium/listeningTo')
        } else if(freeInfo.actualTrackFree<4){
            history.push('free/listeningTo')
        } else if(freeInfo.actualTrackFree === undefined){
            history.push('premium/listeningTo')
        }
    }


    return (
        <Play onClick={updateAccountManager}/>
    )
}
export default PlaySong;