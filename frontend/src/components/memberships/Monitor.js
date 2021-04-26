import React, {useState, useEffect} from 'react';
import SearchBar from './functions/SearchBar'
import { useHistory } from "react-router-dom";
import './Free.css';
import logo from './images/logo.png';
import icono from './images/iconopersona.png';

const Button = ({onClick, text}) => {
  const style ={
    color: '#FFFFFF',
  }
  return <button onClick={onClick}  style={style} className='botonesFree'>{text}</button>
}

const Monitor= () => {
  const history = useHistory()
  const actualUsername = localStorage.getItem('actualUsername')
  const [monitorFeatures, setMonitorFeatures] = useState([])

  
  useEffect(() => {
    getMonitorsFeatures()
  }, [])

  function getMonitorsFeatures() {
    fetch('http://localhost:3001/monitorFeatures', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({actualUsername}),
    })
    .then(r => r.json())
    .then(r => setMonitorFeatures(r))
  }

  return (
    <div>
      <img src={logo} width="175"/>
      <img class="icono" src={icono} width="50"/><br/>
      <Button onClick={() => history.push('admin/account')} text='Account'/><br/><br/>
      <Button onClick={() => history.push('../home')} text='Log Out'/>

      <center>
        <h1>
          <font face ='Candara' color ='#FFFFFF' size = '7'>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            ¿Ya sabes qué escuchar?
          </font>
        </h1>
        <SearchBar/>
        <br/><br/>
      </center>

      <center>
          {monitorFeatures?.map((result) => { 
            return <button onClick={() => history.push('monitor/'+result.idfeature)} className ='otro'>
              <font color = '#FFFFFF' face='Candara'>
                <b>
                  {result.nametask}
                </b>
              </font>
            </button>
          })}
      </center>

      <h5 align ='center'>
        <font color = '#8C8C8C' face='Candara'>
          <br/><br/>
          Monitor membership
        </font>
      </h5>
    </div>
  )
}

export default Monitor
