const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  user: 'root',
  host: 'localhost',
  password: 'Disliler21',
  database: 'employeeSystem'
});

app.post('/create', (req, res) => {
  const { name } = req.body;
  const { age } = req.body;
  const { country } = req.body;
  const { position } = req.body;
  const { wage } = req.body;

  db.query(
    'INSERT INTO employees (name, age, country, position, wage) VALUES (?, ?, ?, ?, ?)', 
    [name, age, country, position, wage], 
    (err, _result) => {
      if (err) {
        console.log(err);
      } res.send("Values Inserted");
    });
});

app.get('/employees', (req, res) => {
  db.query('SELECT * FROM employees', (err, result) => {
    if (err) {
      console.log(err);
    } res.send(result);
  });
});

app.put('/update', (req, res) => {
  const { id } = req.body;
  const { wage } = req.body;
  db.query('UPDATE employees SET wage = ? WHERE id = ?', [wage, id], (err, result) => {
    if (err) {
      console.log(err);
    } res.send(result);
  });
});

app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM employees WHERE id = ?', id, (err, result) => {
    if (err) {
      console.log(err);
    } res.send(result);
  })
});

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});