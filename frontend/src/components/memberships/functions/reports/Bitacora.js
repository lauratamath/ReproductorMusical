import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import './reports.css';
import icono from './images/bitacora.png';

const Button = ({onClick, text}) => {
  const style = {
    color: '#FFFFFF'
  }
  return <button onClick={onClick} style={style} className = 'botonesHL'>{text}</button>
}

const BitacoraRow = ({username, description, date}) => {
  const style = {
    color: '#FFFFFF',
    fontFamily: 'Candara',
    alignContent: 'left',
    margin: '4px',
  }

    return <div style={style}>
      <div className = 'centered-container bi-container'>
        <div className= "textjust">
          <ul>
            <li>
              <div>Username that made the modification: {username}</div>
            </li>
            <li>
              <div>Description of modification: {description}</div>
            </li>
            <li>
              <div>Date of modification: {date}</div>
            </li>
          </ul>
          <div> <br/> </div>
        </div>
      </div>
    </div>
}

const Bitacora = () => {
  const history = useHistory()
  const [bitacora, setBitacora] = useState([])
    
    useEffect(() => {
        getBitacora()
    }, [])

    async function getBitacora() {
      const json = await fetch('http://localhost:3001/bitacora')
        .then(response => response.json())
  
        setBitacora(json)
    }

    return (
    <div>
        <button onClick={history.goBack} div className ='back'>
          <font color = '#FFFFFF' face='Candara' size = '6'>
            ←
          </font>
        </button>
        <Button onClick={() => history.push('../../')} text='Log Out'/>
        <br/><br/><br/><br/>
        
        <img class="bit" src={icono} width="100"/>
        <div className = "bitt">
          <font color = '#FFFFFF'>
            Bitacora
          </font>   
        </div>
        
        <br/><br/><br/>
        <center>
          <div>{bitacora.map((result) => {
                    return <BitacoraRow username={result.username} 
                          description={result.description}
                          date={result.datemodification}/>  
            })}
          </div>
          
        </center>
    </div>
  );
}
export default Bitacora;