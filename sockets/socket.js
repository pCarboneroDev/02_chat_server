const { comprobarJWT } = require('../helpers/jwt');
const {io} = require('../index');
const {usuarioConectado, usuarioDesconectado, grabarMensaje} = require ('../controllers/socket');


// Mensajesde sockets
io.on('connection', client => {
    console.log('Cliente conectado')


    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token'])

    if (!valido) {return client.disconnect();}

    // cliente autenticado
    usuarioConectado(uid);

    //ingresar al usuario a una sala
    client.join(uid);

    // escuchar mensaje personal
    client.on('mensaje-personal', async (payload) => {
      //grabar mensaje
      await grabarMensaje(payload);

      io.to(payload.para).emit('mensaje-personal', payload);
    })


    client.on('disconnect', () => { 
        usuarioDesconectado(uid);
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