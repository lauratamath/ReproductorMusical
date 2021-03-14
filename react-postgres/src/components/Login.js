import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";


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

const LogIn = () => {
  const [userAccount, setUserAccount] = useState([])
  const [existingAccount, setExistingAccount] = useState({username: '', password: ''})
  const [showError, setShowError] = useState('')
  const history = useHistory()

  useEffect(() => {
    getUsersAccounts();
  }, []);

  function getUsersAccounts() {
      fetch('http://localhost:3001')
        .then(r => r.json())
        .then(r => setUserAccount(r))
  }
  console.log('render', userAccount)

 
  const handleChange = (event) => {
    setExistingAccount({
      ...existingAccount,
      [event.target.name] : event.target.value
    })
  } 


  function verifyUserAccount() {
    const indexUser = userAccount.map(({ username }) => username).indexOf(existingAccount.username)
    const indexEmail = userAccount.map(({ email }) => email).indexOf(existingAccount.username)
    var error = ''
    var accountType = ''

    try {
      if (userAccount[indexUser].password === existingAccount.password) {
          console.log('Pasa a free/premium/artist')
          accountType = userAccount[indexUser].type
      } else {
        error  = 'Incorrect username or password'
      }
    } catch (e) {
      try {
        if (userAccount[indexEmail].password === existingAccount.password) {
          console.log('Pasa a free/premium/artist')
          accountType = userAccount[indexUser].type
        } else {
          error  = 'Incorrect username or password'
        }
      } catch (a) {
        error  = 'Incorrect username or password'
      }
    }
    setShowError(error)

    if (error === ''){
      if(accountType === 'Free'){
        history.push('login/free')
      } else if (accountType === 'Premium'){
        history.push('login/premium')
      } else if(accountType === 'Creator'){
        history.push('login/creator')
      } else if(accountType === 'Admin'){
        history.push('login/admin')
      }
    }
  }
  
  return (
    <div>
        <label>Username or Email Address</label>
        <Input type="text" onChange={handleChange} name="username"/>

        <label>Password</label>
        <Input type="password" onChange={handleChange} name="password"/>  

        <button onClick={verifyUserAccount}>Log In</button>

        <Error error={showError}/>
    </div>
  )
}
export default LogIn;