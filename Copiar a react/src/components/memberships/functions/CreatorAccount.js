import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import './FreeAccount.css';

const Button = ({onClick, text}) => {
    const style ={
    color: '#FFFFFF',
    }
    return <button onClick={onClick} className='otro' style={style}>{text}</button>
}

const Information = ({email, username, type, paymenthmethod, income}) => {
    return <div>
        <h4>
            <font color = '#FFFFFF' face='Candara'  size = '4'>
                Username: &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp; &nbsp; &nbsp;   &nbsp; &nbsp; &nbsp;{username}
                <br/><br/>
                Email: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  {email}
                <br/><br/>
                Paymenth Method: &nbsp; &nbsp;  {paymenthmethod}
                <br/> <br/>
                Month Income: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {income}
                <br/><br/>
                Type: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; {type} 
            </font>    
        </h4>
    </div>
}


const CreatorAccount = () => {
    const history = useHistory()
    const [info, setInfo] = useState({username: '', email: '', paymenthmethod:'', income:0, type:''})
    const actualUsername = localStorage.getItem('actualUsername')

    useEffect(() => {
        getCreatorsMembership();
    }, []);

    function getCreatorsMembership() {
        fetch('http://localhost:3001/creatorsmembership').then((r) => {
			return r.json()
			}).then((j) => {
			j.forEach((usernameDB) => {
				if(actualUsername === usernameDB.username){
                    setInfo({
                        ...info,
                        username: usernameDB.username,
                        email: usernameDB.email,
                        type: usernameDB.type,
                        paymenthmethod: usernameDB.paymenthmethod,
                        income: usernameDB.income
                      })
                }
			}
	       	)
		})
    }

    return (
    <div>
        <button onClick={() => history.push('../creator')} div className='closeF'>
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

        <center>
        <Information username={info.username} email={info.email} type={info.type} paymenthmethod={info.paymenthmethod} income={info.income}/>

        <Button onClick={() => history.push('account/getPremium')} text='Get Premium'/>
        <Button onClick={() => history.push('account/getFree')} text='Get Free'/>
        </center>
    </div>
  ) ;
}
export default CreatorAccount;