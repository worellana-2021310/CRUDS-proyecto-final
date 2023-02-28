const { response, request } = require('express');
const Producto = require('../models/producto');

const obtenerProductos = async (req = request, res = response) => {

    const query = { estado: true };

    const listaProductos = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
    ]);

    res.json({
        msg: '---- Lista de productos -----',
        listaProductos
    });
}

const obtenerProductoPorId = async (req = request, res = response) => {

    const { id } = req.params;
    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');

    res.json({
        msg: '----- Producto id -----',
        producto
    });
}

const crearProducto = async (req = request, res = response) => {

    const { estado, usuario, ...body } = req.body;
    const productoEnDB = await Producto.findOne({ nombre: body.nombre });

    if (productoEnDB) {
        return res.status(400).json({
            mensajeError: `El producto ${productoEnDB.nombre} ya existe.`
        });
    }

    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const producto = new Producto(data);

    await producto.save();

    res.status(201).json({
        msg: '----- Producto agregado -----',
        producto
    });
}


const actualizarProducto = async (req = request, res = response) => {

    const { id } = req.params;
    const { _id, estado, usuario, ...data } = req.body;

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

    res.json({
        msg: '----- Producto editado -----',
        producto
    });
}


const eliminarProducto = async (req = request, res = response) => {

    const { id } = req.params;
    const productoBorrado = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json({
        msg: '----- Producto eliminado -----',
        productoBorrado
    });
}

module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}