import React, {useState, useEffect} from 'react';

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

const App = () => {
  const [userAccount, setUserAccount] = useState([])
  const [newAccount, setNewAccount] = useState({username: '', email: '', emailCon: '', password: ''})
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [emailError, setEmailError] = useState('')

  useEffect(() => {
    getUsersAccounts();
  }, []);

  useEffect(() => {
    verifyUserAccount();
  }, [newAccount]);

  function getUsersAccounts() {
      fetch('http://localhost:3001')
        .then(r => r.json())
        .then(r => setUserAccount(r))
  }
  console.log('render', userAccount)

 
  const handleChange = (event) => {
    setNewAccount({
      ...newAccount,
      [event.target.name] : event.target.value
    })
  } 

  function verifyUserAccount() {
    if (newAccount.username.length <= 10 && newAccount.username.length >= 4){
      setUsernameError('')
      if ((userAccount.map(({ username }) => username)).includes(newAccount.username)){
        setUsernameError('Username already exists')
      }
    } else if (newAccount.username.length > 0 && newAccount.username.length < 10) {
      setUsernameError('Username is too short')
    } else if (newAccount.username.length > 10) {
      setUsernameError('Username is too long')
    }

    if(newAccount.password.length <= 8 && newAccount.password.length > 0){
      setPasswordError('Password is too short')
    } else {
      setPasswordError('')
    }

    if(newAccount.email === newAccount.emailCon){
      setEmailError('')
      if ((userAccount.map(({ email }) => email)).includes(newAccount.email)){
        setEmailError('Email already registered')
      }
    } else if (newAccount.emailCon.length > 0) { 
      setEmailError('Emails do not match')
    }
  }

  function createUserAccount() {
    if (emailError === '' && usernameError === '' && passwordError === ''){
      const password = newAccount.password
      const type = 'Free'

      const username = newAccount.username

      fetch('http://localhost:3001/useraccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password, type}),
        }).then(response => {
          return response.text();
        }).then(data => {
          alert(data);
          getUsersAccounts();
      });
    }
  }

  
  return (
    <div>
        <label>Username</label>
        <Input type="text" onChange={handleChange} name="username"/>
        <Error error={usernameError}/>

        <label>Email Address</label>
        <Input type="email" onChange={handleChange} name="email"/>
        <label>Confirm Email Adress</label>
        <Input type="email" onChange={handleChange} name="emailCon"/>
        <Error error={emailError}/>

        <label>Password</label>
        <Input type="password" onChange={handleChange} name="password"/>
        <Error error={passwordError}/>      

        <button onClick={createUserAccount}>Submit</button>
    </div>
  );
}
export default App;