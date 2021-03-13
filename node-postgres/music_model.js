const Pool  = require('pg').Pool 
const pool = new Pool ({
  user: 'postgres',
  host: 'localhost',
  database: 'proyecto',
  password: 'Benjamin1',
  port: 5432,
});

const getUsers = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM useraccount', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }
  const createUserAccount = (body) => {
    return new Promise(function(resolve, reject) {
      const { name, email } = body
      pool.query('INSERT INTO useraccount (andrea, hola123, free) VALUES ($1, $2, $3) RETURNING *', [username, password, type], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`A new merchant has been added added: ${results.rows[0]}`)
      })
    })
  }
  
  module.exports = {
    getUsers,
    createUserAccount,
  }