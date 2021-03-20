import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";

const Button = ({onClick, text}) => {
  return <button onClick={onClick}>{text}</button>
}

const Subscription = ({month, sum, year}) => {
  const style = {
    color: '#FFFFFF'
  }

    return <div style={style}>
      <div>{sum} new subscriptions on {month}/{year}</div>
      </div>
}

const date = () => {
    const today = new Date()
    const month = today.getMonth()+1
  
    if (month.toString().length === 1){
        return today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + today.getDate();
    } else {
        return today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    }
  }
  
const actualDate = date()

const SubscriptionCount = () => {
  const history = useHistory()
  const [subscriptionCount, setSubscriptionCount] = useState([])
  const actualMonth = parseInt(actualDate.substring(5,7))
    
    useEffect(() => {
        getSubscriptionCount();
    }, []);

    async function getSubscriptionCount() {
        var temporary = []
        const json = await fetch('http://localhost:3001/subscriptionCount')
            .then(response => response.json())

        if(json.length>0){
            for(var a=0; a<json.length; a++){
                if(json[a].mes == parseInt(actualDate.substring(5,7)) && json[a].anio.toString() == actualDate.substring(0, 4)) {
                    temporary.push(json[a])
                } else if(json[a].mes == parseInt(actualDate.substring(5,7)-1)  && json[a].anio.toString() == actualDate.substring(0, 4)) {
                    temporary.push(json[a])
                } else if(json[a].mes == parseInt(actualDate.substring(5,7)-2)  && json[a].anio.toString() == actualDate.substring(0, 4)) {
                    temporary.push(json[a])
                } else if(json[a].mes == parseInt(actualDate.substring(5,7)-3)  && json[a].anio.toString() == actualDate.substring(0, 4)) {
                    temporary.push(json[a])
                } else if(json[a].mes == parseInt(actualDate.substring(5,7)-4)  && json[a].anio.toString() == actualDate.substring(0, 4)) {
                    temporary.push(json[a])
                } else if(json[a].mes == parseInt(actualDate.substring(5,7)-5)  && json[a].anio.toString() == actualDate.substring(0, 4)) {
                  temporary.push(json[a])
                } else if(actualMonth-1 <= 0 || actualMonth-2 <= 0 || actualMonth-3 <= 0 || actualMonth-4 <= 0 || actualMonth-5 <= 0){
                    if (json[a].mes == 12 && json[a].anio.toString() == actualDate.substring(0, 4)-1) {
                        temporary.push(json[a])
                    } else if (json[a].mes == 11 && json[a].anio.toString() == actualDate.substring(0, 4)-1) {
                        temporary.push(json[a])
                    } else if (json[a].mes == 10 && json[a].anio.toString() == actualDate.substring(0, 4)-1) {
                        temporary.push(json[a])
                    } else if (json[a].mes == 9 && json[a].anio.toString() == actualDate.substring(0, 4)-1) {
                        temporary.push(json[a])
                    } else if (json[a].mes == 8 && json[a].anio.toString() == actualDate.substring(0, 4)-1) {
                        temporary.push(json[a])
                    } else if (json[a].mes == 7 && json[a].anio.toString() == actualDate.substring(0, 4)-1) {
                        temporary.push(json[a])
                    }
                } 
            }
        }
        setSubscriptionCount(temporary)
    }

    return (
    <div>
        <Button onClick={() => history.push('../reports')} text='Go Back'/>
        <Button onClick={() => history.push('../../admin')} text='Home'/>
        <Button onClick={() => history.push('../../')} text='Log Out'/>

        <h1>Pantalla principal subscription count</h1>
        <h2>New subscriptions last six months</h2>

        {subscriptionCount.map((result) => {
                return <Subscription
                        month={result.mes}
                        sum={result.count}
                        year={result.anio}/>  
        })}
        

    </div>
  );
}
export default SubscriptionCount;