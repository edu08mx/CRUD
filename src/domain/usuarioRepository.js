const Usuario = require('../infraestrutura/models/usuarioModel');

const getAllUsuarios = async () => {
  try {
    const usuarios = await Usuario.find();
    return usuarios;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const getUsuarioById = async (id) => {
  try {
    const usuario = await Usuario.findOne({ id: id });
    return usuario;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const createUsuario = async (usuario) => {
  try {
    const novoUsuario = new Usuario(usuario);
    await novoUsuario.save();
    return novoUsuario;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const updateUsuarioById = async (id, updatedUsuario) => {
  try {
    const usuario = await Usuario.findOne({ id: id });

    if (usuario) {
      // Atualizar os campos necessários
      Object.assign(usuario, updatedUsuario);
      await usuario.save();
      return usuario;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const deleteUsuarioById = async (id) => {
  try {
    const resultado = await Usuario.deleteOne({ id: id });

    if (resultado.deletedCount > 0) {
      return { id: id };
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
module.exports = {
  getAllUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuarioById,
  deleteUsuarioById,
};