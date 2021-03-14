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
  const [existingAccount, setExistingAccount] = useState({username: '', password: ''})
  const [error, setError] = useState('')

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

    try {
      if (userAccount[indexUser].password === existingAccount.password) {
          console.log('Pasa a free/premium/artist')
          setError('')
      } 
    } catch (e) {
      if (userAccount[indexEmail].password === existingAccount.password) {
        console.log('Pasa a free/premium/artist')
          setError('')
      }
    } finally {
      setError('Incorrect username or password')
    }
  }

  function loginUserAccount() {
    verifyUserAccount()
    if (error === ''){
        console.log('Entra a su cuenta')
    }
  }
  
  return (
    <div>
        <label>Username or Email Address</label>
        <Input type="text" onChange={handleChange} name="username"/>

        <label>Password</label>
        <Input type="password" onChange={handleChange} name="password"/>  

        <button onClick={loginUserAccount}>Log In</button>
        <Error error={error}/>
    </div>
  );
}
export default App;