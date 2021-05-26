const router = require('express').Router();

const ServicoController = require('../../controllers/servicos');

/**
 * @route   GET /api/servicos
 * @desc    Recupera todos os serviços
 * @access  PUBLIC
 */
router.route('/')
    .get(ServicoController.findAll);

module.exports = router;