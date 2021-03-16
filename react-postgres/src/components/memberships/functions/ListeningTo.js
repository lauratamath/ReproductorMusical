import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";

const Button = ({onClick, text}) => {
  return <button onClick={onClick}>{text}</button>
}


const ListeningTo = () => {
  const history = useHistory()
  const songName = localStorage.getItem("songName")
  const songArtist = localStorage.getItem("songArtist")

    return (
    <div>
        <Button onClick = {history.goBack} text='Search Another Song'/>
        <h1>Listening to... {songName} - {songArtist}</h1>
    </div>
  );
}
export default ListeningTo;