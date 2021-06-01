const router = require('express').Router();

const ProfissionalController = require('../../controllers/profissionais');

/**
 * @route   GET /api/profissionais
 * @desc    Recupera todos os profissionais
 * @access  PUBLIC
 */
router.route('/')
    .get(ProfissionalController.findAll);

/**
 * @route   GET /api/profissionais/{id}
 * @desc    Recupera um profissional pelo seu id
 * @access  PUBLIC
 */
router.route('/:idProfissional')
    .get(ProfissionalController.findById);

/**
 * @route   GET /api/profissionais/{id}/servicos
 * @desc    Recupera todos os serviços prestados por um profissional
 * @access  PUBLIC
 */
router.route('/:idProfissional/servicos')
    .get(ProfissionalController.getServices);

module.exports = router;