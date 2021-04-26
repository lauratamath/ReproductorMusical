import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import './reports.css';
import icono from './images/generos.png';

const Button = ({onClick, text}) => {
  const style = {
    color: '#FFFFFF'
  }
  return <button onClick={onClick} style={style} className = 'botonesHL'>{text}</button>
}

const PopularGender = ({genderName, sum}) => {
  const style = {
    color: '#FFFFFF',
    fontFamily: 'Candara',
    alignContent: 'left',
    margin: '4px',
  }

  if(genderName === 'not available'){
    genderName = 'Spotify'
  }

    return <div style={style}>
      <div>Gender: {genderName}</div>
      <div>Total reproductions: {sum}</div>
      <div> <br/> </div>
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
        <button onClick={history.goBack} div className ='back'>
          <font color = '#FFFFFF' face='Candara' size = '6'>
            ←
          </font>
        </button>
        <Button onClick={() => history.push('../../')} text='Log Out'/>
        <br/><br/><br/><br/>
        <h1>
          <font color = '#FFFFFF' face='Candara'>
            &nbsp; &nbsp; &nbsp;
            All time popular genders
          </font>
        </h1>
        <br/><br/><br/><br/>
        <center>
          <div class='column'>
            <div class='verticalCenter'><img class="popular" src={icono} width="125"/></div>
            <div>{popularGenders.map((result) => {
                    return <PopularGender genderName={result.gender} 
                            sum={result.sum}/>  
            })}</div>
          </div>
          
        </center>
    </div>
  );
}
export default PopularGenders;