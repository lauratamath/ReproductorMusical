import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import './Playsong.css';

export const AddSong = ({onClick}) => {
    const styleButton = {
        width: '50px',
        height: '50px',
        position: 'absolute',
        left: '90px',
        top: '10px',
        color: '#FFFFFF'
    }
    return <button style={styleButton} onClick={onClick} className = 'add'>➕</button>
}

const AddToPlaylist = ({songArtist, songName}) => {
    const history = useHistory()

    localStorage.setItem('playlistSong', songName)
    localStorage.setItem('playlistArtist', songArtist)

    const changeView = () => {
        history.push('premium/SongToPlaylist')
    }

    return (
        <AddSong onClick={changeView}/>
    )

}

export default AddToPlaylist;