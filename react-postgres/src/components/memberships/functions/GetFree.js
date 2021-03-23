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

const actualDateFree = date()


const ChangeType = () => {
  const history = useHistory()
  const [userAccount, setUserAccount] = useState([])
  const [changePremium, setChangePremium] = useState({password: ''})
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


  function verifyPassword() {
    const indexUser = userAccount.map(({ username }) => username).indexOf(actualUsername)
    const actualTrackFree=0
    var actualType = userAccount[indexUser].type;

    if(actualType === 'Premium' || actualType === 'Creator'){
      actualType = 'Free'
    }


    var error = ''
    if (userAccount[indexUser].type === 'Creator'){
      //SI ERA UN CREATOR LO QUITAMOS DE LA TABLA
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
        //LO AGREGAMOS A FREE
        fetch('http://localhost:3001/freemembership', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({actualUsername, actualDateFree, actualTrackFree}),
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
    const indexUser = userAccount.map(({ username }) => username).indexOf(actualUsername)

    if (showError === 'Now you are free!'){
      history.push('../../free')
    } else if (userAccount[indexUser].type === 'Creator'){
      history.push('../../creator')
    } else { 
      history.push('../../premium')
    }
  }

    return (
    <div>
        <Button onClick={() => history.push('../../../home')} text='Log Out'/>
        <Button onClick={homeFree} text='Home'/>

        <h1>
          <font color = '#FFFFFF' face='Candara'  size = '7'>
           &nbsp; &nbsp;
           Get Free
          </font>
        </h1>
        <center>
        <br/><br/>
        <label>
          <font color = '#FFFFFF' face='Candara'>
            Password Confirmation <br/><br/>
          </font>
        </label>
        <Input type='password' onChange={handleChange} name='password'/>

        <Error error={showError}/>
        <button onClick={verifyPassword} div className ='otro'>
          <font color = '#FFFFFF' face='Candara'>
            <b>
              Cancel Premium
            </b>
          </font>
        </button>
        </center>
    </div>
  );
}
export default ChangeType;