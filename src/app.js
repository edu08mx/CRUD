require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectToDatabase = require('./infraestrutura/config/database');
const { expressLogger } = require('./infraestrutura/logger');
const usuarioRoutes = require('./controllers/usuarioController');
const app = express();
const port = 5000;

// Conecta ao banco de dados MongoDB
connectToDatabase();

app.use(expressLogger);
app.use(bodyParser.json());

app.use(express.json());
app.use('/api', usuarioRoutes);

// Rota para teste
app.get('/', (req, res) => {
  res.send('API Teste - OK');
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
