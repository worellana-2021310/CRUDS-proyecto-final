const { Router } = require('express');
const { check } = require('express-validator');

const { getCategoria, postCategoria, putCategoria, deleteCategoria } = require('../controllers/categoria');

const router = Router();

router.get('/view', getCategoria);
router.post('/add', postCategoria);
router.put('/edit/:id', putCategoria);
router.delete('/delete/:id', deleteCategoria);

module.exports = router;