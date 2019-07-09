const SequelizeModels = require("sequelize-models");

var seqModels  = new SequelizeModels({
  // Database connection options
  connection : {
    host     : "127.0.0.1",
    dialect  : "postgres",
    username : "eaasi_dev",
    schema   : "eaasi_dev",
    password : "eaasi_dev",
    port: 5432
  },

  // Models loading options
  models : {
    autoLoad : true,
    path     : "./src/data_access/models"
  },

  // Sequelize options passed directly to Sequelize constructor
  sequelizeOptions : {
    define : {
      freezeTableName : true,
    }
  }
});


seqModels.getSchema().then( schema => {
  // schema.models and schema.db available here
})
.catch( err => {
  // throwing error out of the promise
  setTimeout( () => {
      console.log(err);
      throw err
  });
});
