// const passport = require('passport')
var dsConfig = require('../datasources.json')
var path = require('path')

module.exports = function (app) {
    var router = app.loopback.Router()
    var Customer = app.models.Customer

    //login page
    router.get('/', function(req, res) {
        var credentials = dsConfig.emailDs.transports[0].auth;
        res.render('login', {
          email: credentials.user,
          password: credentials.pass
        });
      });

    //verified  
    router.get('/verified', function(req, res) {
        res.render('verified');
    });

    //log a user in
    router.post('/login', function(req, res) {
        Customer.login({
            email: req.body.email,
            password: req.body.password
        }, 'Customer', function(err, token) {
            if (err) {
                if(err.details && err.code === 'LOGIN_FAILED_EMAIL_NOT_VERIFIED'){
                res.render('reponseToTriggerEmail', {
                    title: 'Login failed',
                    content: err,
                    redirectToEmail: '/api/customer/'+ err.details.customerId + '/verify',
                    redirectTo: '/',
                    redirectToLinkText: 'Click here',
                    customerId: err.details.customerId
                });
            } else {
                    res.render('response', {
                        title: 'Login failed. Wrong username or password',
                        content: err,
                        redirectTo: '/',
                        redirectToLinkText: 'Please login again',
                    });
            }
         return;
        }
        
        res.render('home', //login user and render 'home' view
            { 
                email: req.body.email,
                accessToken: token.id,
                redirectUrl: '/api/customer/change-password?access_token=' + token.id
            })
        })
    })

    //log a user out
    router.get('/logout', function(req, res, next) {
        if (!req.accessToken) return res.sendStatus(401);
        Customer.logout(req.accessToken.id, function(err) {
            if (err) return next(err);
            res.redirect('/');
        })
    })

    //send an email with instructions to reset an existing user's password
    router.post('/request-password-reset', function(req, res, next) {
        Customer.resetPassword({
        email: req.body.email
        }, function(err) {
            if (err) return res.status(401).send(err);
            res.render('response', {
                title: 'Password reset requested',
                content: 'Check your email for further instructions',
                redirectTo: '/',
                redirectToLinkText: 'Log in'
            })
        })
    })

    //show password reset form
    router.get('/reset-password', function(req, res, next) {
        if (!req.accessToken) return res.sendStatus(401);
        res.render('password-reset', {
            redirectUrl: '/api/customer/reset-password?access_token=' + req.accessToken.id
        });
      });

    app.use(router)
}