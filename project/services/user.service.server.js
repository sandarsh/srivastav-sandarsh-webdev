module.exports = function(app, model) {
    var multer = require('multer');
    var upload = multer({dest: __dirname + '/../../public/project/upload'});
    var fs = require('fs');
    var passport      = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    //var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    var cookieParser  = require('cookie-parser');
    var session       = require('express-session');

    app.use(session({                   //configure raw session
        secret: 'this is the secret',
        resave: true,
        saveUninitialized: true
    }));
    app.use(cookieParser());
    app.use(passport.initialize());     //configure passport session
    app.use(passport.session());

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    //passport.use(new GoogleStrategy(googleConfig, googleStrategy));

    app.post('/api/login', passport.authenticate('local'), login);
    app.post('/api/checkLogin', checkLogin);
    app.post('/api/checkAdmin', checkAdmin);
    app.post('/api/logout', logout);
    app.post('/api/user', createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    app.get('/api/user/:uid/personal-items/:type', getUserItems);
    app.put('/api/user/:uid', loggedInAndSelf, updateUser);
    app.delete('/api/user/:uid', loggedInAndSelf, unregisterUser);
    app.post ("/api/upload/dp", upload.single('myFile'), uploadDisplayPicture);

    /*app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
     app.get('/auth/google/callback',
     passport.authenticate('google', {
     successRedirect: '/assignment/#/user',
     failureRedirect: '/assignment/#/login'
     })); */

    /*var googleConfig = {
     clientID     : process.env.GOOGLE_CLIENT_ID,        //public key
     clientSecret : process.env.GOOGLE_CLIENT_SECRET,    //private key
     callbackURL  : process.env.GOOGLE_CALLBACK_URL      //what url would be listening once we get a callback
     };//make process env variables using bash profile exports/bash/*/


    /*function googleStrategy(token, refreshToken, profile, done) {
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
     username:  emailParts[0],
     first: profile.name.givenName,
     last:  profile.name.familyName,
     email:     email,
     google: {
     id:    profile.id,
     token: token
     }
     };
     return model
     .userModel
     .createUser(newGoogleUser);

     }
     },
     function(err) {
     if (err) { return done(err); }
     }
     )
     .then(    //second then should belong to model.usermodel.createUser but is used here to synchronize asynchronus calls
     function(user){
     return done(null, user);
     },
     function(err){
     if (err) { return done(err); }
     }
     );
     }*/

    function localStrategy(username, password, done) {  //expects the post already has username and pass in body
        model                                   //used as a return parameter (function)
            .userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    if(user)
                        return done(null, user); //error-message, user/falsy message
                    else
                        return done(null, false);
                },
                function(err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function serializeUser(user, done) {    //what to put in the cookie for the current session:
        // we can put user/or just put id
        done(null, user);                   //everything inside will be encrypted
    }                                       //to encrypt sending use ssl!

    function deserializeUser(user, done) {  //
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

    function checkLogin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function checkAdmin(req, res) {
        var loggedIn = req.isAuthenticated();
        var isAdmin = req.user.role == "ADMIN";
        if(loggedIn && isAdmin) {
            res.json(req.user);
        }
        else {
            res.send('0');
        }
    }

    function loggedInAndSelf(req, res, next) {
        var loggedIn = req.isAuthenticated();
        var userId = req.params.uid;
        var self = userId == req.user._id;

        if(loggedIn && self) {
            next();
        }
        else {
            res.sendStatus(400);
        }
    }

    function login(req, res) {
        var user = req.user;

        if(user)
            res.json(user);
        else
            res.send('0');
    }

    function logout(req, res) {
        req.logOut();
        res.sendStatus(200);
    }

    function createUser(req, res) {
        var user = req.body;

        model
            .userModel
            .createUser(user)
            .then(
                function (newUserObject) {
                    res.send(newUserObject);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function findUser(req, res) {
        var query = req.query;

        if (query.username && query.password) {
            findUserByCredentials(req, res);
        }
        else if (query.username) {
            findUserByUsername(req, res);
        }
        else {
            res.json(req.user); //passport made user available22
        }
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        model
            .userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    if(user)
                        res.json(user);
                    else
                        res.send("0");
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;

        model
            .userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user)
                        res.json(user);
                    else
                        res.send("0");
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findUserById(req, res) {
        var uid = req.params.uid;

        model
            .userModel
            .findUserById(uid)
            .then(
                function (userObject) {
                    if(userObject)
                        res.send(userObject);
                    else
                        res.send("0");
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function updateUser(req, res) {
        var user = req.body;
        var uid = req.params.uid;

        model
            .userModel
            .updateUser(uid, user)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function () {
                    res.sendStatus(400);
                });
    }

    function unregisterUser(req, res) {
        var uid = req.params.uid;

        model
            .userModel
            .removeUser(uid)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function uploadDisplayPicture(req, res) {
        var myFile        = req.file;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        var uid           = req.body.uid;

        var localUrl = 'upload/' + filename;

        model
            .userModel
            .uploadDisplayPicture(uid, localUrl)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );

        var url = '/project/index.html#/user/'+uid;
        res.redirect(url);
    }

    function getUserItems(req, res) {
        var uid = req.params.uid;
        var type = req.params.type;

        if(type == "true") {
            model
                .userModel
                .getCartItems(uid)
                .then(
                    function (userObject) {
                        if(userObject) {
                            res.send(userObject.itemCart);
                        }
                        else
                            res.send("0");
                    },
                    function (error) {
                        res.sendStatus(400).send(error);
                    }
                );
        }
        else {
            model
                .userModel
                .getHistoryItems(uid)
                .then(
                    function (userObject) {
                        if(userObject) {
                            res.send(userObject.itemHistory);
                        }
                        else
                            res.send("0");
                    },
                    function (error) {
                        res.sendStatus(400).send(error);
                    }
                );
        }
    }
};