const usuarioService = require('../domain/usuario/usuarioService');
const express = require('express');
const router = express.Router();

// Rota para cadastrar um usuário
router.post('/cadastrarusuarios', async (req, res) => {
  try {
    const resultado = await usuarioService.cadastrarUsuario(req.body);
    return res.status(resultado.status).json({ message: resultado.message });
  } catch (error) {
    return res.status(error.status).json({ error: error.message });
  }
});

// Rota para alterar um usuário por ID
router.put('/alterarusuario/:id', async (req, res) => {
  try {
    const resultado = await usuarioService.alterarUsuario(parseInt(req.params.id), req.body);
    return res.status(resultado.status).json({ message: resultado.message });
  } catch (error) {
    return res.status(error.status).json({ error: error.message });
  }
});

// Rota para excluir um usuário por ID
router.delete('/deletarusuarios/:id', async (req, res) => {
  try {
    const resultado = await usuarioService.excluirUsuario(parseInt(req.params.id));
    return res.status(resultado.status).json({ message: resultado.message });
  } catch (error) {
    return res.status(error.status).json({ error: error.message });
  }
});

// Rota para obter informações de um usuário por ID
router.get('/usuarios/:id', async (req, res) => {
  try {
    const resultado = await usuarioService.obterUsuarioPorId(parseInt(req.params.id));
    return res.status(resultado.status).json({ usuario: resultado.usuario });
  } catch (error) {
    return res.status(error.status).json({ error: error.message });
  }
});

// Rota para obter todos os usuários
router.get('/usuarios', async (req, res) => {
  try {
    const resultado = await usuarioService.obterTodosUsuarios();
    return res.status(resultado.status).json({ usuarios: resultado.usuarios });
  } catch (error) {
    return res.status(error.status).json({ error: error.message });
  }
});

// Rota para login
router.post('/login', async (req, res) => {
  try {
    const resultado = await usuarioService.login(req.body);

    const statusCode = resultado.status || 500; 

    return res.status(statusCode).json({ message: resultado.message });
  } catch (error) {
    console.error(error);

    const statusCode = error.status || 500; 

    return res.status(statusCode).json({ error: error.message });
  }
});

module.exports = router;