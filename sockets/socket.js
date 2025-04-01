const {io} = require('../index');


// Mensajesde sockets
io.on('connection', client => {
    console.log('Cliente conectado')


    client.on('disconnect', () => { 
        console.log('CLiente desconectado')
     });


     client.on('mensaje', (payload) => {
        console.log('MEnsjaeee!!', payload);

        io.emit('mensaje', {admin: 'Nuevo mensaje'});
     });

     client.on('emitir-mensaje', (payload) => {
        console.log(payload);
        //io.emit('nuevo-mensaje', 'HEYY!!');
        client.broadcast.emit('nuevo-mensaje', payload); // emite a todos menos al que emitio
     });



});