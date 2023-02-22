const { request, response } = require('express');

const esAdminRole = (req = request, res = response, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verficar el role sin validar el token primero'
        });
    }

    next();
}

module.exports = {
    esAdminRole
}