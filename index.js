const { Console } = require('console');
const express = require('express');
const path = require('path');
require('dotenv').config();

// DB Config
const { dbConnection } = require('./database/config')
dbConnection();

// app de express
const app = express();

// lectura y parseo del body
app.use(express.json());

// Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket')




// Path publico
const publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));


// mis rutas
app.use('/api/login', require('./routes/auth'))


server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err)
        console.log('SERvidorcorriendo en puerto!!!!', 3000);
})


