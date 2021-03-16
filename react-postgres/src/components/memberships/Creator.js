import React, {useState, useEffect} from 'react';
import SearchBar from './functions/SearchBar'
import { useHistory } from "react-router-dom";

const Button = ({onClick, text}) => {
  return <button onClick={onClick}>{text}</button>
}

const Creator = () => {
  const history = useHistory()

    return (
    <div>
        <Button onClick={() => history.push('creator/account')} text='Account'/>
        <Button onClick={() => history.push('../home')} text='Log Out'/>
        <Button onClick={() => history.push('creator/upload')} text='Upload Songs'/>

        <h1>Pantalla principal creator membership</h1>
        <SearchBar/>
    </div>
  );
}
export default Creator;