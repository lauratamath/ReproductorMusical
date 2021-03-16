import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";

const Button = ({onClick, text}) => {
    return <button onClick={onClick}>{text}</button>
}

const Information = ({email, username, type, paymenthmethod, income}) => {
    return <div>
        <h4>Username: {username}</h4>
        <h4>Email: {email}</h4>
        <h4>Paymenth Method: {paymenthmethod} </h4>
        <h4>Month Income: {income} </h4>
        <h4>Type: {type} </h4>
    </div>
}

const actualUsername = localStorage.getItem('actualUsername')

const CreatorAccount = () => {
    const history = useHistory()
    const [info, setInfo] = useState({username: '', email: '', paymenthmethod:'', income:0, type:''})
  
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
        <Button onClick={() => history.push('../../home')} text='Log Out'/>
        <Button onClick={() => history.push('../free')} text='Home'/>

        <h1>Vista general de la cuenta</h1>
        <Information username={info.username} email={info.email} type={info.type} paymenthmethod={info.paymenthmethod} income={info.income}/>

        <Button onClick={() => history.push('account/getPremium')} text='Get Premium'/>
        <Button onClick={() => history.push('account/getFree')} text='Get Free'/>
    </div>
  ) ;
}
export default CreatorAccount;