import React from 'react';
import './Planes.css';
import './Home.css';
import { useHistory } from "react-router-dom";

const InfoPlanes = () => {
	return <div>
		<center>
		<div className="polig"> 
			<h1>free</h1><hr />
			<h3 align= 'left'>Disfruta de</h3><br/><br/>
			<h4 align= 'left'>✅ Escuchar únicamente 3 tracks al día</h4>
			<h4>
				<font face ='Consolas' color ='#1B1B1C' size = '4'>
					...............<br/>.....<br/>.<br/>
				</font>
			</h4>
		</div>

		<div class="polig"> 
			<h1>Premium</h1>
			<h3>7.99 USD al mes, 1 cuenta</h3>
			<hr />
			<h3 align= 'left'>Disfruta de</h3>
			<h4 align= 'left'>✅ Escuchar más de 3 tracks al día</h4>
			<h4 align= 'left'>✅ Crear playlist</h4> <br/>
			<h4>
				<font face ='Consolas' color ='#1B1B1C' size = '4'>
					...............
				</font>
			</h4>
		</div>

		<div class="polig"> 
			<h1>Artist</h1>
			<h3>34.99 USD al mes, 1 cuenta</h3>
			<hr />
			<h3 align= 'left'>Disfruta de</h3>
			<h4 align= 'left'>✅ Escuchar más de 3 tracks al día</h4>
			<h4 align= 'left'>✅ Crear playlist</h4> 
			<h4 align= 'left'>✅ Recibir ingresos</h4> 
			<h4 align= 'left'>✅ Subir canciones</h4> 
		</div>
		</center>
	</div>
}

const Planes = () => {
    const history = useHistory()

    return (
        <div>
	        <center>
		        <button onClick={() => history.push('/home')} div className='close'>
		          <font color ='#FFFFFF'>
		            ❌
		          </font>
		        </button>

		        <h1>
		            <font face ='Consolas' color ='#FFFFFF' size = '7'>
		                PLANES
		            </font>
		        </h1>

	        	<InfoPlanes/>

          		<label>
            		<font face ='Candara' color ='#FFFFFF'>
              			<br/><br/>Crea una cuenta 
           			</font><br/>
          		</label>

          		<button onClick={() => history.push('/signin')} div className='botones' >
            		<font color ='#FFFFFF'>
              			<b>
                			Sign Up
              			</b>
            		</font>
          		</button>
            </center>
		</div>
    )
}

export default Planes;