import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import './reports.css'
import random from './images/random.png'

const Error = ({error}) => {
  const style = {
    color: 'red'
  }
  return <h5 style={style}>{error}</h5> 
}

const Button = ({onClick, text}) => {
  const style = {
    color: '#FFFFFF',
  }
  return <button onClick={onClick} style={style} className = 'botonesHL'>{text}</button>
}


const GenerateRandom = () => {
  const [songs, setSongs] = useState([])
  const [error, setError] = useState(false)
  const [simInfo, setSimInfo] = useState({date:'', tracks:0, songsQuantity:0})
  const history = useHistory()
  
  useEffect(() => {
      getSongs()
  }, [])
  
  const handleChange = (event) => {
    setSimInfo({
      ...simInfo,
      [event.target.name] : event.target.value
    })  
  } 

  // Se obtiene el listado de canciones
  // getSongs
  async function getSongs() {
    const json = await fetch('http://localhost:3001/songs')
      .then(r => r.json())  
      
    await setSongs(json)
  }
  // Se obtiene aleatoria una cancion de la lista y se borra
  // Se inserta n veces cada track a accoutmanager
  const generateRandomReproduction = async () => {
    const actualUsername = 'simulation'
    let tracks = simInfo.tracks
    const actualDate = simInfo.date

    for (let i=0; i<simInfo.songsQuantity; i++){
      const random = Math.floor(Math.random()*songs.length) 
      let actualTrack = 1 + Math.floor(Math.random()*tracks) // Se escucha m veces el track
      const songName = songs[random].song
      const songArtist = songs[random].artist

      if (i === simInfo.songsQuantity - 1) {
        actualTrack = tracks // Si es la ultima iteracion, la cantidad m seria el total que queda
      }

      // Creamos el registro
      await fetch('http://localhost:3001/accountManager/', { 
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({actualTrack, actualUsername, songName, songArtist, actualDate }),
      }).then(response => {
        setSongs(songs.splice(random,  1)) //Borramos la cancion
        return response.text()
      })
      tracks -= actualTrack - 1 // Disminuimos la cantidad total
    }

    setError(true)
  }

  return (
    <div className="generate">
      <button onClick={history.goBack} div className ='back'>
        <font color = '#FFFFFF' face='Candara' size = '6'>
          ←
        </font>
      </button>
      <Button onClick={() => history.push('../../')} text='Log Out'/>
      <h1>
        <font color = '#FFFFFF' face='Candara'>
          Generate Random Reproduction
        </font>
      </h1>
      <div className="container">
        <center>
          <img class="active" alt="icono" src={random} width="100"/>
        </center>
        <label for="start">Cantidad de tracks a escuchar:</label>
        <input type="number" onChange={handleChange} name="songsQuantity" />
        <label for="start">Cantidad de veces a escuchar el track:</label>
        <input type="number" onChange={handleChange} name="tracks" />
        <label for="start">Fecha a simular:</label>
        <input type="date" onChange={handleChange} name="date" />
        <center>
          <button type="button" className="generateB" onClick={generateRandomReproduction}>Generate</button>
          { error && <Error error="Se generaron con exito" /> }
        </center>
      </div>
    </div>
  )
}

export default GenerateRandom
