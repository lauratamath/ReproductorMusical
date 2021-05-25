import React from 'react';
import { useHistory } from "react-router-dom";
import './FreeAccount.css';
import './reports/reports.css'

const Button = ({onClick, text}) => {
    const style = {
    color: '#FFFFFF'
  }
  return <button onClick={onClick} style={style} className = 'otrossR'>{text}</button>
}

const GetReports = () => {
  const history = useHistory()

    return (
    <div>
        <button onClick={history.goBack} div className ='back'>
          <font color = '#FFFFFF' face='Candara' size = '6'>
            ←
          </font>
        </button>
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
        <br/><br/><br/>
        <center>
            <div className="filaR">
                <Button onClick={() => history.push('./reports/songsCount')} text='Artistas con mayor producción'/>
                <Button onClick={() => history.push('./reports/popularArtists')} text='Artistas con popularidad creciente'/>
                <Button onClick={() => history.push('./reports/subscriptionCount')} text='Cantidad de nuevas suscripciones'/>
                <Button onClick={() => history.push('./reports/albumReleases')} text='Álbumes más recientes'/>
                <Button onClick={() => history.push('./reports/popularGenders')} text='Generos más populares'/>
                <Button onClick={() => history.push('./reports/activeUsers')} text='Usuarios más activos'/>
                <Button onClick={() => history.push('./reports/salesPerWeek')} text='Ventas por Semana'/>
                <Button onClick={() => history.push('./reports/mostSelledArtist')} text='Artistas con Mayores Ventas'/>
                <Button onClick={() => history.push('./reports/salesPerGenre')} text='Ventas por Género'/>
                <Button onClick={() => history.push('./reports/topSongs')} text='Canciones más reproducidas'/>
                <Button onClick={() => history.push('./reports/generateRandom')} text='Simular reproducciones'/>
                <Button onClick={() => history.push('./reports/usersRep')} text='Reproducciones por fecha'/>
            </div>
        </center>
    </div>
  );
}
export default GetReports;