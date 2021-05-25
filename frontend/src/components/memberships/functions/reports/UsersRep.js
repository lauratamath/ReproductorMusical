import React from 'react'

const UsersRep = () => {
  const createRep = () => {
    const username = 'Andrea'
    const listened = [{song: 'hola', tracks: 5}]
    fetch('http://localhost:3001/repData/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, listened}),
      }).then(response => {
      return response.text();
    })
  }

  return (
    <div>

      <button onClick={createRep} type="button">Generar</button>
    </div>
  )
}

export default UsersRep
