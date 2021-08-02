const db = require('../db');

module.exports = {

    /**
     * Recupera um serviço pelo seu ID
     */
    findByMobilePhone: async (req, res, next) => {
        let { idServico } = req.params;

        let query = {
            name: 'find-appointments-by-mobile-phone',
            text: `
                SELECT *
                FROM salesforce.AF_Agendamento__c
            `.trim(),
            values: []
        }

        try {
            const results = await db.query(query);
            res.send(results);
        }
        catch (error) {
            res.status(400).json(error);
        }
    },

    /**
     * Cria um novo agendamento. Necessário:
     *  - Cliente // TODO
     *  - Serviço
     *  - Profissional
     *  - Horário
     */
    createAppointment: async (req, res, next) => {
        let { horario, idCliente, idServico, idProfissional } = req.body;

        let query = {
            name: 'create-appointment',
            text: `
                INSERT INTO salesforce.AF_Agendamento__c
                (AF_Horario__c, AF_Cliente__c, AF_Servico__c, AF_Profissional__c, AF_External_ID__c)
                VALUES ($1, $2, $3, $4, gen_random_uuid())
                RETURNING *
            `.trim(),
            values: [horario, idCliente, idServico, idProfissional]
        }

        db.query(query)
            .then(result => {
                res.send(result)
            })
            .catch(error => {
                res.status(400).json(error)
            });
    },

}