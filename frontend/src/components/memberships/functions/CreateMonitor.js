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
  return <input type='text' onChange={onChange} style={style} placeholder='monitor name'/>
}


const OptionMonitor = ({id, option, selectedOption}) => {
  return (
  <div>
    <label >
      <input type="checkbox" onChange={selectedOption} id={id} />
      <span class="checkmark"></span>
      {option}
    </label>
  </div>
  )
}

const CreateMonitor = () => {
  const history = useHistory()
  const [search, setSearch] = useState('')
  const selectedOptions = []
  const [optionsForMonitor, setOptionsForMonitor] = useState([])
  const [showError, setShowError] = useState('')
  

  useEffect(() => {
    getMonitorsFeatures()
  }, [])

  const selectedOption = (event) => {
    if (selectedOptions.includes(event.target.id)){
      // Se deselecciona
      selectedOptions.splice(selectedOptions.indexOf(event.target.id), event.target.id)
    } else {
      // Se selecciona
      selectedOptions.push(event.target.id)
    }
  } 

  async function getMonitorsFeatures() {
    const json = await fetch('http://localhost:3001/monitorsFeatures')
      .then(r => r.json())

    setOptionsForMonitor(json)
  }

  const handleChange = (event) => {
    setSearch(event.target.value)
  } 

  const createMonitor = () => {
    const monitorName = search

    if (selectedOptions.length > 0 && monitorName !== '') {
    fetch('http://localhost:3001/monitorTypes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({monitorName}),
      }).then(response => {
      return response.text();
    })

    for (var i=0; i<selectedOptions.length; i++){
      const idFeature = selectedOptions[i]

      fetch('http://localhost:3001/monitorsFeatures', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({monitorName, idFeature}),
        }).then(response => {
        return response.text();
      })     
    }
      setShowError('Monitor type has been created!')
    } else {
      setShowError('Fill the name and select at least one feature')
    }
    
  }


  return (
    <div>
        <Button onClick={() => history.push('../admin')} text='Home'/>
        <Button onClick={() => history.push('../')} text='Log Out'/>

        <h1>Pantalla principal Create Monitor</h1>

        <Input onChange={handleChange}/>

        <center>
          {optionsForMonitor?.map((result) => { 
            return <OptionMonitor 
              id={result.idfeature}  
              option={result.nametask} 
              selectedOption={selectedOption}
            />
          })}
        </center>


        <Accept onClick={createMonitor} text = "Create Monitor" />
        <Error error={showError}/>
    </div>
  )
}
export default CreateMonitor