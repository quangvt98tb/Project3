const passport = require('passport')
const User = app.models.Customer;


module.exports = function (app) {
    var router = app.loopback.Router()

    //log a user in
    router.post('/login', function(req, res) {
        User.login({
        email: req.body.email,
        password: req.body.password
        }, 'user', function(err, token) {
            if (err) {
                if(err.details && err.code === 'LOGIN_FAILED_EMAIL_NOT_VERIFIED'){
                res.render('reponseToTriggerEmail', {
                    title: 'Login failed',
                    content: err,
                    redirectToEmail: '/api/users/'+ err.details.userId + '/verify',
                    redirectTo: '/',
                    redirectToLinkText: 'Click here',
                    userId: err.details.userId
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
        
            res.render('home', { //login user and render 'home' view
                email: req.body.email,
                accessToken: token.id,
                redirectUrl: '/api/users/change-password?access_token=' + token.id
            })
        })
    })

    //log a user out
    router.get('/logout', function(req, res, next) {
        if (!req.accessToken) return res.sendStatus(401);
        User.logout(req.accessToken.id, function(err) {
            if (err) return next(err);
            res.redirect('/');
        })
    })

    //send an email with instructions to reset an existing user's password
    router.post('/request-password-reset', function(req, res, next) {
        User.resetPassword({
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
            redirectUrl: '/api/users/reset-password?access_token=' + req.accessToken.id
        });
      });

    app.use(router)
}