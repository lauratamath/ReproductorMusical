import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const UsersRep = () => {
  const [accountRec, setAccountRec] = useState([])
  const [date, setDate] = useState('')
  const history = useHistory()

  const getAccountReproductions = async () => {
    // formato username, song, artist, datetime, tracks
    const json = await fetch('http://localhost:3001/accountmanagermongo', {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({date}),
          }).then(response => {
          return response.json();
      })
    
    for (let i=0; i<json.length; i++) {
      let listened = []
      const username = json[i].username

      // Agrupo por usuario
      for (let b=0; b<json.length; b++) {
        if (json[b].username === username) {
          listened.push(json[b])
          json.splice(b, 1)
        }
      }

      // Agrego  a mongo en formato username, listened: [canciones, fecha, etc]
      await fetch('http://localhost:3001/repData/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, listened}),
        }).then(response => {
        return response.text();
      })
    }
    
    // Obtenemos la infomacion de mongo
    const json2 =await fetch('http://localhost:3001/repDate').then(response => response.json())
    
    let b = 0
    const allRecommendations = []
    while (b < 10 && json2.length > 0) {
      const userRandom = Math.floor(Math.random()*json2.length) // Usuario aleatorio

      const actualUsername = json2[userRandom].username
      let similarTo;
      let mostListened = 0

      // Obtengo el mas escuchado
      for (let i=0; i<json2[userRandom].listened.length; i++) {
        if (json2[userRandom].listened[i].tracks > mostListened) {
          mostListened = json2[userRandom].listened[i].tracks
          similarTo = json2[userRandom].listened[i].song
        }
      }

      // Obteniendo recomendacion
      const recomendation = await fetch('http://localhost:3001/actualRecommendation/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({similarTo}),
        }).then(response => {
        return response.json();
      })

      const songRandom = Math.floor(Math.random()*recomendation.length) // Usuario aleatorio
      allRecommendations.push({username: actualUsername, similarTo: recomendation[songRandom]})

      json2.splice(userRandom, 1)
      b++
    }

    setAccountRec(allRecommendations)
  }

  
  const handleChange = (event) => {
    setDate(event.target.value)  
  } 

  return (
    <div>
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
      </div>

      <div>
        <label for="start">Fecha limite:</label>
        <input type="date" onChange={handleChange} name="date" />
        <button onClick={getAccountReproductions} type="button">Generar Recomendaciones</button>

        {accountRec.map(({ username, similarTo }) =>
          <div>
            <div> Al usuario: {username} </div>
            <div> Se le recomienda: {similarTo.artist} - {similarTo.song} </div>
          </div>)}
      </div>
    </div>
  )
}

export default UsersRep
