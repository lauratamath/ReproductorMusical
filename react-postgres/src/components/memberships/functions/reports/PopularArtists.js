import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";

const Button = ({onClick, text}) => {
  return <button onClick={onClick}>{text}</button>
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
        <Button onClick={() => history.push('../reports')} text='Go Back'/>
        <Button onClick={() => history.push('../../admin')} text='Home'/>
        <Button onClick={() => history.push('../../')} text='Log Out'/>

        <h1>Pantalla principal popular artists</h1>
        <h2>Popular artists last three months</h2>
        
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