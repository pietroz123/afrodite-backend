const db = require('../db');

module.exports = {

    /**
     * Recupera todos
     */
    findAll: async (req, res, next) => {

        try {
            const results = await db.query('SELECT * FROM salesforce.AF_Profissional__c');
            res.send(results);
        } catch (error) {
            res.status(400).json(error);
        }

    },

}