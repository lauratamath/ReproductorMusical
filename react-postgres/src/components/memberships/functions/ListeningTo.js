import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import './Playsong.css';
import reproductor from './images/decibeles.gif';

const Button = ({onClick, text}) => {
  const style = {
    color: '#FFFFFF'
  }
  return <button onClick={onClick} className = 'searchb' style={style} >{text}</button>
}

const Player = ({link}) => {
  if(link === 'null'){
      return <img class="reproductor" src={reproductor} ondblclick="javascript:this.width=50;this.height=115" width="500"/>
  } else {
      link = link.slice()
      const src = "https://open.spotify.com/embed/track/"+link
      return <iframe src={src} width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"/>
  }
}


const ListeningTo = () => {
  const history = useHistory()
  const songName = localStorage.getItem("songName")
  const songArtist = localStorage.getItem("songArtist")
  const songUrl = localStorage.getItem("songUrl")
  
    return (
    <div>
      <center>
        <br/><br/><br/><br/>
        <h1>
          <font color = '#FFFFFF' face='Candara'  size = '6'>
            Listening to... {songName} - {songArtist}
          </font>
        </h1>
        <br/><br/><br/>
        <Button onClick = {history.goBack} text='Search Another Song'/>
        <br/><br/><br/>
        <Player link = {songUrl} />
        </center>
    </div>
  );
}
export default ListeningTo;