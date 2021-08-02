const db = require('../db');

module.exports = {

    /**
     * Recupera os agendamentos de um cliente pelo telefone celular do cliente
     */
    findByMobilePhone: async (req, res, next) => {
        let { mobilePhone } = req.params;

        let query = {
            name: 'find-appointments-by-mobile-phone',
            text: `
                SELECT
                    ag.af_horario__c ag_horario, ag.sfid ag_sfid,
                    pf.name pf_name,
                    sv.name sv_name
                FROM
                    salesforce.af_agendamento__c ag
                JOIN
                    salesforce.af_cliente__c cl
                    ON ag.af_cliente__c = cl.sfid
                JOIN
                    salesforce.af_profissional__c pf
                    ON ag.af_profissional__c = pf.sfid
                JOIN
                    salesforce.af_servico__c sv
                    ON ag.af_servico__c = sv.sfid
                WHERE
                    cl.af_telefone_celular__c = $1
            `.trim(),
            values: [mobilePhone]
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