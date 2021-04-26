import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import './reports.css';
import icono from './images/activos.png';

const Button = ({onClick, text}) => {
  const style = {
    color: '#FFFFFF',
    fontFamily: 'Candara',
    alignContent: 'left',
    margin: '4px',
  }
  return <button onClick={onClick} style={style} className = 'botonesHL'>{text}</button>
}

const ActiveUser = ({username, tracks}) => {
  const style = {
    color: '#FFFFFF'
  }

    return <div style={style}>
      <div>Username: {username}</div>
      <div>Total reproductions: {tracks}</div>
      <div> <br/> </div>
      </div>
}

const ActiveUsers = () => {
  const history = useHistory()
  const [activeUsers, setActiveUsers] = useState([])
    
    useEffect(() => {
        getActiveUsers();
    }, []);

    async function getActiveUsers() {
      const json = await fetch('http://localhost:3001/activeUsers')
        .then(response => response.json())
  
        setActiveUsers(json)
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
        <h1>
          <font color = '#FFFFFF' face='Candara'>
            &nbsp; &nbsp;
            All time active users
          </font>
        </h1>
        <br/><br/><br/><br/>
        <center>
          <div class='column'>
            <div class='verticalCenter'><img class="active" src={icono} width="160"/></div>
            <div>{activeUsers.map((result) => {
                    return <ActiveUser username={result.username} 
                            tracks={result.sum}/>  
            })}
            </div>
          </div>
        </center>
    </div>
  );
}
export default ActiveUsers;