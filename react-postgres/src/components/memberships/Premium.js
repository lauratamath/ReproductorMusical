import React, {useState, useEffect} from 'react';
import SearchBar from './functions/SearchBar'
import { useHistory } from "react-router-dom";

const Button = ({onClick, text}) => {
  return <button onClick={onClick}>{text}</button>
}

const Premium = () => {
  const history = useHistory()

    return (
    <div>
        <Button onClick={() => history.push('premium/account')} text='Account'/>
        <Button onClick={() => history.push('../home')} text='Log Out'/>

        <h1>Pantalla principal premium membership</h1>
        <SearchBar/>
    </div>
  );
}
export default Premium;