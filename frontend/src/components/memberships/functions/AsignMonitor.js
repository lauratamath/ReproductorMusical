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

const Accept = ({onClick, text}) => {
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

const UserSearched = ({username, giveMonitor}) => { 
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
          </div>
         <Accept onClick={giveMonitor} text = "Asign Monitor" />
      </div>
}

const OptionMonitor = ({id, option, selectedOption}) => {
  return (
  <div>
    <label >
      <input type="radio" onChange={selectedOption} id={id} name="MonitorType" />
      <span class="checkmark"></span>
      {option}
    </label>
  </div>
  )
}

const AsignMonitor = () => {
  const history = useHistory()
  const [search, setSearch] = useState('')
  const [possibleMonitors, setPossibleMonitors] = useState([])
  const [accountToGetMonitor, setAccountToGetMonitor] = useState()
  const [optionsForMonitor, setOptionsForMonitor] = useState([])
  const [monitorType, setMonitorType] = useState()
  const [showError, setShowError] = useState('')
  const actualUsername = localStorage.getItem('actualUsername')

  useEffect(() => {
    getPossibleMonitors()
  }, [])

  const selectedOption = (event) => {
    setMonitorType(event.target.id)
  } 

  function getPossibleMonitors() {
    fetch('http://localhost:3001/possibleMonitors')
      .then(r => r.json())
      .then(r => setPossibleMonitors(r))
  }

  async function getMonitorMembership() {
    const json = await fetch('http://localhost:3001/monitorMembership')
      .then(r => r.json())

    setOptionsForMonitor(json)
  }

  const handleChange = (event) => {
    setSearch(event.target.value)
  } 

  function searchAccount() {
    try {
      for (var a=0; a<possibleMonitors.length; a++) {
          if (possibleMonitors[a].username === search) {
            setAccountToGetMonitor(possibleMonitors[a].username)
            
            getMonitorMembership()
            break
          }
      }
    } catch (e) {}
  }

  const giveMonitor = () => {
    const monitorName = monitorType
    const username = accountToGetMonitor

    if (monitorName !== undefined){
      fetch('http://localhost:3001/monitorType', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, monitorName}),
            }).then(response => {
            return response.text();
        })

        fetch('http://localhost:3001/actualUsername', {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({actualUsername}),
              }).then(response => {
              return response.text();
          })

      setShowError('Correctly created new monitor!')
    } else {
      setShowError('Select monitor type!')
    }
  }

  return (
    <div>
        <Button onClick={() => history.push('../monitor')} text='Home'/>
        <Button onClick={() => history.push('../')} text='Log Out'/>

        <h1>Pantalla principal Asign Monitor</h1>

        <Input onChange={handleChange}/>
        <button onClick={searchAccount} className='botonSearch'>🔍</button>

        <br/><br/>

        {accountToGetMonitor ?
           <UserSearched username={accountToGetMonitor} 
           giveMonitor={giveMonitor} />
          : null
        }

        <center>
          {optionsForMonitor?.map((result) => { 
            return <OptionMonitor 
              id={result.idmonitor}  
              option={result.namemonitor} 
              selectedOption={selectedOption}
            />
          })}
        </center>



        <Error error={showError}/>
    </div>
  )
}
export default AsignMonitor