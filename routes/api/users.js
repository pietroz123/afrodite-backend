const router = require('express').Router();
const passport = require('passport');
const passportConf = require('../../passport');

const UsersController = require('../../controllers/users');
const { validateBody, schemas } = require('../../helpers/routeHelpers');
const passportLocal = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });
const passportGoogle = passport.authenticate('googleToken', { session: false });

/**
 * @route   GET /api/users
 * @desc    Get all users
 * @access  AUTH
 */
router.route('/')
    .get(passportJWT, UsersController.findAll);

/**
 * @route   PUT /api/users/:id
 * @desc    Update a user
 * @access  AUTH
 */
router.route('/:id')
    .put(passportJWT, UsersController.update);

/**
 * @route   POST /api/users/register
 * @desc    Register a user
 * @access  PUBLIC
 */
router.route('/register')
    .post(validateBody(schemas.authSchema), UsersController.register);

/**
 * @route   POST /api/users/login
 * @desc    Login a user
 * @access  PUBLIC
 */
router.route('/login')
    .post(validateBody(schemas.authSchema), passportLocal, UsersController.login);

/**
 * @route   POST /api/users/oauth/google
 * @desc    Register/Login a user with Google OAuth
 * @access  PUBLIC
 */
router.route('/oauth/google')
    .post(passportGoogle, UsersController.googleOAuth);

/**
 * @route   GET /api/users/authUser
 * @desc    Get logged in user
 * @access  PRIVATE
 */
router.route('/authUser')
    .get(passportJWT, UsersController.authUser);

/**
 * @route   POST /api/users/auth0Hook
 * @desc    Webhook to handle Auth0
 * @access  PUBLIC
 */
router.route('/auth0Hook')
    .post(UsersController.auth0Hook);

module.exports = router;