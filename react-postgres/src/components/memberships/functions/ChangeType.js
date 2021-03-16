import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";

const Button = ({onClick, text}) => {
  return <button onClick={onClick}>{text}</button>
}

const Free = () => {
  const history = useHistory()

    return (
    <div>
        <Button onClick={() => history.push('../../free')} text='Home'/>
        <Button onClick={() => history.push('../../../home')} text='Log Out'/>

        <h1>Pantalla principal change type</h1>
    </div>
  );
}
export default Free;