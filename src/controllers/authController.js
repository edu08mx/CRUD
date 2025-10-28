const express = require('express');
const router = express.Router();
const usuarioService = require('../domain/usuario/usuarioService');

// Rota para login
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Buscar usuário pelo email
    const usuario = await usuarioService.getUserByEmail(email);

    if (usuario && usuario.senha === senha) {
      return res.status(200).json({ mensagem: 'Login bem-sucedido', usuario: usuario });
    } else {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro ao realizar o login' });
  }
});
module.exports = router;