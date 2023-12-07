const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  id: Number,
  nome: String,
  email: String,
  senha: String,
  cpf: String,
  age: Number
});

const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;