import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import './Home.css';
import logo from './images/logo.png';

const Button = ({onClick, text}) => {
	const style ={
		color: '#FFFFFF'
	}
    return <button onClick={onClick} style={style} className='boton'>{text}</button>
}

if (localStorage !== 1){
  localStorage.setItem('firstTime', 'false')
}

const Home = () => {
  const history = useHistory()

	useEffect(() => {
		if (localStorage.getItem("firstTime") === 'false') {
			getFromApi()
			localStorage.setItem("firstTime", 1)
		}
	}, [])

	async function getFromApi() {
    const albumsFromApi = ['5JpH5T1sCYnUyZD6TM0QaY', '5lKlFlReHOLShQKyRv6AL9', '1TTxcgs3zEngN0EB56yXzY', '71O60S5gIJSIAhdnrDIh3N', '6DEjYFkNZh67HP7R9PSZvv', '48i37aZTC1prDr4EcpQeEa', '7Ho8gAx4haSxv1eFLQwvTj']
		localStorage.setItem("firstTime", 1)
		
    for(var i=0; i<albumsFromApi.length; i++){
      const token = 'BQAIHFE_ThooAdxttnmjlppfCYisaSS75UmcW8m4yKL7bHve-VdzanIKTuKyMdgG0PRf8XneX6rMbQE34kAOQdLl8DNgiq9-6H-2vja0oXLhGHcT8aY120n5sKVWaX29GL_7sEdsVK1Qm2OhOin4HQ'

      const id = albumsFromApi[i]
      const json = await fetch('https://api.spotify.com/v1/albums/'+id, { 
				method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + token
        }
      }).then(response => response.json())

      const album = json.name

      for(var j=0; j<4; j++){
        const artist = json.artists[0].name
        const song = json.tracks.items[j].name
        const gender = 'not available'
        const duration = (json.tracks.items[j].duration_ms/60000).toFixed(2)
        const release = json.release_date
        const url = json.tracks.items[j].id

        fetch('http://localhost:3001/spotifySongs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({artist, gender, album, song, duration, release, url}),
        }).then(response => {
        	return response.text();
        })

        if (j===3) {
          fetch('http://localhost:3001/spotifyAlbums', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({artist, album}),
					}).then(response => {
						return response.text();
					})
        }
      }
    }
  }
		
  return (
    <div>
        <Button onClick={() => history.push('login')} text='Log In'/>
        <Button onClick={() => history.push('signin')} text='Sign Up'/>
				<Button onClick={() => history.push('planes')} text='Planes'/>

        <hr /><br/><br/>
        <h1 align= 'center'>
        	<font face ='Consolas' color ='#CD9898' size = '7'>
				PONLE<br/>
				PLAY A LA <br/>
				DIVERSIÓN<br/>
			</font><br/><br/>
			<img src={logo}/>

		</h1>
		
    </div>
  )
}
export default Home;