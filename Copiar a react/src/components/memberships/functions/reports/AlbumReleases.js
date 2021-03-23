import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import './reports.css';
import icono from './images/reciente.png';

const Button = ({onClick, text}) => {
  const style = {
    color: '#FFFFFF'
  }
  return <button onClick={onClick} style={style} className = 'botonesHL'>{text}</button>
}

const AlbumReleased = ({artistName, albumName, yearReleased, weekReleased}) => {
  const style = {
    color: '#FFFFFF',
    fontFamily: 'Candara',
    alignContent: 'left',
    margin: '4px',
  }

    return <div style={style}>
      <div>Album: {albumName}</div>
      <div>Artist: {artistName}</div>
      <div>Year: {yearReleased}</div>
      <div>Week of Year: {weekReleased}</div>
      <div> <br/> </div>
      </div>
}

const date = () => {
    const today = new Date()
    const month = today.getMonth()+1
  
    if (month.toString().length === 1){
        return today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + today.getDate();
    } else {
        return today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    }
  }
  
const actualDate = date()

const getWeekNumber = () => {
    var date1 = new Date(actualDate); 
    var oneJan =  new Date(date1.getFullYear(), 0, 1); 
    var numberOfDays =  Math.floor((date1 - oneJan) / (24 * 60 * 60 * 1000));  
    var result = Math.ceil(( date1.getDay() + 1 + numberOfDays) / 7);     

    return result;
  }
  
const actualWeek = getWeekNumber(new Date());

const AlbumReleases = () => {
  const history = useHistory()
  const [albumReleases, setAlbumReleases] = useState([])
    
    useEffect(() => {
        getAlbumsReleases();
    }, []);

    async function getAlbumsReleases() {
      var temporary = []
      const json = await fetch('http://localhost:3001/albumReleases')
        .then(response => response.json())
  
      if(json.length>0){
        for(var a=0; a<json.length; a++){
          if(json[a].anio.toString() === actualDate.substring(0, 4)) {
            temporary.push(json[a])
          }
        }
      }
      setAlbumReleases(temporary)
    }

    return (
    <div>
        <button onClick={() => history.push('../reports')} div className ='back'>
          <font color = '#FFFFFF' face='Candara' size = '6'>
            ←
          </font>
        </button>
        <Button onClick={() => history.push('../../admin')} text='Home'/>
        <Button onClick={() => history.push('../../')} text='Log Out'/>

        <br/><br/><br/><br/>
        <h1>
            <font color = '#FFFFFF' face='Candara'>
                &nbsp; &nbsp;
                Report album releases
            </font>
        </h1>
        <h2>
            <font color = '#FFFFFF' face='Candara'>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                Actual date: {actualDate} Actual years week: {actualWeek}
            </font>
        </h2>
        <h2>
            <font color = '#FFFFFF' face='Candara'>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                This year last released albums
            </font>
        </h2>
        <br/><br/><br/><br/>
       <center>
            <div class='column'>
            <div class='verticalCenter'><img class="reciente" src={icono} width="120"/></div>
            <div>{albumReleases.map((result) => {
                    return <AlbumReleased artistName={result.artist} 
                            albumName={result.album}
                            yearReleased={result.anio}
                            weekReleased={result.semana}/>  
            })}</div>
            </div>
          
        </center>
    </div>
  );
}
export default AlbumReleases;