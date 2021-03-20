import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";

const Button = ({onClick, text}) => {
  return <button onClick={onClick}>{text}</button>
}

const PopularGender = ({genderName, sum}) => {
  const style = {
    color: '#FFFFFF'
  }

  if(genderName === 'not available'){
    genderName = 'Spotify'
  }

    return <div style={style}>
      <div>Gender: {genderName}</div>
      <div>Total reproductions: {sum}</div>
      </div>
}

const PopularGenders = () => {
  const history = useHistory()
  const [popularGenders, setPopularGenders] = useState([])
    
    useEffect(() => {
        getTotalSongs();
    }, []);

    async function getTotalSongs() {
      const json = await fetch('http://localhost:3001/popularGenders')
        .then(response => response.json())
  
        setPopularGenders(json)
    }

    return (
    <div>
        <Button onClick={() => history.push('../reports')} text='Go Back'/>
        <Button onClick={() => history.push('../../admin')} text='Home'/>
        <Button onClick={() => history.push('../../')} text='Log Out'/>

        <h1>Pantalla principal all time popular genders</h1>

        {popularGenders.map((result) => {
                return <PopularGender genderName={result.gender} 
                        sum={result.sum}/>  
        })}
    </div>
  );
}
export default PopularGenders;