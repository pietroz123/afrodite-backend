const db = require('../db');

module.exports = {

    /**
     * Recupera um serviço pelo seu ID
     */
    findByMobilePhone: async (req, res, next) => {
        let { mobilePhone } = req.params;

        let query = {
            name: 'find-customer-by-mobile-phone',
            text: `
                SELECT *
                FROM salesforce.AF_Cliente__c
                WHERE AF_Telefone_Celular__c = $1
            `.trim(),
            values: [mobilePhone]
        }

        try {
            const results = await db.query(query);

            if (results.rows.length) {
                res.send(results.rows[0]);
            }
            else {
                res.status(404).json({ message: 'Nenhum cliente encontrado' });
            }
        }
        catch (error) {
            res.status(400).json(error);
        }
    },

}