const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No existe token agregado.'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);

        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(401).json({
                msg: 'Token inhabilitado.'
            });
        }

        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token inhabilitado o usuario inactivo.'
            });
        }

        req.usuario = usuario;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
}

module.exports = {
    validarJWT
}