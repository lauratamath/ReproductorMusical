import React from 'react';
import { useHistory } from "react-router-dom";
import SearchBarAdmin from './SearchBarAdmin';
import './FreeAccount.css';

const Button = ({onClick, text}) => {
  const style = {
    color: '#FFFFFF'
  }
  return <button onClick={onClick} style={style} className = 'botonesFree'>{text}</button>
}

const Modify = () => {
  const history = useHistory()

    return (
    <div>
        <Button onClick={() => history.push('../admin')} text='Home'/>
        <Button onClick={() => history.push('../')} text='Log Out'/>

        <br/><br/><br/>
        <h1>
          <font color = '#FFFFFF' face='Candara'  size = '7'>
            &nbsp; &nbsp;
            Modify
          </font>
        </h1>
        <br/><br/><br/>
        <center>
          <SearchBarAdmin/>
        </center>
    </div>
  );
}
export default Modify;