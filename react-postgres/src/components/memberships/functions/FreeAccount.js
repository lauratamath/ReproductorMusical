import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import './FreeAccount.css';

const Information = ({email, username, type}) => {
    return <div>
        <center>
        <h4>
            <font color = '#FFFFFF' face='Candara'  size = '4'>
               <br/> Username: &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
               {username}
               <br/>
            </font>
        </h4>

        <h4>
            <font color = '#FFFFFF' face='Candara' size = '4'>
                Email: &nbsp; {email}
                <br/>
            </font>
        </h4>
        <h4>
            <font color = '#FFFFFF' face='Candara' size = '4'>
                Type: &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; 
                {type}
                <br/><br/><br/>
            </font>
        </h4>
        </center>
    </div>
}

const FreeAccount = () => {
    const history = useHistory()
    const [info, setInfo] = useState({username: '', email: '', type:''})

    const actualUsername = localStorage.getItem('actualUsername')
    
    useEffect(() => {
        getUsersAccounts();
    }, []);

    function getUsersAccounts() {
        fetch('http://localhost:3001').then((r) => {
			return r.json()
			}).then((j) => {
			j.forEach((usernameDB) => {
				if(actualUsername === usernameDB.username){
                    setInfo({
                        ...info,
                        username: usernameDB.username,
                        email: usernameDB.email,
                        type: usernameDB.type,
                      })
                }
			}
	       	)
		})
    }

    return (
    <div>
        <button onClick={() => history.push('../free')} div className='closeF'>
          <font color ='#FFFFFF'>
            ❌
          </font>
        </button>

        <h1>
            <font color = '#FFFFFF' face='Candara' size = '7'>
                &nbsp; &nbsp;
                Vista general de la cuenta 
            </font>
        </h1>
        <button onClick={() => history.push('../../home')} div className ='botonesFree'>
            <font color = '#FFFFFF' face='Candara'>
                Log Out
            </font>
        </button>

        <h1>
            <font color = '#FFFFFF' face='Candara'>
                <b>
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    Perfil
                </b>
            </font>
        </h1> 
        <Information username={info.username} email={info.email} type={info.type}/>

        <center>
            <button onClick={() => history.push('account/getPremium')} div className ='otro'>
                <font color = '#FFFFFF' face='Candara'>
                    <b>
                        Get Premium
                    </b>
                </font>
            </button>

            <button onClick={() => history.push('account/getCreator')} div className ='otro'>
                <font color = '#FFFFFF' face='Candara'>
                    <b>
                        Lander for Creators
                    </b>
                </font>
            </button>
        </center>
    </div>
  ) ;
}
export default FreeAccount;
