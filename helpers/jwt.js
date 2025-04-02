const jwt = require('jsonwebtoken');


const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = {uid}

        jwt.sign(payload, process.env.JWT_KET, {
            expiresIn: '24h'
        }, (err, token) => {
            if (err){
                reject('No se puedo generar el JWT')
            }
            else{
                resolve(token);
            }
        })
    });
}

const comprobarJWT = (token = '') => {
    try {
        const { uid } = jwt.verify(token, process.env.JWT_KET);

        return [true, uid];

    } catch (error) {
        return [false];
    }
    
}

module.exports = { generarJWT, comprobarJWT }