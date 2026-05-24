const {Sequelize} = require('sequelize'); 
const moment = require('moment');
const chalk = require('chalk');


console.log(chalk.yellow('###############################################'));
console.log(chalk.red('  APPLICATION STARTED IN: '+moment().format("DD/MM/YYYY HH:mm:ss")));
console.log(chalk.yellow('###############################################'));

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') }); 
const db_name = process.env.DB_DATABASE;
const db_user = process.env.DB_USERNAME;
const db_pass = process.env.DB_PASSWORD;
const db_host = process.env.DB_HOSTNAME;
const db_port = process.env.DB_PORTNUMB;
const db_type = process.env.DB_DATATYPE;

const database = new Sequelize(
  db_name, 
  db_user, 
  db_pass, 
  {
    host: db_host,
    dialect: 'mysql',
    port: db_port,
    //dialectOptions: { useUTC: false },
    //timezone: '-03:00' //for writing to database
  }
);
    
database.authenticate()
  .then(() => {
    console.log(chalk.blue("mySQL connected successfully!"));
  })
  .catch(error => {
    console.error(chalk.red("Fail on mySQL connection: ", error));
  });

    module.exports = database;