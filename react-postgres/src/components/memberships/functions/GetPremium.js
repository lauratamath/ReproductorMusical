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
    width: '170px',
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
const ChangeType = () => {
  const history = useHistory()
  const [userAccount, setUserAccount] = useState([])
  const [changePremium, setChangePremium] = useState({actualMethod: '', password: ''})
  const [showError, setShowError] = useState('')
  const actualUsername = localStorage.getItem('actualUsername')

  useEffect(() => {
    getUsersAccounts();
  }, []);


  const handleChange = (event) => {
    setChangePremium({
      ...changePremium,
      [event.target.name] : event.target.value
    })
  } 

  function getUsersAccounts() {
    fetch('http://localhost:3001')
      .then(r => r.json())
      .then(r => setUserAccount(r))
  }


  console.log('render', userAccount)

  function verifyPassword() {
    const indexUser = userAccount.map(({ username }) => username).indexOf(actualUsername)
    const actualMethod = changePremium.actualMethod

    var error = ''
    if (userAccount[indexUser].password === changePremium.password) {
        const actualType = 'Premium'
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
      //SI ERA UN CREATOR LO QUITAMOS DE LA TABLA
      if(userAccount[indexUser].type === 'Creator') {
        fetch('http://localhost:3001/creatorsmembership', { 
          method: 'DELETE',
          headers: {
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({actualUsername}),
          }).then(response => {
              return response.text();
          }).then(data => {
              getUsersAccounts()
          }); 
      }
        
      //SI ERA UN USER FREE SIGNIFICA QUE AGREGAMOS TARJETA
        fetch('http://localhost:3001/premiummembership', { 
          method: 'POST',
          headers: {
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({actualUsername, actualDate, actualMethod}),
          }).then(response => {
              return response.text();
          }).then(data => {
              getUsersAccounts()
          });     
  
        error  = 'Now you are premium!'
      } else {
        error  = 'Incorrect password'
      }

    setShowError(error)
  }

  function homePremium() {
    const indexUser = userAccount.map(({ username }) => username).indexOf(actualUsername)

    if (showError === 'Now you are premium!'){
      history.push('../../premium')
    } else if (userAccount[indexUser].type === 'Creator'){
      history.push('../../creator')
    } else { 
      history.push('../../free')
    }
  }

    return (
    <div>
      <Button onClick={() => history.push('../../../home')} text='Log Out'/>
      <Button onClick={homePremium} text='Home'/><br/>
      <h1>
        <font color = '#FFFFFF' face='Candara'  size = '7'>
          &nbsp; &nbsp;
          Get premium
        </font>
      </h1>

      <center>
        <label>
          <font color = '#FFFFFF' face='Candara'>
            <br/><br/>
            Card Number <br/><br/>
          </font>
        </label>
        <Input type='text' onChange={handleChange} name='actualMethod'/>
        <br/> <br/> <br/>

        <label>
          <font color = '#FFFFFF' face='Candara'>
            Password Confirmation <br/><br/>
          </font>
        </label>
        <Input type='password' onChange={handleChange} name='password'/>
        <br/><br/>
        <Error error={showError}/>

        <button onClick={verifyPassword} div className ='otro'>
          <font color = '#FFFFFF' face='Candara'>
            <b>
              Get Premium
            </b>
          </font>
        </button>
      </center>
    </div>
  );
}
export default ChangeType;