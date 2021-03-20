import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";

const Button = ({onClick, text}) => {
  return <button onClick={onClick}>{text}</button>
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
        <Button onClick={() => history.push('../reports')} text='Go Back'/>
        <Button onClick={() => history.push('../../admin')} text='Home'/>
        <Button onClick={() => history.push('../../')} text='Log Out'/>

        <h1>Pantalla principal all time active users</h1>

        {activeUsers.map((result) => {
                return <ActiveUser username={result.username} 
                        tracks={result.sum}/>  
        })}
    </div>
  );
}
export default ActiveUsers;