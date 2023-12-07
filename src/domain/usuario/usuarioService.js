const Usuario = require('../../infraestrutura/models/usuarioModel');

const cadastrarUsuario = async (dados) => {
  const novoId = dados.id;
  const novoNome = dados.nome;
  const novoEmail = dados.email;
  const novaSenha = dados.senha;
  const novoCPF = dados.cpf;
  const novaIdade = dados.age;
  
  try {
    // Verificar se o ID já existe
    const usuarioExistente = await Usuario.findOne({ id: novoId });
    if (usuarioExistente) {
      throw { status: 400, message: "ID já existe" };
    }

    // Verificar se o CPF já existe
    const cpfExistente = await Usuario.findOne({ cpf: novoCPF });
    if (cpfExistente) {
      throw { status: 400, message: "CPF já existe" };
    }

    // Criar um novo usuário
    const novoUsuario = new Usuario({
      id: novoId,
      nome: novoNome,
      email: novoEmail,
      senha: novaSenha,
      cpf: novoCPF,
      age: novaIdade
    });

    // Salvar o usuário no banco de dados
    await novoUsuario.save();

    return { status: 201, message: "Usuário cadastrado com sucesso!" };
  } catch (error) {
    console.error(error);
    throw { status: error.status || 500, message: "Erro ao cadastrar usuário" };
  }
};

const alterarUsuario = async (id, dados) => {
  const novoNome = dados.nome;
  const novoEmail = dados.email;
  const novaSenha = dados.senha;
  const novoCPF = dados.cpf;
  const novaIdade = dados.age;

  try {
    // Busca o usuário no banco de dados com o ID
    const usuario = await Usuario.findOne({ id: id });

    if (usuario) {
      usuario.nome = novoNome;
      usuario.email = novoEmail;
      usuario.senha = novaSenha;
      usuario.cpf = novoCPF;
      usuario.age = novaIdade;

      await usuario.save();

      return { status: 200, message: "Usuário atualizado com sucesso!" };
    } else {
      throw { status: 404, message: "Usuário não encontrado" };
    }
  } catch (error) {
    console.error(error);
    throw { status: error.status || 500, message: "Erro ao atualizar usuário" };
  }
};

const excluirUsuario = async (id) => {
  try {
    const resultado = await Usuario.deleteOne({ id: id });

    if (resultado.deletedCount > 0) {
      return { status: 200, message: "Usuário excluído com sucesso!" };
    } else {
      throw { status: 404, message: "Usuário não encontrado" };
    }
  } catch (error) {
    console.error(error);
    throw { status: error.status || 500, message: "Erro ao excluir usuário" };
  }
};

const obterUsuarioPorId = async (id) => {
  try {
    const usuario = await Usuario.findOne({ id: id });

    if (usuario) {
      return { status: 200, usuario: usuario };
    } else {
      throw { status: 404, message: "Usuário não encontrado" };
    }
  } catch (error) {
    console.error(error);
    throw { status: error.status || 500, message: "Erro ao buscar usuário" };
  }
};

const obterTodosUsuarios = async () => {
  try {
    const usuarios = await Usuario.find();

    return { status: 200, usuarios: usuarios };
  } catch (error) {
    console.error(error);
    throw { status: error.status || 500, message: "Erro ao buscar usuários" };
  }
};
const login = async (credenciais) => {
  const { email, senha } = credenciais;

  try {
    const usuario = await Usuario.findOne({ email: email, senha: senha });

    if (usuario) {
      return { status: 200, message: 'Login bem-sucedido', usuario: usuario };
    } else {
      throw { status: 401, message: 'Credenciais inválidas' };
    }
  } catch (error) {
    console.error(error);
    throw { status: error.status || 500, message: 'Erro ao realizar o login' };
  }
};

module.exports = {
  cadastrarUsuario,
  alterarUsuario,
  excluirUsuario,
  obterUsuarioPorId,
  obterTodosUsuarios,
  login
};
