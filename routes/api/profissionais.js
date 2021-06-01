const router = require('express').Router();

const ProfissionalController = require('../../controllers/profissionais');

/**
 * @route   GET /api/profissionais
 * @desc    Recupera todos os profissionais
 * @access  PUBLIC
 */
router.route('/')
    .get(ProfissionalController.findAll);

module.exports = router;