import React from 'react';
import { useHistory } from "react-router-dom";

const Button = ({onClick, text}) => {
    return <button onClick={onClick}>{text}</button>
}

const Home = () => {
    const history = useHistory()

    return (
    <div>
        <h1>Pantalla principal</h1>
        <Button onClick={() => history.push('login')} text='Login'/>
        <Button onClick={() => history.push('signin')} text='SignIn'/>
    </div>
  );
}
export default Home;