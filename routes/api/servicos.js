const router = require('express').Router();

const ServicoController = require('../../controllers/servicos');

/**
 * @route   GET /api/servicos
 * @desc    Recupera todos os serviços
 * @access  PUBLIC
 */
router.route('/')
    .get(ServicoController.findAll);

/**
 * @route   GET /api/servicos/{id}
 * @desc    Recupera um serviço pelo seu id
 * @access  PUBLIC
 */
router.route('/:idServico')
    .get(ServicoController.findById);

module.exports = router;