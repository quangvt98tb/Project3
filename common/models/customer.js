let to = require('await-to-js').to
var config = require('../../server/config.json')
var path = require('path')
var senderAddress = 'ngocanh2162@gmail.com'
'use_strict';

module.exports = function(Customer) {
    const Promise = require('bluebird')

    //read Customer
    Customer.readCustomer = async function(id) {
        try {
            const data = await Customer.findById(id, {
                fields: { 
                  fullName: true, 
                  email: true,
                  address: true, 
                  phone: true,
                  dateOfBirth: true, 
                  gender: true, 
                  receiveDistrict: true,
                  createdAt: true
                }
            });
            return data;
        } catch (err) {
            console.log('read Customer', err)
            throw err
        }
    }

    //Admin list Customers paganation
    Customer.listCustomer = async function(queryData, page, pageSize) {
        try {
          const [data, total] = await Promise.all([
            Customer.find({
              fields: { 
                id: true,
                fullName: true, 
                email: true,
                address: true, 
                phone: true,
                dateOfBirth: true, 
                gender: true, 
                receiveDistrict: true,
                createdAt: true,
                enable: true
              }
            }),
            Customer.count()
          ])

          return {
            rows: data,
            page: page,
            pageSize: pageSize,
            total: total
          }
        } catch (err) {
          console.log('list Customer', err)
          throw err
        }
    }

    Customer.remoteMethod('readCustomer', 
    {
        http: {path: '/readCustomer', verb: 'get'},
        accepts: [
            {arg: 'id', type: 'string', required: true}],
        returns: { arg: 'data', root: true }
    })
    
    Customer.remoteMethod('listCustomer', 
    {
        http: {verb: 'get', path: '/listCustomers' },
        accepts: [
          { arg: 'queryData', type: 'string'},
          { arg: 'page', type: 'number', default: '0'},
          { arg: 'pageSize', type: 'number', default: '10'}],
        returns: { arg: 'data', root: true },
    })

    //send password reset link when requested
    Customer.on('resetPasswordRequest', function(info) {
      var url = 'http://' + config.host + ':' + config.port + '/reset-password';
      var html = 'Click <a href="' + url + '?access_token=' +
          info.accessToken.id + '">here</a> to reset your password';

      Customer.app.models.Email.send({
        to: info.email,
        from: senderAddress,
        subject: 'Password reset',
        html: html
      }, function(err) {
        if (err) return console.log('> error sending password reset email');
        console.log('> sending password reset email to:', info.email);
      });
    });

    //render UI page after password change
    Customer.afterRemote('changePassword', function(context, Customer, next) {
      context.res.render('response', {
        title: 'Password changed successfully',
        content: 'Please login again with new password',
        redirectTo: '/',
        redirectToLinkText: 'Log in'
      })
    })
    
    //render UI page after password reset
    Customer.afterRemote('setPassword', function(context, Customer, next) {
      context.res.render('response', {
        title: 'Password reset success',
        content: 'Your password has been reset successfully',
        redirectTo: '/',
        redirectToLinkText: 'Log in'
      })
    })
}