const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {

    /// leer token
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_KET);
        req.uid = uid;

        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        }) 
    }
}


module.exports = { validarJWT }