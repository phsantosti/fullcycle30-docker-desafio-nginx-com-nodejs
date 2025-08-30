const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const config = {
  host: 'db',
  user: 'root',
  password: 'f6ad6af5ffb811c59fa86b990eba6331',
  database: 'nodedb'
};

const connection = mysql.createConnection(config);

// Cria tabela se não existir
connection.query(`CREATE TABLE IF NOT EXISTS people(id INT AUTO_INCREMENT, name VARCHAR(255), PRIMARY KEY(id))`);

app.get('/', (req, res) => {
  const name = 'Full Cycle';
  connection.query(`INSERT INTO people(name) values('${name}')`);

  connection.query('SELECT name FROM people', (err, results) => {
    if (err) throw err;

    let list = '';
    results.forEach(person => {
      list += `<li>${person.name}</li>`;
    });

    res.send(`
      <h1>Full Cycle Rocks!</h1>
      <ul>
        ${list}
      </ul>
    `);
  });
});

app.listen(port, () => {
  console.log(`Aplicação rodando na porta ${port}`);
});
