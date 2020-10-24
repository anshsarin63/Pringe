const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

function init(passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        const user = await User.findOne({ email: email });
        if (!user) {
            return done(null, false, { message: 'Username does not exits' });
        }
        if (user.password!=password) {
            return done(null, false, { message: 'Wrong password' });
        }
        return done(null, user, { message: 'Logged In' });
        // console.log(user);
    }))
    passport.serializeUser(function(user, done) {
      done(null, user._id);
    });
    passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
        done(err, user);
      });
    });
}


module.exports = init;