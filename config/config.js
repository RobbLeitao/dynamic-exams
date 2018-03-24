const SequelizeModels = require("sequelize-models");
 
var seqModels  = new SequelizeModels({
  // Database connection options 
  connection : {
    host     : "127.0.0.1",
    dialect  : "mysql",
    username : "root",
    schema   : "dynamicexams",
    password : ""
  },
 
  // Models loading options 
  models : {
    autoLoad : true,
    path     : "/models"
  },
 
  // Sequelize options passed directly to Sequelize constructor 
  sequelizeOptions : {
    define : {
      freezeTableName : true,
      underscored     : true
    }
  }
});
 
 
seqModels.getSchema().then( schema => {
  // schema.models and schema.db available here 
})
.catch( err => {
  // throwing error out of the promise 
  setTimeout( () => { throw err });
});