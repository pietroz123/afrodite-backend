const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET_KEY);
const JWT = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Generates a JWT token, given the user
 * @param user: user
 * @returns JWT TOKEN
 */
signToken = user => {
    return token = JWT.sign({
        iss: 'Afrodite',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, process.env.JWT_SECRET);
}

module.exports = {

    findAll: async (req, res, next) => {

        let options = {
            page: req.query.page || 1,
            limit: req.query.limit || 10
        };

        /**
         * Query build
         */
        // const query = { method: 'google' };
        const query = {};

        User.paginate(query, options, function (err, result) {
            if (err) {
                res.status(500).json({ err });
                return;
            }

            if (options.page > result.totalPages) {
                res.json({ error: { message: "You've passed the max number of pages for this query.", totalPages: result.totalPages } });
                return;
            }

            res.json({ result });
            return;
        });

    },

    update: async (req, res, next) => {
        const id = req.params.id;
        console.log(`UsersController.update() called with an id of ${id}!`);

        User.findById(id, function (err, user) {

            if (err) { res.send(err); }

            // updates
            user.roles = req.body.roles;
            user.managers = req.body.managers;

            // save the ticket and check for errors
            user.save(function (err) {
                if (err) { res.json(err); }
                res.json({
                    message: 'User Updated!',
                    user: user
                });
            });

        });

    },

    register: async (req, res, next) => {
        console.log('UsersController.register() called!');
        const { email, password } = req.value.body;

        // Check if there is a user with the same email
        const user = await User.findOne({ "local.email": email });
        if (user) {
            res.status(403).json({
                error: "Email is already in use",
            })
        }

        // Create a new User
        const newUser = new User({
            method: 'local',
            local: {
                email: email,
                password: password,
            }
        })
        await newUser.save();

        // Respond with Token
        const token = signToken(newUser);

        res.status(200).json({ token });
    },

    login: async (req, res, next) => {
        // Generate Token
        console.log('UsersController.login() called!');
        const token = signToken(req.user);
        res.status(200).json({ token });
    },

    googleOAuth: async (req, res, next) => {
        // Generate Token
        console.log('req.user', req.user);

        const token = signToken(req.user);
        res.status(200).json({ token });
    },

    authUser: async (req, res, next) => {
        res.status(200).json(req.user);
    },

    /**
     * Trata os eventos do Auth0
     */
    auth0Hook: async (req, res, next) => {
        let { user } = req.body;

        // adiciona informações para o model do usuário
        user = { method: 'auth0', auth0: { ...user, id: user.sub } };

        // verifica se o usuário já existe no banco
        let existingUser = await User.findOne({ "auth0.id": user.auth0.id });

        // caso contrário, cria um
        if (!existingUser) {
            // cria um usuário no stripe
            const stripeCustomer = await stripe.customers.create({
                name: user.auth0.name,
                email: user.auth0.email,
            });

            const newUser = new User({ ...user, stripeCustomerId: stripeCustomer.id });
            await newUser.save();

            res.status(200).json(newUser);
        } else {
            // atualiza as informações do usuário
            const newUser = await User.findOneAndUpdate({ _id: existingUser._id }, { ...user });
            res.status(200).json(newUser);
        }

        res.status(400);
    }

}