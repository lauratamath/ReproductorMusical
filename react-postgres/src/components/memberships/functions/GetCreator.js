import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";

const Button = ({onClick, text}) => {
  return <button onClick={onClick}>{text}</button>
}

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

const date = () => {
  const today = new Date()
  const month = today.getMonth()+1

  if (month.toString().length === 1){
      return today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + today.getDate();
  } else {
      return today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  }
}

const actualUsername = localStorage.getItem('actualUsername')
const actualDate = date()

const GetCreator = () => {
  const history = useHistory()
  const [userAccount, setUserAccount] = useState([])
  const [changeCreator, setChangeCreator] = useState({creatorsType: 'Artist', artist:'', actualMethod: '', password: ''})
  const [showError, setShowError] = useState('')
  const [type, setType] = useState('')

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
    setType(userAccount[indexUser].type)
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
      console.log(showError)
    if (showError === 'Now you are a creator!'){
      history.push('../../creator')
    } else if (type === 'Free') { 
      history.push('../../free')
    } else if (type === 'Premium') { 
        history.push('../../premium')
      }
  }

    return (
    <div>
        <Button onClick={homeCreator} text='Home'/>
        <Button onClick={() => history.push('../../../home')} text='Log Out'/>

        <h1>Pantalla principal get creator</h1>

        <label>Card Number</label>
        <Input type='text' onChange={handleChange} name='actualMethod'/>

        <label>Artistic Name</label>
        <Input type='text' onChange={handleChange} name='artist'/>

        <div>
        <label>Type of Creator</label>
        <select onChange={handleChange} name='creatorsType'>
            <option value="Artist" >Artist</option>
            <option value="Manager">Manager</option>
        </select></div>

        <label>Password Confirmation</label>
        <Input type='password' onChange={handleChange} name='password'/>

        <Error error={showError}/>
        <Button onClick={verifyPassword} text='Get Creator'/>
    </div>
  );
}
export default GetCreator;