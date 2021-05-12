import React from 'react';
import { useHistory } from "react-router-dom";
import SearchBarAvailability from './SearchBarAvailability';
import './FreeAccount.css';


const Button = ({onClick, text}) => {
  const style = {
    color: '#FFFFFF'
  }
  return <button onClick={onClick} style={style} className = 'botonesFree'>{text}</button>
}

const AvailabilitySong = () => {
  const history = useHistory()

    return (
    <div>
        <button onClick={history.goBack} div className ='back'>
          <font color = '#FFFFFF' face='Candara' size = '6'>
            ←
          </font>
        </button>
        <Button onClick={history.goBack} text='Home'/>
        <Button onClick={() => history.push('../')} text='Log Out'/>
        <br/><br/><br/>
        
        <h1>
          <font color = '#FFFFFF' face='Candara'  size = '7'>
            &nbsp; &nbsp;
            Songs settings
          </font>
        </h1>
        <center>
        <SearchBarAvailability/>
        </center>
    </div>
  );
}
export default AvailabilitySong;