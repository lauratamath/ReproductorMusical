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

const Availability = ({onClick, text}) => {
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

const UserSearched = ({username, artisticName, inactivate, activate}) => { 
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
                  <font color = '#FFFFFF' face='Candara'>
                      <b>
                      {artisticName}
                      </b>
                  </font>
              </h5>
          </div>
         <Availability onClick={inactivate} text = "Inactivate" />
         <Availability onClick={activate} text = "Activate" />
      </div>
}

const DeactivateCreator = () => {
  const history = useHistory()
  const [search, setSearch] = useState('')
  const [creatorsAccounts, setCreatorsAccounts] = useState([])
  const [accountToDeactivate, setAccountToDeactivate] = useState()
  const [artistToDeactivate, setArtistToDeactivate] = useState()
  const [showError, setShowError] = useState('')

  useEffect(() => {
    getCreatorsMembership()
  }, [])

  function getCreatorsMembership() {
    fetch('http://localhost:3001/creatorsmembership')
      .then(r => r.json())
      .then(r => setCreatorsAccounts(r))
  }

  const handleChange = (event) => {
    setSearch(event.target.value)
  } 

  function searchAccount() {
    try {
      for (var a=0; a<creatorsAccounts.length; a++) {
          if (creatorsAccounts[a].username === search || creatorsAccounts[a].artist === search) {
              setAccountToDeactivate(creatorsAccounts[a].username)
              setArtistToDeactivate(creatorsAccounts[a].artist)
              break
          }
      }
    } catch (e) {}
  }

  const deactivateAccount = () => {
    const availability = false
    const username = accountToDeactivate
    const artisticName = artistToDeactivate

    fetch('http://localhost:3001/deactivateCreator', {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({artisticName, availability, username}),
          }).then(response => {
          return response.text();
      });
      setShowError('Correctly inactivated!')
  }

  const activateAccount = () => {
    const availability = true
    const username = accountToDeactivate
    const artisticName = artistToDeactivate

    fetch('http://localhost:3001/deactivateCreator', {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({artisticName, availability, username}),
          }).then(response => {
          return response.text();
      });
      setShowError('Correctly activated!')
  }

  return (
    <div>
        <Button onClick={() => history.push('../monitor')} text='Home'/>
        <Button onClick={() => history.push('../')} text='Log Out'/>

        <h1>Pantalla principal Deactivate Creator Account</h1>

        <Input onChange={handleChange}/>
        <button onClick={searchAccount} className='botonSearch'>🔍</button>

        <br/><br/>

        {accountToDeactivate ?
           <UserSearched username={accountToDeactivate} artisticName={artistToDeactivate}
           inactivate={deactivateAccount} activate={activateAccount} /> : null
        }

        <Error error={showError}/>
    </div>
  )
}
export default DeactivateCreator