const Pool  = require('pg').Pool 
const pool = new Pool ({
  user: 'postgres',
  host: 'localhost',
  database: 'proyecto',
  password: 'Benjamin1',
  port: 5432,
});

const getUsersAccounts = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM useraccount JOIN emailmanagment ON useraccount.username = emailmanagment.username', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }

  const createUserAccount = (body) => {
    return new Promise(function(resolve, reject) {
      const { username, password, type } = body
      pool.query('INSERT INTO useraccount VALUES ($1, $2, $3)', [username, password, type], (error, results) => {
        if (error) {
          reject(error)
          console.log(error)
        }
        resolve('A new account has been added added', results)
      })
    })
  }
  
  module.exports = {
    getUsersAccounts,
    createUserAccount
  }