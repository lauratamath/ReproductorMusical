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

const actualUsername = localStorage.getItem('actualUsername')

const ChangeType = () => {
  const history = useHistory()
  const [userAccount, setUserAccount] = useState([])
  const [changePremium, setChangePremium] = useState({password: ''})
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
    var actualType = userAccount[indexUser].type;

    if(actualType === 'Premium' || actualType === 'Creator'){
      actualType = 'Free'
    }


    var error = ''
    if (actualType === 'Creator'){
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
    }

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

        error  = 'Now you are free!'
      } else {
        error  = 'Incorrect password'
      }

    setShowError(error)
  }

  function homeFree() {
    if (showError === 'Now you are free!'){
      history.push('../../free')
    } else { 
      history.push('../../premium')
    }
  }

    return (
    <div>
        <Button onClick={homeFree} text='Home'/>
        <Button onClick={() => history.push('../../../home')} text='Log Out'/>

        <h1>Pantalla principal get free</h1>

        <label>Password Confirmation</label>
        <Input type='password' onChange={handleChange} name='password'/>

        <Error error={showError}/>
        <Button onClick={verifyPassword} text='Cancel Premium'/>
    </div>
  );
}
export default ChangeType;