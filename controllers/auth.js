const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async (req = request, res = response) => {

    const { correo, password } = req.body;

    try {

        const usuario = await Usuario.findOne({ correo: correo });

        if (!usuario) {
            return res.status(404).json({
                msg: 'No se pudo encontrar el correo.',
                //usuario
            });
        }

        if (usuario.estado === false) {
            return res.status(400).json({
                msg: 'No se encuentra la cuenta.'
            });
        }

        const validarPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validarPassword) {
            return res.status(400).json({
                msg: 'Contraseña incorrecta.'
            });
        }

        const token = await generarJWT(usuario.id);

        res.json({
            msg: '----- Login exitoso -----',
            correo,
            password,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error 500. Soporte.'
        })
    }
}

module.exports = {
    login
}