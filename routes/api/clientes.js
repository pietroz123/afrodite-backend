const router = require('express').Router();

const ClienteController = require('../../controllers/clientes');

/**
 * @route   GET /api/clientes/{mobilePhone}
 * @desc    Recupera um cliente pelo seu telefone celular
 * @access  PUBLIC
 */
router.route('/:mobilePhone')
    .get(ClienteController.findByMobilePhone);

module.exports = router;