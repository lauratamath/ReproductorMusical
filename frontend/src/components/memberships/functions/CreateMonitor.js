import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import './Search.css'
import './FreeAccount.css'

const Error = ({error}) => {
  const style = {
    color: 'red',
    fontfamily: 'Candara',
  }
  return <h5 style={style}>{error}</h5> 
}

const Button = ({onClick, text}) => {
  const style = {
    color: '#FFFFFF',
  }
  return <button onClick={onClick} style={style} className = 'botonesFree'>{text}</button>
}

const Accept = ({onClick, text}) => {
  const styleButton = {
    width: '100px',
    height: '50px',
    color: '#FFFFFF',
    padding: '5px',
    fontfamily: 'Candara',
    fontsize: '15px',
    fontweight:'bold',
  }

  return <button style={styleButton} onClick={onClick} className = 'setM'>{text}</button>
}

const Input = ({onChange}) => { 
  const style = {
    display: 'block',
    width: '400px',
    height: '25px',
    border: '0px',
    borderRadius: '10px',
    paddingLeft: '10px',
    float: 'center',
    fontfamily: 'Candara',
  }
  return <input type='text' onChange={onChange} style={style} placeholder='monitor name'/>
}


const OptionMonitor = ({id, option, selectedOption}) => {
  return (
  <div align ='left'>
    <label> 
      <div className="alingText">
        <input type="checkbox" onChange={selectedOption} id={id} />
        <span class="checkmark"></span>
        <div className="opcionesT">
          <font color = '#FFFFFF' face='Candara'>
            {option}
          </font>
        </div>
      </div>
       
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
        <br/><br/><br/>
        <h1>
          <font color = '#FFFFFF' face='Candara' size='7'>
          &nbsp;
            Create Monitor
          </font>
        </h1>
        <br/><br/><br/>
        <center>
          <Input onChange={handleChange}/>
          <br/><br/>
            {optionsForMonitor?.map((result) => { 
              return <OptionMonitor 
                id={result.idfeature}  
                option={result.nametask} 
                selectedOption={selectedOption}
              />
            })}

          <br/><br/><br/>
          <Accept onClick={createMonitor} text = "Create Monitor" />
          <Error error={showError}/>
        </center>
    </div>
  )
}
export default CreateMonitor