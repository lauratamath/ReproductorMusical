import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import './FreeAccount.css';

const Button = ({onClick, text}) => {
  const style = {
    color: '#FFFFFF'
  }
  return <button onClick={onClick} style={style} className = 'botonesFree'>{text}</button>
}

const Error = ({error}) => {
  const style = {
    color: 'red'
  }
  return <h5 style={style}>{error}</h5> 
}

const Input = ({type, onChange, name}) => { 
  const style = {
    display: 'block',
    width: '200px',
    height: '15px',
    fontFamily: 'Candara',
    fontSize: '15px'
  }
  return <input type={type} onChange={onChange} style={style} name={name}/>
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

const GetCreator = () => {
  const history = useHistory()
  const [userAccount, setUserAccount] = useState([])
  const [changeCreator, setChangeCreator] = useState({creatorsType: 'Artist', artist:'', actualMethod: '', password: ''})
  const [showError, setShowError] = useState('')
  const actualUsername = localStorage.getItem('actualUsername')

  useEffect(() => {
    getUsersAccounts();
  }, []);


  const handleChange = (event) => {
    setChangeCreator({
      ...changeCreator,
      [event.target.name] : event.target.value
    })
  } 
  function getUsersAccounts() {
    fetch('http://localhost:3001')
      .then(r => r.json())
      .then(r => setUserAccount(r))
  }

  function verifyPassword() {
    const indexUser = userAccount.map(({ username }) => username).indexOf(actualUsername)
    const actualMethod = changeCreator.actualMethod
    const artist = changeCreator.artist
    const income = 0

    var error = ''
    if (userAccount[indexUser].password === changeCreator.password) {
        const actualType = 'Creator'
        //CAMBIAMOS EL TIPO
        fetch('http://localhost:3001', { 
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({actualType, actualUsername}),
        }).then(response => {
            return response.text();
        }).then(data => {
            getUsersAccounts()
        }); 
    } else {
        error  = 'Incorrect password'
    }

    if (actualMethod === '' || artist === '' ){
        error = 'Fill all the form'
    } else if (artist.name < 4) {
        error = 'Artistic name is too short'
    } else {
        const actualType = changeCreator.creatorsType
        //AGREGAMOS TARJETA
        fetch('http://localhost:3001/creatorsmembership', { 
          method: 'POST',
          headers: {
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({actualUsername, actualDate, actualMethod, artist, actualType, income}),
          }).then(response => {
              return response.text();
          }).then(data => {
              getUsersAccounts()
          });     
        error  = 'Now you are a creator!'
    }
    setShowError(error)
  }
  
  function homeCreator() {
    const indexUser = userAccount.map(({ username }) => username).indexOf(actualUsername)

    if (showError === 'Now you are a creator!'){
      history.push('../../creator')
    } else if (userAccount[indexUser].type === 'Free') { 
      history.push('../../free')
    } else if (userAccount[indexUser].type === 'Premium') { 
        history.push('../../premium')
      }
  }

    return (
    <div>
        <Button onClick={() => history.push('../../../home')} text='Log Out'/>
        <Button onClick={homeCreator} text='Home'/>
        

        <h1>
          <font color = '#FFFFFF' face='Candara'  size = '7'>
            &nbsp; &nbsp;
            Get creator
          </font>
        </h1>

        <center>
        <label>
          <font color = '#FFFFFF' face='Candara'>
            <br/><br/>
            Card Number
            <br/><br/>
          </font>
        </label>
        <Input type='text' onChange={handleChange} name='actualMethod'/>
        <br/><br/>

        <label>
          <font color = '#FFFFFF' face='Candara'>
            Artistic name
            <br/><br/>
          </font>
        </label>
        <Input type='text' onChange={handleChange} name='artist'/>
        <br/><br/>

        <div>
        <label>
          <font color = '#FFFFFF' face='Candara'>
            Type of Creator &nbsp; &nbsp;
          </font>
        </label>
        <select onChange={handleChange} name='creatorsType'>
            <option value="Artist" >Artist</option>
            <option value="Manager">Manager</option>
        </select></div> <br/><br/>

        <label>
          <font color = '#FFFFFF' face='Candara'>
            Password Confirmation
            <br/><br/>
          </font>
        </label>
        <Input type='password' onChange={handleChange} name='password'/>
        <br/><br/>

        <Error error={showError}/>
        <button onClick={verifyPassword} div className ='otro'>
          <font color = '#FFFFFF' face='Candara'>
            <b>
              Get Creator
            </b>
          </font>
        </button>
      </center>
    </div>
  );
}
export default GetCreator;