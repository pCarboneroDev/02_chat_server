/**
 
    path: api/usuarios

 */


    const { Router, response } = require('express');
    const { validarJWT } = require('../middlewares/validar-jwt');
    const { getUsuarios } = require('../controllers/ususarios');
  
    
    const router = Router();
    
    
    //validarJWT
    router.get('/', validarJWT, getUsuarios);
    
    
    module.exports = router; 