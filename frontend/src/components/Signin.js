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
    display: 'block',
    width: '160px',
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

const SignIn = () => {
  const history = useHistory()
  const [userAccount, setUserAccount] = useState([])
  const [newAccount, setNewAccount] = useState({username: '', email: '', emailCon: '', password: ''})
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [emailDo, setEmailDo] = useState(false)

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
    const doIt = false
    if (emailError === '' && usernameError === '' && passwordError === ''){
      const password = newAccount.password
      const type = 'Free'
      const username = newAccount.username
      const dateSubscribed = actualDate
      const email = newAccount.email

      fetch('http://localhost:3001/useraccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password, type, dateSubscribed}),
      })
      setTimeout(() => {  
      fetch('http://localhost:3001/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, email}),
        }).then(response => {
          return response.text();
        }).then(data => {
          alert(data);
          getUsersAccounts();
      });
      }, 700);
    }
  }

  
  return (
    <div>
      <button onClick={() => history.push('/home')} div className='close'>
          <font color ='#FFFFFF'>
            ???
          </font>
      </button>
      <center>
        <label>
          <font face ='Candara' color ='#FFFFFF'>
            <br/>
            Username<br/>
          </font><br/>
        </label>
        <Input type="text" onChange={handleChange} name="username"/> <br/>
        <Error error={usernameError}/>

        <label>
          <font face ='Candara' color ='#FFFFFF'>
            Email Address<br/>
          </font><br/>
        </label>
        <Input type="email" onChange={handleChange} name="email"/><br/><br/>
        <label>
          <font face ='Candara' color ='#FFFFFF'>
            Confirm Email Adress<br/>
          </font><br/>
        </label>
        <Input type="email" onChange={handleChange} name="emailCon"/><br/>
        <Error error={emailError}/>

        <label>
          <font face ='Candara' color ='#FFFFFF'>
            Password<br/>
          </font><br/>
        </label>
        <Input type="password" onChange={handleChange} name="password"/>
        <Error error={passwordError}/>      

        <button onClick={createUserAccount} div className='botones'>
          <font color ='#FFFFFF'>
            <b>
              Submit
            </b>
          </font>
        </button>

        <label>
          <font face ='Candara' color ='#FFFFFF'>
            <br/><br/>??Ya tienes cuenta? 
          </font><br/>
        </label>
        
        <button onClick={() => history.push('/login')} div className='botones'>
          <font color ='#FFFFFF'>
            <b>
              Log In
            </b>
          </font>
        </button>
        
      </center>
    </div>
  );
}
export default SignIn;