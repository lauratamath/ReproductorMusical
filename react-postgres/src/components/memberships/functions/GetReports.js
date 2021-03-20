import React from 'react';
import { useHistory } from "react-router-dom";

const Button = ({onClick, text}) => {
  return <button onClick={onClick}>{text}</button>
}

const GetReports = () => {
  const history = useHistory()

    return (
    <div>
        <Button onClick={() => history.push('../admin')} text='Home'/>
        <Button onClick={() => history.push('../')} text='Log Out'/>

        <h1>Pantalla principal get reports</h1>

        <Button onClick={() => history.push('./reports/albumReleases')} text='Albumes mas recientes'/>
        <Button onClick={() => history.push('./reports/popularArtists')} text='Artistas con popularidad creciente'/>
        <Button onClick={() => history.push('./reports/subscriptionCount')} text='Cantidad de nuevas suscripciones'/>
        <Button onClick={() => history.push('./reports/songsCount')} text='Artistas con mayor reproduccion'/>
        <Button onClick={() => history.push('./reports/popularGenders')} text='Generos mas populares'/>
        <Button onClick={() => history.push('./reports/activeUsers')} text='Usuarios mas activos'/>

    </div>
  );
}
export default GetReports;