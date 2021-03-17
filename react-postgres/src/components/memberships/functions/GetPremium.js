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

const ChangeType = () => {
  const history = useHistory()
  const [userAccount, setUserAccount] = useState([])
  const [changePremium, setChangePremium] = useState({actualMethod: '', password: ''})
  const [showError, setShowError] = useState('')

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
    var actualType = userAccount[indexUser].type;

    if(actualType === 'Free' || actualType === 'Creator'){
      actualType = 'Premium'
    } else {
      actualType = 'Free'
    }


    var error = ''
    if (userAccount[indexUser].password === changePremium.password) {
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
      if(actualType === 'Creator') {
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
      if(actualType === 'Premium'){
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
        }
        error  = 'Now you are premium!'
      } else {
        error  = 'Incorrect password'
      }

    setShowError(error)
  }

  function homePremium() {
    if (showError === 'Now you are premium!'){
      history.push('../../premium')
    } else { 
      history.push('../../free')
    }
  }

    return (
    <div>
        <Button onClick={homePremium} text='Home'/>
        <Button onClick={() => history.push('../../../home')} text='Log Out'/>

        <h1>Pantalla principal get premium</h1>

        <label>Card Number</label>
        <Input type='text' onChange={handleChange} name='actualMethod'/>

        <label>Password Confirmation</label>
        <Input type='password' onChange={handleChange} name='password'/>

        <Error error={showError}/>
        <Button onClick={verifyPassword} text='Get Premium'/>
    </div>
  );
}
export default ChangeType;