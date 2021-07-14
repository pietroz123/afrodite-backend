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

/**
 * @route   GET /api/servicos/{id}/profissionais
 * @desc    Recupera todos os profissionais que prestam determinado serviço
 * @access  PUBLIC
 */
router.route('/:idServico/profissionais')
    .get(ServicoController.getProfessionals);

module.exports = router;