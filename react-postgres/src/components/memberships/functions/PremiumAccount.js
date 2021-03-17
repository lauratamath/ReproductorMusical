import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";

const Button = ({onClick, text}) => {
    return <button onClick={onClick}>{text}</button>
}

const Information = ({email, username, type, paymenth}) => {
    return <div>
        <h4>Username: {username}</h4>
        <h4>Email: {email}</h4>
        <h4>Type: {type} </h4>
        <h4>Paymenth Method: {paymenth} </h4>
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
        <Button onClick={() => history.push('../../home')} text='Log Out'/>
        <Button onClick={() => history.push('../premium')} text='Home'/>

        <h1>Vista general de la cuenta</h1>
        <Information username={info.username} email={info.email} type={info.type} paymenth={info.paymenth}/>

        <Button onClick={() => history.push('account/getFree')} text='Get Free'/>
        <Button onClick={() => history.push('account/getCreator')} text='Lander for Creators'/>
    </div>
  ) ;
}
export default PremiumAccount;