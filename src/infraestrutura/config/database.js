const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/testebd', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Conectado ao banco de dados MongoDB');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados MongoDB:', error);
  }
};

module.exports = connectToDatabase;