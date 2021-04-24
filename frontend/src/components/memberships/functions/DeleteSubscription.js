import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import './Search.css'
import './FreeAccount.css'

const Error = ({error}) => {
  const style = {
    color: 'red'
  }
  return <h5 style={style}>{error}</h5> 
}

const Button = ({onClick, text}) => {
  const style = {
    color: '#FFFFFF'
  }
  return <button onClick={onClick} style={style} className = 'botonesFree'>{text}</button>
}

const Delete = ({onClick, text}) => {
  const styleButton = {
    width: '90px',
    height: '40px',
    color: '#FFFFFF',
    padding: '5px',
  }

  return <button style={styleButton} onClick={onClick} className = 'set'>{text}</button>
}

const Input = ({onChange}) => { 
  const style = {
    display: 'block',
    width: '400px',
    height: '25px',
    border: '0px',
    borderRadius: '10px',
    paddingLeft: '10px',
    float: 'center' 
  }
  return <input type='text' onChange={onChange} style={style} placeholder='username'/>
}

const UserSearched = ({username, type, deleteAccount}) => { 
  const style = {
      display: 'flex',
      width: '400px',
      height: '100px',
      lineHeight: '0px',
      position: 'relative',
      float: 'center',
      whiteSpace: 'nowrap',
      margin: '0px auto'
  }


  return <div style={style}>
          <div>
              <h4 align ='left'>
                  <font color = '#FFFFFF' face='Candara'>
                      <b>
                      {username}
                      </b>
                  </font>
              </h4>
              <h5 align ='left'>
                  <font color = '#9F9A9A' face='Candara'>
                      {type}
                  </font>
              </h5>
          </div>
         <Delete onClick={deleteAccount} text = "Inactivate" />
      </div>
}

const DeleteSubscriptions = () => {
  const history = useHistory()
  const [search, setSearch] = useState('')
  const [subscriptions, setSubscriptions] = useState([])
  const [accountToFree, setAccountToFree] = useState()
  const [type, setAccountType] = useState()
  const [showError, setShowError] = useState('')
  

  useEffect(() => {
    getSubscriptions()
  }, [])

  function getSubscriptions() {
    fetch('http://localhost:3001/usersSubscriptions')
      .then(r => r.json())
      .then(r => setSubscriptions(r))
  }

  const handleChange = (event) => {
    setSearch(event.target.value)
  } 

  function searchAccount() {
    try {
      for (var a=0; a<subscriptions.length; a++) {
          if (subscriptions[a].username === search) {
              setAccountToFree(subscriptions[a].username)
              setAccountType(subscriptions[a].type)
              break
          }
      }
    } catch (e) {}
  }

  const deleteAccount = () => {
    const username = accountToFree

    fetch('http://localhost:3001/usersSubscriptions', {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({username}),
          }).then(response => {
          return response.text();
      });
      setShowError('Subscription deleted succesfully!')
  }

  return (
    <div>
        <Button onClick={() => history.push('../monitor')} text='Home'/>
        <Button onClick={() => history.push('../')} text='Log Out'/>

        <h1>Pantalla principal Delete Subscription</h1>

        <Input onChange={handleChange}/>
        <button onClick={searchAccount} className='botonSearch'>🔍</button>

        <br/><br/>

        {accountToFree ?
           <UserSearched username={accountToFree} type={type} 
           deleteAccount={deleteAccount} /> : null
        }

        <Error error={showError}/>
    </div>
  )
}
export default DeleteSubscriptions