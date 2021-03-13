import React, {useState, useEffect} from 'react';

function App() {
  const [useraccount, setUserAccount] = useState(false);
  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    fetch('http://localhost:3001')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setUserAccount(data);
      });
  }

  function createUserAccount() {
    let username = prompt('Enter username');
    let password = prompt('Enter password');
    let type = prompt('Enter type');

    fetch('http://localhost:3001/useraccount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, password, type}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getUsers();
      });
  }
  return (
    <div>
      {useraccount ? useraccount : 'There is no useraccount data available'}
      <br />
      <button onClick={createUserAccount}>Add useraccount</button>
    </div>
  );
}
export default App;