const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { body } = require('express-validator');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {

    const {email, password} = req.body;

    try {

        const existeEmail = await Usuario.findOne({email});

        if (existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const usuario = new Usuario(req.body);

        // encriptar password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);


        await usuario.save();

        // generar jwt
        const token = await generarJWT(usuario.id)
    
        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "hable con el admin >:("
        })
    }
}

// const login
// ok: true msg: login

const login = async (req, res = response) => {

    const {email, password} = req.body;

    try {

        const usuarioDB = await Usuario.findOne({email});

        if (!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'Email no encontrado'
            });
        }


        // validar el password
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if (!validPassword){
            return res.status(400).json({
                ok:false,
                msg:'Contraseña no es válida'
            });
        }


        //generar el jwt

        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });
        
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'hable con el admin'
        })
    }

    return res.json({
        ok:true,
        msg:'login'
    })
}


const renewToken = async(req, res = response) => {

    // const uid uid del usuario
    const uid = req.uid;

    try {
        // generacion de un nuevo jwt (generarJWT)
        const token = await generarJWT(uid);

        // obtener el usuario por uid, USuario.findById...
        const usuarioDB = await Usuario.findById(uid);

        res.json({
            ok: true,
            usuarioDB,
            token
        });
    } catch (error) {
        
    }
}

module.exports = {
    crearUsuario,
    login,
    renewToken
}


module.exports = {crearUsuario, login, renewToken}