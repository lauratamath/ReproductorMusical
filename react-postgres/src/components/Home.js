// prueba

import React from 'react';
import { useHistory } from "react-router-dom";
import './Home.css';
import logo from './images/logo.png';

const Button = ({onClick, text}) => {
	const style ={
		color: '#FFFFFF'
	}
    return <button onClick={onClick} style={style} className='boton'>{text}</button>
}

const Home = () => {
    const history = useHistory()
    return (
    <div>
        <Button onClick={() => history.push('login')} text='Log In'/>
        <Button onClick={() => history.push('signin')} text='Sign Up'/>
		<Button onClick={() => history.push('planes')} text='Planes'/>

        <hr /><br/><br/>
        <h1 align= 'center'>
        	<font face ='Consolas' color ='#CD9898' size = '7'>
				PONLE<br/>
				PLAY A LA <br/>
				DIVERSIÓN<br/>
			</font><br/><br/>
			<img src={logo}/>

		</h1>
		
    </div>
  );
}
export default Home;