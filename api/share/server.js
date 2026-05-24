const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') }); 
const bodyParser = require('body-parser');
const chalk = require("chalk");
const swagger = require('../swagger');
const router = require('./routes')
const host = process.env.APP_HOST || 'localhost';
const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions ={
  origin: '*',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
// app.use(cors({
//     origin: `http://${host}`
//  }));

const port = process.env.APP_PORT || 3000;

app.use(express.json());
app.use('/api', router);
//app.use(cors());

swagger(app);

// Servir os arquivos estáticos do frontend React compilado
app.use(express.static(path.join(__dirname, '../../app/dist')));

// Fallback para qualquer rota não-API entregar o index.html (suporte a React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../app/dist/index.html'));
});

app.listen(port, ()=>{
    console.log(chalk.blue(`Server running at http://${host}:${port}/`));
});

module.exports = app, router;