const express = require('express');
const app = express();
require('dotenv').config(); // Carga las variables de entorno
const jwt = require('jsonwebtoken');

const users = [
  { username: 'admin', password: '1234567' },
  { username: 'client', password: '123456789' },
  // Agrega más usuarios según sea necesario
];

const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

const port = 3000;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }

    req.user = decoded;
    next();
  });
};


app.use(express.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  const token = jwt.sign({ username }, process.env.SECRET, { expiresIn: '1h' });

  res.json({ token });
});

app.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'Ruta protegida', user: req.user });
});

app.use("/list", listViewRouter)

app.use("/edit-list", listEditRouter)

app.listen(port);

module.exports = { app, port };

