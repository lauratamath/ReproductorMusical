import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";

const Button = ({onClick, text}) => {
    return <button onClick={onClick}>{text}</button>
}

const Information = ({email, username, type}) => {
    return <div>
        <h4>Username: {username}</h4>
        <h4>Email: {email}</h4>
        <h4>Type: {type} </h4>
    </div>
}

const actualUsername = localStorage.getItem('actualUsername')

const FreeAccount = () => {
    const history = useHistory()
    const [info, setInfo] = useState({username: '', email: '', type:''})
  
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
        <Button onClick={() => history.push('../../home')} text='Log Out'/>
        <h1>Vista general de la cuenta</h1>
        <Information username={info.username} email={info.email} type={info.type}/>

        <Button onClick={() => history.push('account/getPremium')} text='Get Premium'/>
        <Button text='Lander for Creators'/>
    </div>
  ) ;
}
export default FreeAccount;