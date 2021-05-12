import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import './reports.css';
import icono from './images/artists.png';

const Error = ({error}) => {
  const style = {
    color: 'red'
  }
  return <h5 style={style}>{error}</h5> 
}

const Input = ({type, onChange, name}) => { 
  const style = {
    display: 'block'
  }
  return <input type={type} onChange={onChange} style={style} name={name}/>
}

const Button = ({onClick, text}) => {
  const style = {
    color: '#FFFFFF',
    fontFamily: 'Candara',
    alignContent: 'left',
    margin: '4px',
  }
  return <button onClick={onClick} style={style} className = 'botonesHL'>{text}</button>
}

const MostSelledArtist_style = ({artist, sum}) => {
  const style = {
    color: '#FFFFFF'
  }
    return <div style={style}>
      <div>Artist: {artist}</div>
      <div>Sales: {sum}</div>
      <div> <br/> </div>
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

const getWeekNumber = (indicatedDate) => {
    var date1 = new Date(indicatedDate); 
    var oneJan =  new Date(date1.getFullYear(), 0, 1); 
    var numberOfDays =  Math.floor((date1 - oneJan) / (24 * 60 * 60 * 1000));  
    var result = Math.ceil(( date1.getDay() + 1 + numberOfDays) / 7);     

    return result;
  }
  
const actualWeek = getWeekNumber(date());

const MostSelledArtist = () => {
  const history = useHistory()
  const [artistDate,setArtistDate]= useState([])
  const [requiredInfo,setRequiredInfo]=useState({initWeek: '', finalWeek: '',nArtists: ''})
  const [showError, setShowError] = useState('')
    useEffect(() => {
        getMostSelledArtists();
    }, []);

    

    const handleChange = (event) => {
    setRequiredInfo({
      ...requiredInfo,
      [event.target.name] : event.target.value
    })
  } 


    async function getMostSelledArtists() {
      var temporary = []
      var auxTemp = []
      const json = await fetch('http://localhost:3001/mostSelledArtist')
        .then(response => response.json())
  
      var error = ''

      if ((requiredInfo.initWeek === '') ||  (requiredInfo.finalWeek === '')){
          error = 'Fill all the form'
      }
      if (error === ''){
        if(json.length>0){
          var initial = new Date(requiredInfo.initWeek)
          var final = new Date(requiredInfo.finalWeek)
          if(initial.getFullYear() === final.getFullYear()){
            for(var a=0; a<json.length; a++){
              if((json[a].anio === initial.getFullYear()) && (json[a].semana >= parseInt(getWeekNumber(new Date(requiredInfo.initWeek)))) && (json[a].semana <= parseInt(getWeekNumber(new Date(requiredInfo.finalWeek))))){
              temporary.push(json[a])
              }
            }
          }
          if(initial.getFullYear() < final.getFullYear()){
            for(var c=1; c<=(final.getFullYear()-initial.getFullYear()); c++){
              for(var b=0; b<json.length; b++){
                if((json[b].anio === initial.getFullYear()) && (json[b].semana >= parseInt(getWeekNumber(new Date(requiredInfo.initWeek))))){
                  temporary.push(json[b])
                }
                if((initial.getFullYear()+c < final.getFullYear())){
                  if((json[b].anio === initial.getFullYear()+c)){
                    temporary.push(json[b])
                  }
                }
                if((initial.getFullYear()+c === final.getFullYear())){
                  if((json[b].anio === final.getFullYear()) && (json[b].semana <= parseInt(getWeekNumber(new Date(requiredInfo.finalWeek))))){
                    temporary.push(json[b])
                  }
                }
              }
            }  
          }
          if(temporary.length>0){
            var artists = []
            for(var d=0; d<temporary.length; d++){
              if((artists.includes(temporary[d].artist) === false) && (artists.length < parseInt(requiredInfo.nArtists))){
                artists.push(temporary[d].artist)
              }
            }
            for(var e=0; e<artists.length; e++){
              var count = 0
              var finalArtist = {}
              for(var f=0; f<temporary.length; f++){
                if(artists[e] === temporary[f].artist){
                  count += parseInt(temporary[f].sum)
                }
              }
              finalArtist = {"artist":artists[e],"sum":count}
              auxTemp.push(finalArtist)
            }
          }
        }
        setArtistDate(auxTemp)
        setShowError(error)
      }
    }

    return(
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
           Best Seller Artists
          </font>
        </h1>
        <br/><br/>
        <h2>
            <font color = '#FFFFFF' face='Candara'>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                Actual date: {actualDate}
                <br/><br/>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                Actual years week: {actualWeek}
            </font>
        </h2>

        <center>
          <label>
            <font face ='Candara' color ='#FFFFFF'>
              Initial Date<br/>
            </font><br/>
          </label>
          <Input type="text" onChange={handleChange} name="initWeek"/>
          <br/><br/>
          <label>
            <font face ='Candara' color ='#FFFFFF'>
              Final Date<br/>
            </font><br/>
          </label>
          <Input type="text" onChange={handleChange} name="finalWeek"/>
          <br/><br/>
          <label>
            <font face ='Candara' color ='#FFFFFF'>
              Artist Ranking Size<br/>
            </font><br/>
          </label>
          <Input type="text" onChange={handleChange} name="nArtists"/>
          <h5>
            <font face ='Candara' color ='#FFFFFF'>
                Insert date in this format: January 1, 2020<br/>
            </font><br/>
          </h5>
          <Error error={showError}/>
          <button onClick={ getMostSelledArtists } className='botones'>
            <font color ='#FFFFFF'>
              <b>
                Submit
              </b>
            </font>
          </button>
          <br/><br/><br/><br/>
            
        </center>
        <center>
          <div class='column'>
            <div class='verticalCenter'><img class="active" src={icono} width="230"/></div>
            <div>{artistDate.map((result) => {
                    return <MostSelledArtist_style artist={result.artist} 
                            sum={result.sum}/>  
            })}
            </div>
          </div>
        </center>
    </div>
  );
}
export default MostSelledArtist;