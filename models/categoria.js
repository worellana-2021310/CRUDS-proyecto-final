const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
    
    modelo: {
        type: String,
        required: [true, 'El modelo es obligatorio']
    },
    marca: {
        type: String,
        required: [true, 'La marca es obligatoria']
    },
    asesoria: {
        type: String,
        required: [true, 'La asesoria es obligatoria']
    },
    categoria: {
        type: String,
        required: true,
        emun: ['SUV', '4x4','Sport','Cupé','Sedan', 'Pickup']
    },
    estado: {
        type: Boolean,
        default: true,
    },
    año: {
        type: String,
        default: true
    }
});

module.exports = model('Categoria', CategoriaSchema)
