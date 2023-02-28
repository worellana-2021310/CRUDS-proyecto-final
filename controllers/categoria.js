const { response, request } = require('express');
const { validationResult } = require('express-validator');
const Categoria = require('../models/categoria');

const getCategoria = async (req = request, res = response) => {

    const query = { estado: true };

    const listaCategoria = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
    ]);

    res.json({
        msg: '----- Lista de categoria -----',
        listaCategoria
    });
}

const postCategoria = async (req = request, res = response) => {

    const { modelo, marca, asesoria, categoria, estado, año } = req.body;
    const categoriaDB = new Categoria({ modelo, marca, asesoria, categoria, estado, año });
    await categoriaDB.save();

    res.json({
        msg: '----- Agregado exitosamente -----',
        categoriaDB
    });
}

const putCategoria = async (req = request, res = response) => {

    const { id } = req.params;
    const { _id, estado, ...resto } = req.body;
    const categoriaEditada = await Categoria.findByIdAndUpdate(id, resto)
    res.json({
        msg: '----- Editado exitosamente -----',
        categoriaEditada
    });
}

const deleteCategoria = async (req = request, res = response) => {

    const { id } = req.params;
    const categoriaEliminada = await Categoria.findByIdAndDelete(id)

    res.json({
        msg: '----- Eliminado exitosamente -----',
        categoriaEliminada
    });
}

module.exports = {
    getCategoria,
    postCategoria,
    putCategoria,
    deleteCategoria
}