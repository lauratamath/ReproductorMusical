import React from 'react';
import { useHistory } from "react-router-dom";
import './Home.css';

const Button = ({onClick, text}) => {
	const style ={
		color: '#FFFFFF'
	}
    return <button onClick={onClick} style={style} div className='boton'>{text}</button>
}

const Home = () => {
    const history = useHistory()
    return (
    <div>
        <Button onClick={() => history.push('login')} text='Login'/>
        <Button onClick={() => history.push('signin')} text='SignIn'/>
        <a href = 'planes.html'>
        	<button class='boton'>
				<font color ='#FFFFFF'>
					Planes
				</font>
			</button>
        </a>
        <hr /><br/><br/>
        <h1 align= 'center'>
        	<font face ='Consolas' color ='#CD9898' size = '7'>
				PONLE<br/>
				PLAY A LA <br/>
				DIVERSIÓN<br/>
			</font><br/><br/>
			<img src="logo.png"/>

		</h1>
		
    </div>
  );
}
export default Home;