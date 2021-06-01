const db = require('../db');

module.exports = {

    /**
     * Recupera todos
     */
    findAll: async (req, res, next) => {

        try {
            const results = await db.query('SELECT * FROM salesforce.AF_Profissional__c');
            res.send(results);
        }
        catch (error) {
            res.status(400).json(error);
        }

    },

    /**
     * Recupera um profissional pelo seu ID
     */
     findById: async (req, res, next) => {
        let { idProfissional } = req.params;

        let query = {
            name: 'profissional',
            text: `
                SELECT *
                FROM salesforce.AF_Profissional__c
                WHERE sfid = $1
            `.trim(),
            values: [idProfissional]
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
     * Recupera todos os serviços do profissional
     */
    getServices: async (req, res, next) => {
        let { idProfissional } = req.params;

        let query = {
            name: 'servicos-profissional',
            text: `
                SELECT *
                FROM salesforce.AF_Profissional_Servico__c
                JOIN salesforce.AF_Servico__c ON salesforce.AF_Servico__c.sfid = salesforce.AF_Profissional_Servico__c.AF_Servico__c
                WHERE AF_Profissional__c = $1
            `.trim(),
            values: [idProfissional]
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