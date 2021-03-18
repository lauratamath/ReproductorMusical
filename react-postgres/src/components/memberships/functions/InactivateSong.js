import React from 'react';
import { useHistory } from "react-router-dom";

const Button = ({onClick, text}) => {
  return <button onClick={onClick}>{text}</button>
}

const InactivateSong = () => {
  const history = useHistory()

    return (
    <div>
        <Button onClick={() => history.push('../admin')} text='Home'/>
        <Button onClick={() => history.push('../')} text='Log Out'/>

        <h1>Pantalla principal inactivate song</h1>
    </div>
  );
}
export default InactivateSong;