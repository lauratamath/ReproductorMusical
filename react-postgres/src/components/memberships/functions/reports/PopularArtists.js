import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import './reports.css';

const Button = ({onClick, text}) => {
  const style = {
    color: '#FFFFFF'
  }
  return <button onClick={onClick} style={style} className = 'botonesHL'>{text}</button>
}

const Artist = ({artistName, month, sum, year}) => {
  const style = {
    color: '#FFFFFF'
  }

    return <div style={style}>
      <div>Artist: {artistName}</div>
      <div>Listened {sum} times on {month}/{year}</div>
      </div>
}

const date = () => {
    const today = new Date()
    const month = today.getMonth()+1
  
    if (month.toString().length === 1){
        return today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + today.getDate();
    } else {
        return today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    }
  }
  
const actualDate = date()

const PopularArtists = () => {
  const history = useHistory()
  const [mostPopularArtists, setMostPopularArtists] = useState([])
    
    useEffect(() => {
        getPopularArtists();
    }, []);

    async function getPopularArtists() {
        var temporary = []
        const json = await fetch('http://localhost:3001/popularArtists')
            .then(response => response.json())

        if(json.length>0){
            for(var a=0; a<json.length; a++){
                if(json[a].mes == parseInt(actualDate.substring(5,7)) && json[a].anio.toString() == actualDate.substring(0, 4)) {
                    temporary.push(json[a])
                } else if(json[a].mes == parseInt(actualDate.substring(5,7)-1) && json[a].anio.toString() == actualDate.substring(0, 4)) {
                    temporary.push(json[a])
                } else if(json[a].mes == parseInt(actualDate.substring(5,7)-2) && json[a].anio.toString() == actualDate.substring(0, 4)) {
                    temporary.push(json[a])
              }
            }
        }
        setMostPopularArtists(temporary)
    }

    return (
    <div>
        <button onClick={() => history.push('../reports')} div className ='back'>
          <font color = '#FFFFFF' face='Candara' size = '6'>
            ←
          </font>
        </button>
        <Button onClick={() => history.push('../../')} text='Log Out'/>
        <Button onClick={() => history.push('../../admin')} text='Home'/>
        
        <br/><br/><br/>
        <h1>
          <font color = '#FFFFFF' face='Candara'>
            &nbsp; &nbsp; &nbsp;
            Pantalla principal popular artists
          </font>
        </h1>

        <h2>
          <font color = '#FFFFFF' face='Candara'>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            Popular artists last three months
          </font>
        </h2>
        
        {mostPopularArtists.map((result) => {
                return <Artist artistName={result.artist} 
                        month={result.mes}
                        sum={result.sum}
                        year={result.anio}/>  
        })}
    </div>
  );
}
export default PopularArtists;
