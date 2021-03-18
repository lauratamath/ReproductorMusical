import React from 'react';
import { useHistory } from "react-router-dom";
import SearchBarAdmin from './SearchBarAdmin';

const Button = ({onClick, text}) => {
  return <button onClick={onClick}>{text}</button>
}

const Modify = () => {
  const history = useHistory()

    return (
    <div>
        <Button onClick={() => history.push('../admin')} text='Home'/>
        <Button onClick={() => history.push('../')} text='Log Out'/>

        <h1>Pantalla principal modify</h1>
        <SearchBarAdmin/>
    </div>
  );
}
export default Modify;