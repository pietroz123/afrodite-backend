const router = require('express').Router();

const AgendamentoController = require('../../controllers/agendamentos');

/**
 * @route   GET /api/agendamentos/{mobilePhone}
 * @desc    Recupera todos os agendamentos de um cliente
 * @access  PUBLIC
 */
router.route('/:mobilePhone')
    .get(AgendamentoController.findByMobilePhone);

/**
 * @route   POST /api/agendamentos
 * @desc    Cria um novo agendamento
 * @access  PUBLIC
 */
router.route('/')
    .post(AgendamentoController.createAppointment);

module.exports = router;