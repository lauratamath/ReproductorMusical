import React from 'react';
import { useHistory } from "react-router-dom";
import SearchBarAvailability from './SearchBarAvailability';

const Button = ({onClick, text}) => {
  return <button onClick={onClick}>{text}</button>
}

const AvailabilitySong = () => {
  const history = useHistory()

    return (
    <div>
        <Button onClick={() => history.push('../admin')} text='Home'/>
        <Button onClick={() => history.push('../')} text='Log Out'/>

        <h1>Pantalla principal inactivate/activate/delete song</h1>
        <SearchBarAvailability/>
    </div>
  );
}
export default AvailabilitySong;