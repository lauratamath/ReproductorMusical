import React from 'react';
import SearchBar from './functions/SearchBar'
import { useHistory } from "react-router-dom";
import './Free.css';
import logo from './images/logo.png';
import icono from './images/iconopersona.png';

const Button = ({onClick, text}) => {
  const style ={
    color: '#FFFFFF',
  }
  return <button onClick={onClick}  style={style} className='botonesFree'>{text}</button>
}

const Admin = () => {
  const history = useHistory()

    return (
    <div>
      <img src={logo} width="175"/>
      <img class="icono" src={icono} width="50"/><br/>
      <Button onClick={() => history.push('admin/account')} text='Account'/><br/><br/>
      <Button onClick={() => history.push('../home')} text='Log Out'/>

      <center>
        <h1>
          <font face ='Candara' color ='#FFFFFF' size = '7'>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            ¿Ya sabes qué escuchar?
          </font>
        </h1>
        <SearchBar/>
        <br/><br/>

        <button onClick={() => history.push('admin/reports')} className ='otro'>
          <font color = '#FFFFFF' face='Candara'>
            <b>
              Get reports
            </b>
          </font>
        </button>
        <button onClick={() => history.push('admin/modify')} className ='otro'>
          <font color = '#FFFFFF' face='Candara'>
            <b>
              Modify Song
            </b>
          </font>
        </button>
        <button onClick={() => history.push('admin/availability')} className ='otro'>
          <font color = '#FFFFFF' face='Candara'>
            <b>
              Availability Song
            </b>
          </font>
        </button>
        <button onClick={() => history.push('admin/delete')} className ='otro'>
          <font color = '#FFFFFF' face='Candara'>
            <b>
              Delete Song
            </b>
          </font>
        </button>
      </center>

      <h5 align ='center'>
        <font color = '#8C8C8C' face='Candara'>
          <br/><br/>
            Admin membership
        </font>
      </h5>
    </div>
  );
}
export default Admin;