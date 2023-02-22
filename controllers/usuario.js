//Importacion
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const getUsuarios = async (req = request, res = response) => {

    const query = { estado: true };

    const listaUsuarios = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
    ]);

    res.json({
        msg: '----- Lista de usuarios -----',
        listaUsuarios
    });
}

const postUsuario = async (req = request, res = response) => {

    const { nombre, correo, password } = req.body;
    const usuarioDB = new Usuario({ nombre, correo, password });

    const salt = bcryptjs.genSaltSync();
    usuarioDB.password = bcryptjs.hashSync(password, salt);
    await usuarioDB.save();

    res.status(201).json({
        msg: '----- Agregado exitosamente -----',
        usuarioDB
    });
}

const putUsuario = async (req = request, res = response) => {

    const { id } = req.params;
    const { _id, rol, estado, google, ...resto } = req.body;

    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(resto.password, salt);
    const usuarioEditado = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: '----- Editado exitosamente -----',
        usuarioEditado
    });
}

const deleteUsuario = async (req = request, res = response) => {

    const { id } = req.params;
    const usuarioEliminado = await Usuario.findByIdAndDelete(id);

    res.json({
        msg: '----- Eliminado exitosamente -----',
        usuarioEliminado
    });
}

module.exports = {
    getUsuarios,
    postUsuario,
    putUsuario,
    deleteUsuario
}