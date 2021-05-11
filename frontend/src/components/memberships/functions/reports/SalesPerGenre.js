import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import './reports.css';
import icono from './images/sales.png';

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

const SalesPerGenre_style = ({genre, tracks}) => {
  const style = {
    color: '#FFFFFF'
  }

    return <div style={style}>
      <div>Genre: {genre}</div>
      <div>Sales: {tracks}</div>
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

const SalesPerGenre = () => {
  const history = useHistory()
  const [selledGenre,setSelledGenre]= useState([])
  const [week,setWeek]=useState({initWeek: '', finalWeek: ''})
  const [showError, setShowError] = useState('')
    useEffect(() => {
        getSalesPerGenre();
    }, []);

    

    const handleChange = (event) => {
    setWeek({
      ...week,
      [event.target.name] : event.target.value
    })
  } 


    async function getSalesPerGenre() {
      var temporary = []
      var auxTemp = []
      const json = await fetch('http://localhost:3001/SalesPerGenre')
        .then(response => response.json())
  
      var error = ''

      if ((week.initWeek === '') ||  (week.finalWeek === '')){
          error = 'Fill all the form'
      }
      if (error === ''){
        if(json.length>0){
          var initial = new Date(week.initWeek)
          var final = new Date(week.finalWeek)
          if(initial.getFullYear() === final.getFullYear()){
            for(var a=0; a<json.length; a++){
              if((json[a].anio === initial.getFullYear()) && (json[a].semana >= parseInt(getWeekNumber(new Date(week.initWeek)))) && (json[a].semana <= parseInt(getWeekNumber(new Date(week.finalWeek))))){
              temporary.push(json[a])
              }
            }
          }
          if(initial.getFullYear() < final.getFullYear()){
            for(var c=1; c<=(final.getFullYear()-initial.getFullYear()); c++){
              for(var b=0; b<json.length; b++){
                if((json[b].anio === initial.getFullYear()) && (json[b].semana >= parseInt(getWeekNumber(new Date(week.initWeek))))){
                  temporary.push(json[b])
                }
                if((initial.getFullYear()+c < final.getFullYear())){
                  if((json[b].anio === initial.getFullYear()+c)){
                    temporary.push(json[b])
                  }
                }
                if((initial.getFullYear()+c === final.getFullYear())){
                  if((json[b].anio === final.getFullYear()) && (json[b].semana <= parseInt(getWeekNumber(new Date(week.finalWeek))))){
                    temporary.push(json[b])
                  }
                }
              }
            }  
          }
          if(temporary.length>0){
            var genreList = []
            for(var d=0; d<temporary.length; d++){
              if((genreList.includes(temporary[d].gender) === false)){
                genreList.push(temporary[d].gender)
              }
            }
            for(var e=0; e<genreList.length; e++){
              var count = 0
              var finalGenre = {}
              for(var f=0; f<temporary.length; f++){
                if(genreList[e] === temporary[f].gender){
                  count += parseInt(temporary[f].sum)
                }
              }
              finalGenre = {"gender":genreList[e],"sum":count}
              auxTemp.push(finalGenre)
            }
          }
        }
        setSelledGenre(auxTemp)
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
           Sales Per Genre
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
              Final Dates<br/>
            </font><br/>
          </label>
          <Input type="text" onChange={handleChange} name="finalWeek"/>
          <h5>
            <font face ='Candara' color ='#FFFFFF'>
                Insert date in this format: January 1, 2020<br/>
            </font><br/>
          </h5>
          <Error error={showError}/>
          <button onClick={ getSalesPerGenre } className='botones'>
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
            <div class='verticalCenter'><img class="active" src={icono} width="250"/></div>
            <div>{selledGenre.map((result) => {
                    return <SalesPerGenre_style genre={result.gender} 
                            tracks={result.sum}/>  
            })}
            </div>
          </div>
        </center>
    </div>
  );
}
export default SalesPerGenre;