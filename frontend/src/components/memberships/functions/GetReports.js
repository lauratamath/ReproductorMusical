import React from 'react';
import { useHistory } from "react-router-dom";
import './FreeAccount.css';

const Button = ({onClick, text}) => {
    const style = {
    color: '#FFFFFF'
  }
  return <button onClick={onClick} style={style} className = 'otross'>{text}</button>
}

const GetReports = () => {
  const history = useHistory()

    return (
    <div>
        <button onClick={() => history.push('../')} div className ='botonesFree'>
            <font color = '#FFFFFF' face='Candara'>
                Log Out
            </font>
        </button>
        <button onClick={history.goBack} div className ='botonesFree'>
            <font color = '#FFFFFF' face='Candara'>
                Home
            </font>
        </button>
        
        <br/><br/>
        <h1>
            <font color = '#FFFFFF' face='Candara'  size = '7'>
                &nbsp; &nbsp;
                Get reports
            </font>
        </h1>
        <center>
        <br/><br/><br/><br/><br/>
            <Button onClick={() => history.push('./reports/songsCount')} text='Artistas con mayor producción'/>
            <Button onClick={() => history.push('./reports/popularArtists')} text='Artistas con popularidad creciente'/>
            <Button onClick={() => history.push('./reports/subscriptionCount')} text='Cantidad de nuevas suscripciones'/>
            <br/><br/><br/>
            <Button onClick={() => history.push('./reports/albumReleases')} text='Álbumes más recientes'/>
            <Button onClick={() => history.push('./reports/popularGenders')} text='Generos más populares'/>
            <Button onClick={() => history.push('./reports/activeUsers')} text='Usuarios más activos'/>
        </center>
    </div>
  );
}
export default GetReports;