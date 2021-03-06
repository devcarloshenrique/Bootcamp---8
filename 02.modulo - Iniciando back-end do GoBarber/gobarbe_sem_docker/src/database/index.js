import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

import databaseConfig from '../config/database';

// Array com todos os models da aplicação até o seguinte momento
const models = [User, File, Appointment];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  // Conexção com a base de dados e carrega as models
  init() {
    // Quando este metodo é chamado é necessário importar as config do DB| Conexão pronta.
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
    // Está sendo chamada a model User, o metodo init, passando como parametro a conexão que o parametro sequelize pede
    models.map(
      model => model.associate && model.associate(this.connection.models)
    );
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
    });
  }
}

export default new Database();
