const db = require('../db');

module.exports = {

    /**
     * Recupera todos
     */
    findAll: async (req, res, next) => {

        try {
            const results = await db.query('SELECT * FROM salesforce.AF_Servico__c');
            res.send(results);
        } catch (error) {
            res.status(400).json(error);
        }

    },

    /**
     * Recupera um serviço pelo seu ID
     */
    findById: async (req, res, next) => {
        let { idServico } = req.params;

        let query = {
            name: 'servico',
            text: `
                SELECT *
                FROM salesforce.AF_Servico__c
                WHERE sfid = $1
            `.trim(),
            values: [idServico]
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
     * Recupera um serviço pelo seu ID
     */
    getProfessionals: async (req, res, next) => {
        let { idServico } = req.params;

        let query = {
            name: 'servico',
            text: `
                SELECT *
                FROM salesforce.af_profissional_servico__c ps
                JOIN salesforce.af_profissional__c p
                ON ps.af_profissional__c = p.sfid
                WHERE ps.af_servico__c = $1
            `.trim(),
            values: [idServico]
        }

        try {
            const results = await db.query(query);
            res.send(results);
        }
        catch (error) {
            res.status(400).json(error);
        }
    },

}