import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import './reports.css';

const Button = ({onClick, text}) => {
  const style = {
    color: '#FFFFFF'
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
        <button onClick={() => history.push('../reports')} div className ='back'>
          <font color = '#FFFFFF' face='Candara' size = '6'>
            ←
          </font>
        </button>
        <Button onClick={() => history.push('../../admin')} text='Home'/>
        <Button onClick={() => history.push('../../')} text='Log Out'/>
        <br/><br/><br/><br/>
        <h1>
          <font color = '#FFFFFF' face='Candara'>
            &nbsp; &nbsp;
            All time active users
          </font>
        </h1>

        {activeUsers.map((result) => {
                return <ActiveUser username={result.username} 
                        tracks={result.sum}/>  
        })}
    </div>
  );
}
export default ActiveUsers;