import React from 'react';
import SearchBar from './functions/SearchBar'
import { useHistory } from "react-router-dom";

const Button = ({onClick, text}) => {
  return <button onClick={onClick}>{text}</button>
}

const Admin = () => {
  const history = useHistory()

    return (
    <div>
        <Button onClick={() => history.push('admin/account')} text='Account'/>
        <Button onClick={() => history.push('admin/inactivate')} text='Inactivate song'/>
        <Button onClick={() => history.push('admin/modify')} text='Modify'/>
        <Button onClick={() => history.push('admin/delete')} text='Delete'/>
        <Button onClick={() => history.push('../home')} text='Log Out'/>

        <h1>Pantalla principal admin membership</h1>
        <SearchBar/>
    </div>
  );
}
export default Admin;