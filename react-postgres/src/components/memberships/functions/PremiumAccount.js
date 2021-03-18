import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import './FreeAccount.css';

const Information = ({email, username, type, paymenth}) => {
    return <div>
        <h4 align='center'>
            <font color = '#FFFFFF' face='Candara'  size = '4'>
                <br/><br/>
                Username: &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; 
                &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  {username}
                <br/><br/>
                Email: &nbsp; &nbsp; &nbsp;  &nbsp; {email}
                <br/><br/>
                Type: &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;
                 &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {type} 
                <br/><br/>
                Paymenth Method: &nbsp;  &nbsp; {paymenth} 
                <br/><br/>
            </font>
        </h4>
    </div>
}

const PremiumAccount= () => {
    const history = useHistory()
    const [info, setInfo] = useState({username: '', email: '', type:'', paymenth:''})
    const actualUsername = localStorage.getItem('actualUsername')

    useEffect(() => {
        getPremiumMembership();
    }, []);

    function getPremiumMembership() {
        fetch('http://localhost:3001/premiummembership').then((r) => {
			return r.json()
			}).then((j) => {
			j.forEach((usernameDB) => {
				if(actualUsername === usernameDB.username){
                    console.log(usernameDB)
                    setInfo({
                        ...info,
                        username: usernameDB.username,
                        email: usernameDB.email,
                        type: usernameDB.type,
                        paymenth: usernameDB.paymenthmethod
                      })
                }
			}
	       	)
		})
    }

    return (
    <div>
        <button onClick={() => history.push('../premium')} div className='closeF'>
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

        <Information username={info.username} email={info.email} type={info.type} paymenth={info.paymenth}/>

        <center>
            <button onClick={() => history.push('account/getFree')} div className ='otro'>
                <font color = '#FFFFFF' face='Candara'>
                    <b>
                        Get Free
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
export default PremiumAccount;