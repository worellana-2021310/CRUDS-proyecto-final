const Usuario = require('../models/usuario');

async function emailExiste(correo = '') {
    const existeEmailDeUsuario = await Usuario.findOne({ correo });
    if (existeEmailDeUsuario) {
        throw new Error(`El correo ${correo}, ya esta registrado en la DB `);
    }
}

const esRoleValido = async (rol = '') => {
    const existeRolDB = await Role.findOne({ rol });
    if (!existeRolDB) {
        throw new Error(`El rol ${rol}, no existe en la DB `);
    }
}

const existeUsuarioPorId = async (id) => {
    const existIdOfUser = await Usuario.findById(id);
    if (!existIdOfUser) {
        throw new Error(`El id: ${id} no existe en la DB`);
    }
}

module.exports = {
    emailExiste,
    esRoleValido,
    existeUsuarioPorId
}