const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const GoogleOAuthTokenStrategy = require('passport-google-oauth-token');
const User = require('./models/User');

/**
 * @JWT Strategy
 */
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.JWT_SECRET,
}, async (payload, done) => {
    try {
        // Find the user specified in token
        const user = await User.findById(payload.sub);

        // If user doesn't exists, handle it
        if (!user) {
            return done(null, false);
        }

        // Otherwise, return the user
        done(null, user);

    } catch (error) {
        done(error, false);
    }
}));

/**
 * @Google OAuth Strategy
 */
passport.use('googleToken', new GoogleOAuthTokenStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
}, async (accessToken, refreshToken, profile, done) => {
    try {

        console.log("TCL: profile", profile)
        console.log("TCL: refreshToken", refreshToken)
        console.log("TCL: accessToken", accessToken)

        // Check whether this current user exists in DB
        const existingUser = await User.findOne({ "google.id": profile.id });
        if (existingUser) {
            console.log('User already exists in DB');
            return done(null, existingUser);
        }

        console.log('User does not exist in DB');

        // If new account
        const newUser = new User({
            method: 'google',
            google: {
                id: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                photo: profile.photos[0].value,
            },
            roles: [
                'USER_ROLE'
            ]
        });

        await newUser.save();
        done(null, newUser);

    } catch (error) {
        done(error, false, error.message);
    }
}));

/**
 * @Local Strategy
 */
passport.use(new LocalStrategy({
    usernameField: 'email',
}, async (email, password, done) => {
    try {
        // Find the user given the email
        const user = await User.findOne({ "local.email": email });

        // If not, handle it
        if (!user) {
            return done(null, false);
        }

        // Check if the password is correct
        const isMatch = await user.isValidPassword(password);

        // If not, handle it
        if (!isMatch) {
            return done(null, false);
        }

        // Otherwise, return the user
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));

