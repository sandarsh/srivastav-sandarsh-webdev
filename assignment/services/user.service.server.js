module.exports = function(app, model){
    var bcrypt = require("bcrypt-nodejs");
    var passport = require('passport');
    var cookieParser = require('cookie-parser');
    var session = require('express-session');
    var LocalStrategy = require('passport-local');
    var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;

    app.use(session({
        secret: 'this is the secret',
        resave: true,
        saveUninitialized: true
    }));

    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var googleConfig = {
        clientID        : "143385841329-ulm42pfskodkjivvpcmddebl6ilmg8da.apps.googleusercontent.com",
        clientSecret    : "0EFqz3SZ2Jea4zY6ymiK2RNJ",
        callbackURL     : "http://localhost:3000/auth/google/callback"
    };

    passport.use(new GoogleStrategy(googleConfig, googleStrategy));

    app.get   ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/assignment/#/user',
            failureRedirect: '/assignment/#/login'
        }));

    app.get ('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get ('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/assignment/#/user',
            failureRedirect: '/assignment/#/login'
        }));



    var facebookConfig = {
        clientID        : "1869180686645152",
        clientSecret    : "fa1fcbaec6d05649c30e0fe10be9e348",
        callbackURL     : "http://localhost:3000/auth/facebook/callback"
    };

    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));



    // var auth = authorized;
    app.get("/api/user", findUser);
    app.post('/api/login', passport.authenticate('local'), login);
    app.post('/api/checkLogin', checkLogin);
    app.post('/api/logout', logout);
    // app.post  ('/api/logout', logout);
    // app.post  ('/api/register', register);
    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    app.post('/api/user', createUser);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);



    function facebookStrategy(token, refreshToken, profile, done) {
        model
            .userModel
            .findUserByFacebookId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var names = profile.displayName.split(" ");

                        var newFacebookUser = {
                            username : names[0],
                            lastName:  names[1],
                            firstName: names[0],
                            email:     profile.emails ? profile.emails[0].value:"",
                            facebook: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return model.userModel.createUser(newFacebookUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function googleStrategy(token, refreshToken, profile, done) {
        model
            .userModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username : emailParts[0],
                            lastName: profile.name.familyName,
                            firstName: profile.name.givenName,
                            email: profile.emails[0].value,
                            google: {
                                id:          profile.id,
                                token:       token
                            }
                        };
                        return model.userModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function logout(req, res){
        req.logout();
        res.sendStatus(200);
    }

    function checkLogin(req, res){
        res.send(req.isAuthenticated() ? req.user : '0');
    }


    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model
            .userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }


    function localStrategy(username, password, done){
        model
            .userModel
            .findUserByUsername(username, password)
            .then(function (user) {
                    if(user){
                        return done(null, user);
                    } else{
                        return done(null, false);
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }


    function login(req, res){
        var user = req.user;
        res.json(user);
    }


    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }


    function deleteUser(req,res){
        var userId = req.params.uid;
        model
            .userModel
            .deleteUser(userId)
            .then(
                function (status) {
                    res.send(status);
                },
                function(error){
                    res.send(error);
                });
    }

    function updateUser(req, res){
        // console.log("updated");
        var user = req.body;
        var id = req.params.uid;
        // console.log(user , id);
        model
            .userModel
            .updateUser(id, user)
            .then(
                function (status) {
                    res.sendStatus(status);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function createUser(req, res){
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        model
            .userModel
            .createUser(user)
            .then(
                function(newUser){
                    // console.log(newUser);
                    res.send(newUser);
                },
                function(error){
                  res.sendStatus(400).send(error);

                }
            );
    }

    function findUser(req, res) {
        var query = req.query;
        //console.log(query);
        if (query.password && query.username) {
            findUserByCredentials(req, res);
        }
        else if (query.username) {
            //console.log("this ran")
            findUserByUsername(req, res);
        } else{
            res.json(req.user);
        }
    }

    function findUserByUsername(req, res){
        var username = req.query.username;
        model
            .userModel
            .findUserByUsername(username)
            .then(function (newUser) {
                if(newUser){
                    res.json(newUser);
                } else{
                    res.send("0");
                }

            },
            function (error) {
                res.sendStatus(400).send(error);
            })
    }



    function findUserByCredentials(req,res){
        var username = req.query.username;
        var password = req.query.password;
        model
            .userModel
            .findUserByUsername(username)
            .then(function (user) {
                if(user){
                    res.send(user);
                } else{
                    res.send("0");
                }
            },
            function (error) {
                res.sendStatus(400).send(error);
            });
    }

    function findUserById(req, res){
        var id = req.params.uid;
        model
            .userModel
            .findUserById(id)
            .then(
                function(user){
                    if(user){
                        res.send(user);
                    } else{
                        res.send('0');
                    }
                },
                function(error){
                    res.sendStatus(400).res.send(error);
                }
            );
        // res.send("0");
    }

};
















